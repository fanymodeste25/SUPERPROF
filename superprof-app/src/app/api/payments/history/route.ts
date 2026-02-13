import { NextRequest, NextResponse } from 'next/server'
import { PaymentService } from '@/services/payment.service'

export async function GET(request: NextRequest) {
  try {
    // TODO: Récupérer l'utilisateur depuis la session
    // const session = await getServerSession()
    // if (!session) {
    //   return NextResponse.json({ error: 'Non authentifié' }, { status: 401 })
    // }

    const searchParams = request.nextUrl.searchParams
    const userId = searchParams.get('userId')
    const role = searchParams.get('role') as 'student' | 'teacher'

    if (!userId || !role) {
      return NextResponse.json(
        { error: 'Paramètres userId et role requis' },
        { status: 400 }
      )
    }

    if (!['student', 'teacher'].includes(role)) {
      return NextResponse.json({ error: 'Role invalide' }, { status: 400 })
    }

    // TODO: Vérifier que l'utilisateur connecté peut accéder à ces données
    // if (session.user.id !== userId && !['ADMIN', 'SUPER_ADMIN'].includes(session.user.role)) {
    //   return NextResponse.json({ error: 'Non autorisé' }, { status: 403 })
    // }

    const payments = await PaymentService.getUserPayments(userId, role)

    return NextResponse.json({ payments })
  } catch (error) {
    console.error('Erreur récupération historique paiements:', error)

    return NextResponse.json(
      { error: 'Erreur lors de la récupération de l\'historique des paiements' },
      { status: 500 }
    )
  }
}
