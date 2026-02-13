# 💳 Système de Paiement SuperProf

## Architecture

Le système de paiement utilise **Stripe** pour gérer toutes les transactions financières.

### Composants

1. **Configuration Stripe** (`src/lib/stripe.ts`)
   - Initialisation du client Stripe
   - Configuration de la plateforme (commission 15%)

2. **Service de Paiement** (`src/services/payment.service.ts`)
   - Logique métier des paiements
   - Gestion des checkout sessions
   - Remboursements
   - Historique des paiements

3. **API Routes**
   - `POST /api/payments/checkout` - Créer une session de paiement
   - `POST /api/payments/refund` - Créer un remboursement
   - `GET /api/payments/history` - Historique des paiements
   - `POST /api/webhooks/stripe` - Webhooks Stripe

## Configuration

### Variables d'environnement requises

```env
# Stripe
STRIPE_SECRET_KEY=sk_test_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...

# URLs
NEXTAUTH_URL=http://localhost:3000
```

### Obtenir les clés Stripe

1. Créer un compte sur [stripe.com](https://stripe.com)
2. Aller dans **Developers > API Keys**
3. Copier les clés de test

### Configurer les webhooks

1. Dans le dashboard Stripe, aller dans **Developers > Webhooks**
2. Ajouter un endpoint: `https://votre-domaine.com/api/webhooks/stripe`
3. Sélectionner les événements:
   - `payment_intent.succeeded`
   - `payment_intent.payment_failed`
   - `charge.refunded`
   - `checkout.session.completed`
   - `checkout.session.expired`
4. Copier le **Signing secret** dans `STRIPE_WEBHOOK_SECRET`

## Flux de Paiement

### 1. Création d'une réservation

```typescript
// L'étudiant crée une réservation
const booking = await prisma.booking.create({
  data: {
    studentId: 'student-uuid',
    teacherId: 'teacher-uuid',
    subjectOfferId: 'offer-uuid',
    scheduledAt: new Date('2025-01-15T10:00:00Z'),
    durationMinutes: 60,
    status: 'PENDING', // En attente de paiement
  },
})
```

### 2. Création de la session de paiement

```typescript
// Frontend appelle l'API
const response = await fetch('/api/payments/checkout', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    bookingId: booking.id,
    studentId: 'student-uuid',
    teacherId: 'teacher-uuid',
    amount: 5000, // 50€ en centimes
  }),
})

const { url } = await response.json()
// Rediriger vers la page Stripe
window.location.href = url
```

### 3. Traitement du paiement

- L'étudiant saisit ses informations de paiement sur Stripe
- Stripe traite le paiement
- Stripe envoie un webhook `payment_intent.succeeded`
- Le système met à jour le statut du paiement et de la réservation

### 4. Confirmation

- La réservation passe en statut `CONFIRMED`
- Le professeur reçoit une notification
- L'étudiant est redirigé vers la page de succès

## Modèle de Données

### Payment

```prisma
model Payment {
  id                    String         @id @default(uuid())
  bookingId             String?
  booking               Booking?       @relation(fields: [bookingId], references: [id])
  studentId             String
  student               User           @relation("StudentPayments")
  teacherId             String
  teacher               User           @relation("TeacherPayments")

  amount                Decimal        @db.Decimal(10, 2)      // Montant total
  teacherAmount         Decimal        @db.Decimal(10, 2)      // Part du professeur (85%)
  platformFee           Decimal        @db.Decimal(10, 2)      // Commission (15%)
  currency              String         @default("EUR")

  paymentMethod         String
  stripePaymentIntentId String?
  stripeChargeId        String?

  status                PaymentStatus  @default(PENDING)
  refundedAt            DateTime?
  refundAmount          Decimal?       @db.Decimal(10, 2)
  refundReason          String?        @db.Text

  createdAt             DateTime       @default(now())
  updatedAt             DateTime       @updatedAt
}

enum PaymentStatus {
  PENDING
  SUCCEEDED
  FAILED
  REFUNDED
  CANCELLED
}
```

## Commission de la Plateforme

- **Commission : 15%** du montant total
- Exemple pour un cours de 50€ :
  - Montant payé par l'étudiant : **50€**
  - Commission plateforme : **7,50€**
  - Montant reçu par le professeur : **42,50€**

## Remboursements

### Créer un remboursement total

```typescript
const response = await fetch('/api/payments/refund', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    paymentId: 'payment-uuid',
    reason: 'Le cours a été annulé',
  }),
})
```

### Créer un remboursement partiel

```typescript
const response = await fetch('/api/payments/refund', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    paymentId: 'payment-uuid',
    amount: 25, // Remboursement de 25€ au lieu de 50€
    reason: 'Cours raccourci',
  }),
})
```

## Tests

### Mode Test Stripe

Utiliser les cartes de test Stripe :

- **Succès** : `4242 4242 4242 4242`
- **Échec** : `4000 0000 0000 0002`
- **3D Secure** : `4000 0025 0000 3155`

### Tester les webhooks localement

1. Installer Stripe CLI :
   ```bash
   brew install stripe/stripe-cli/stripe
   ```

2. Se connecter :
   ```bash
   stripe login
   ```

3. Forward webhooks vers localhost :
   ```bash
   stripe listen --forward-to localhost:3000/api/webhooks/stripe
   ```

4. Copier le webhook secret affiché et le mettre dans `.env`

## Sécurité

### ✅ Bonnes pratiques implémentées

1. **Validation des webhooks** - Vérification de la signature Stripe
2. **Validation des données** - Utilisation de Zod pour valider les inputs
3. **Transactions atomiques** - Utilisation de Prisma transactions
4. **Logs d'audit** - Tous les paiements sont enregistrés

### 🔒 À implémenter

1. **Authentification** - Vérifier l'identité de l'utilisateur (NextAuth)
2. **Autorisations** - Vérifier les droits d'accès
3. **Rate limiting** - Limiter les requêtes API
4. **Idempotence** - Utiliser des clés d'idempotence Stripe

## Stripe Connect (À venir)

Pour les paiements directs aux professeurs, il faudra implémenter **Stripe Connect** :

1. Les professeurs créent un compte Stripe Connect
2. Les paiements sont transférés directement sur leur compte
3. La plateforme prélève automatiquement sa commission

## Support

Pour toute question sur les paiements :
- Documentation Stripe : https://stripe.com/docs
- Support Stripe : https://support.stripe.com

## Changelog

- **2025-01-XX** : Création du système de paiement complet
  - Checkout sessions
  - Webhooks
  - Remboursements
  - Historique des paiements
