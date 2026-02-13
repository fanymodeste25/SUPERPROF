import { stripe, STRIPE_CONFIG } from '@/lib/stripe'
import prisma from '@/lib/prisma'
import { Prisma } from '@prisma/client'
import Stripe from 'stripe'

export class PaymentService {
  /**
   * Crée une session de paiement Stripe pour une réservation
   */
  static async createCheckoutSession(params: {
    bookingId: string
    studentId: string
    teacherId: string
    amount: number
    successUrl: string
    cancelUrl: string
  }) {
    const { bookingId, studentId, teacherId, amount, successUrl, cancelUrl } = params

    // Vérifier que la réservation existe
    const booking = await prisma.booking.findUnique({
      where: { id: bookingId },
      include: {
        student: true,
        teacher: true,
        subjectOffer: {
          include: {
            subject: true,
          },
        },
      },
    })

    if (!booking) {
      throw new Error('Réservation introuvable')
    }

    if (booking.studentId !== studentId) {
      throw new Error('Non autorisé')
    }

    // Calculer les montants
    const platformFee = Math.round(amount * STRIPE_CONFIG.platformFeePercentage)
    const teacherAmount = amount - platformFee

    // Créer le Payment Intent dans Stripe
    const session = await stripe.checkout.sessions.create({
      payment_method_types: STRIPE_CONFIG.paymentMethods,
      line_items: [
        {
          price_data: {
            currency: STRIPE_CONFIG.currency,
            product_data: {
              name: `Cours de ${booking.subjectOffer.subject.name}`,
              description: `Cours avec ${booking.teacher.firstName} ${booking.teacher.lastName} - ${booking.durationMinutes} minutes`,
              images: booking.teacher.avatarUrl ? [booking.teacher.avatarUrl] : undefined,
            },
            unit_amount: amount, // montant en centimes
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: successUrl,
      cancel_url: cancelUrl,
      metadata: {
        bookingId: booking.id,
        studentId: booking.studentId,
        teacherId: booking.teacherId,
        platformFee: platformFee.toString(),
        teacherAmount: teacherAmount.toString(),
      },
      customer_email: booking.student.email,
      payment_intent_data: {
        metadata: {
          bookingId: booking.id,
        },
      },
    })

    // Créer l'enregistrement de paiement dans la base
    await prisma.payment.create({
      data: {
        bookingId: booking.id,
        studentId: booking.studentId,
        teacherId: booking.teacherId,
        amount: amount / 100, // Convertir centimes en euros
        teacherAmount: teacherAmount / 100,
        platformFee: platformFee / 100,
        currency: STRIPE_CONFIG.currency.toUpperCase(),
        paymentMethod: 'card',
        stripePaymentIntentId: session.payment_intent as string,
        status: 'PENDING',
      },
    })

    return {
      sessionId: session.id,
      url: session.url,
    }
  }

  /**
   * Traite le succès d'un paiement
   */
  static async handlePaymentSuccess(paymentIntentId: string) {
    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId)

    // Mettre à jour le paiement
    const payment = await prisma.payment.findFirst({
      where: { stripePaymentIntentId: paymentIntentId },
    })

    if (!payment) {
      throw new Error('Paiement introuvable')
    }

    // Transaction pour garantir la cohérence
    await prisma.$transaction(async (tx: Prisma.TransactionClient) => {
      // Mettre à jour le paiement
      await tx.payment.update({
        where: { id: payment.id },
        data: {
          status: 'SUCCEEDED',
          stripeChargeId: paymentIntent.latest_charge as string,
        },
      })

      // Confirmer la réservation
      if (payment.bookingId) {
        await tx.booking.update({
          where: { id: payment.bookingId },
          data: {
            status: 'CONFIRMED',
            confirmedAt: new Date(),
          },
        })
      }
    })

    return payment
  }

  /**
   * Traite l'échec d'un paiement
   */
  static async handlePaymentFailure(paymentIntentId: string) {
    await prisma.payment.updateMany({
      where: { stripePaymentIntentId: paymentIntentId },
      data: {
        status: 'FAILED',
      },
    })
  }

  /**
   * Crée un remboursement
   */
  static async createRefund(params: {
    paymentId: string
    amount?: number
    reason?: string
  }) {
    const { paymentId, amount, reason } = params

    const payment = await prisma.payment.findUnique({
      where: { id: paymentId },
    })

    if (!payment) {
      throw new Error('Paiement introuvable')
    }

    if (!payment.stripeChargeId) {
      throw new Error('Aucun ID de charge Stripe trouvé')
    }

    // Créer le remboursement dans Stripe
    const refund = await stripe.refunds.create({
      charge: payment.stripeChargeId,
      amount: amount ? Math.round(amount * 100) : undefined, // Montant en centimes ou remboursement complet
      reason: 'requested_by_customer',
    })

    // Mettre à jour dans la base de données
    await prisma.payment.update({
      where: { id: paymentId },
      data: {
        refundedAt: new Date(),
        refundAmount: refund.amount / 100,
        refundReason: reason,
      },
    })

    return refund
  }

  /**
   * Crée un paiement pour le professeur
   */
  static async createPayout(teacherId: string, amount: number) {
    const teacher = await prisma.user.findUnique({
      where: { id: teacherId },
    })

    if (!teacher) {
      throw new Error('Professeur introuvable')
    }

    // Créer le payout dans la base de données
    const payout = await prisma.payout.create({
      data: {
        teacherId,
        amount,
        currency: STRIPE_CONFIG.currency.toUpperCase(),
        status: 'PENDING',
      },
    })

    // Note: Pour créer un vrai payout Stripe, le professeur doit avoir un Stripe Connect account
    // Cela nécessite une configuration supplémentaire avec Stripe Connect

    return payout
  }

  /**
   * Récupère l'historique des paiements d'un utilisateur
   */
  static async getUserPayments(userId: string, role: 'student' | 'teacher') {
    const where = role === 'student' ? { studentId: userId } : { teacherId: userId }

    return prisma.payment.findMany({
      where,
      include: {
        booking: {
          include: {
            student: {
              select: {
                id: true,
                firstName: true,
                lastName: true,
                email: true,
                avatarUrl: true,
              },
            },
            teacher: {
              select: {
                id: true,
                firstName: true,
                lastName: true,
                email: true,
                avatarUrl: true,
              },
            },
            subjectOffer: {
              include: {
                subject: true,
              },
            },
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    })
  }
}
