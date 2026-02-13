import { NextRequest, NextResponse } from 'next/server'
import { PaymentService } from '@/services/payment.service'
import { z } from 'zod'

const refundSchema = z.object({
  paymentId: z.string().uuid(),
  amount: z.number().positive().optional(),
  reason: z.string().optional(),
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Validation
    const validatedData = refundSchema.parse(body)

    // TODO: Ajouter l'authentification et vérifier les autorisations
    // Seul un admin ou le professeur/étudiant concerné peut demander un remboursement
    // const session = await getServerSession()
    // if (!session || !['ADMIN', 'SUPER_ADMIN'].includes(session.user.role)) {
    //   return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })
    // }

    const refund = await PaymentService.createRefund({
      paymentId: validatedData.paymentId,
      amount: validatedData.amount,
      reason: validatedData.reason,
    })

    return NextResponse.json({
      success: true,
      refund: {
        id: refund.id,
        amount: refund.amount / 100, // Convertir centimes en euros
        status: refund.status,
      },
    })
  } catch (error) {
    console.error('Erreur création remboursement:', error)

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Données invalides', details: error.issues },
        { status: 400 }
      )
    }

    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 400 })
    }

    return NextResponse.json(
      { error: 'Erreur lors de la création du remboursement' },
      { status: 500 }
    )
  }
}
