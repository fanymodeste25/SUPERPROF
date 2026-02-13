import { NextRequest, NextResponse } from 'next/server'
import { PaymentService } from '@/services/payment.service'
import { z } from 'zod'

const checkoutSchema = z.object({
  bookingId: z.string().uuid(),
  studentId: z.string().uuid(),
  teacherId: z.string().uuid(),
  amount: z.number().positive(),
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Validation
    const validatedData = checkoutSchema.parse(body)

    // TODO: Ajouter l'authentification et vérifier que l'utilisateur connecté est bien l'étudiant
    // const session = await getServerSession()
    // if (!session || session.user.id !== validatedData.studentId) {
    //   return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })
    // }

    const baseUrl = process.env.NEXTAUTH_URL || 'http://localhost:3000'

    const checkoutSession = await PaymentService.createCheckoutSession({
      bookingId: validatedData.bookingId,
      studentId: validatedData.studentId,
      teacherId: validatedData.teacherId,
      amount: validatedData.amount,
      successUrl: `${baseUrl}/bookings/${validatedData.bookingId}?payment=success`,
      cancelUrl: `${baseUrl}/bookings/${validatedData.bookingId}?payment=cancelled`,
    })

    return NextResponse.json(checkoutSession)
  } catch (error) {
    console.error('Erreur création session checkout:', error)

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Données invalides', details: error.issues },
        { status: 400 }
      )
    }

    return NextResponse.json(
      { error: 'Erreur lors de la création de la session de paiement' },
      { status: 500 }
    )
  }
}
