import { NextRequest, NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe'
import { PaymentService } from '@/services/payment.service'
import Stripe from 'stripe'

export async function POST(request: NextRequest) {
  const body = await request.text()
  const signature = request.headers.get('stripe-signature')

  if (!signature) {
    return NextResponse.json({ error: 'Signature manquante' }, { status: 400 })
  }

  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET
  if (!webhookSecret) {
    console.error('STRIPE_WEBHOOK_SECRET non configuré')
    return NextResponse.json({ error: 'Configuration webhook manquante' }, { status: 500 })
  }

  let event: Stripe.Event

  try {
    // Vérifier la signature du webhook
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret)
  } catch (error) {
    console.error('Erreur vérification signature webhook:', error)
    return NextResponse.json({ error: 'Signature invalide' }, { status: 400 })
  }

  // Traiter les différents types d'événements
  try {
    switch (event.type) {
      case 'payment_intent.succeeded': {
        const paymentIntent = event.data.object as Stripe.PaymentIntent
        await PaymentService.handlePaymentSuccess(paymentIntent.id)
        console.log(`✅ Paiement réussi: ${paymentIntent.id}`)
        break
      }

      case 'payment_intent.payment_failed': {
        const paymentIntent = event.data.object as Stripe.PaymentIntent
        await PaymentService.handlePaymentFailure(paymentIntent.id)
        console.log(`❌ Paiement échoué: ${paymentIntent.id}`)
        break
      }

      case 'charge.refunded': {
        const charge = event.data.object as Stripe.Charge
        console.log(`💰 Remboursement effectué: ${charge.id}`)
        // Le remboursement est déjà géré dans PaymentService.createRefund
        break
      }

      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session
        console.log(`✅ Session checkout complétée: ${session.id}`)
        // Le paiement sera traité via payment_intent.succeeded
        break
      }

      case 'checkout.session.expired': {
        const session = event.data.object as Stripe.Checkout.Session
        console.log(`⏰ Session checkout expirée: ${session.id}`)
        break
      }

      default:
        console.log(`ℹ️ Événement webhook non géré: ${event.type}`)
    }

    return NextResponse.json({ received: true })
  } catch (error) {
    console.error('Erreur traitement webhook:', error)
    return NextResponse.json(
      { error: 'Erreur traitement webhook' },
      { status: 500 }
    )
  }
}

// Configuration Next.js pour désactiver le parsing automatique du body
export const config = {
  api: {
    bodyParser: false,
  },
}
