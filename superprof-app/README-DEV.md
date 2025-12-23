# SUPERPROF - README Développeur

Application de mise en relation Professeurs/Élèves - Version MVP

## 🚀 Démarrage Rapide

### Prérequis

- Node.js 18+ ([télécharger](https://nodejs.org/))
- npm ou yarn
- PostgreSQL 14+ (optionnel pour production, SQLite utilisé par défaut en dev)

### Installation

```bash
# Cloner le repository
git clone <repository-url>
cd superprof-app

# Installer les dépendances
npm install

# Copier le fichier d'environnement
cp .env.example .env

# Générer le client Prisma
npm run db:generate

# Créer la base de données (migration)
npm run db:migrate

# (Optionnel) Peupler avec des données de test
npm run db:seed

# Lancer le serveur de développement
npm run dev
```

Ouvrez [http://localhost:3000](http://localhost:3000) dans votre navigateur.

## 📁 Structure du Projet

```
superprof-app/
├── prisma/
│   ├── schema.prisma          # Schéma de base de données
│   ├── migrations/            # Migrations Prisma
│   └── seed.ts                # Données de test
├── src/
│   ├── app/                   # App Router (Next.js 14)
│   │   ├── page.tsx          # Page d'accueil
│   │   ├── search/           # Page de recherche
│   │   ├── teachers/         # Profils professeurs
│   │   ├── api/              # Routes API
│   │   └── layout.tsx        # Layout global
│   ├── components/           # Composants React réutilisables
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   └── ui/               # Composants UI (shadcn/ui)
│   ├── lib/                  # Utilitaires
│   │   ├── prisma.ts         # Client Prisma
│   │   └── utils.ts          # Fonctions utilitaires
│   └── types/                # Types TypeScript
├── public/                   # Fichiers statiques
├── .env                      # Variables d'environnement (local)
├── .env.example              # Template des variables
├── package.json
├── tsconfig.json
└── tailwind.config.ts
```

## 🗄️ Base de Données

### Configuration

Le projet utilise **SQLite** par défaut pour le développement local (fichier `dev.db`).
Pour la production, vous devrez utiliser **PostgreSQL**.

#### Passer à PostgreSQL

1. Modifier `prisma/schema.prisma`:
```prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}
```

2. Mettre à jour `.env`:
```bash
DATABASE_URL="postgresql://user:password@localhost:5432/superprof?schema=public"
```

3. Relancer les migrations:
```bash
npm run db:migrate
```

### Commandes Prisma

```bash
# Générer le client Prisma
npm run db:generate

# Créer une migration
npm run db:migrate

# Ouvrir Prisma Studio (interface graphique)
npm run db:studio

# Reset la base de données
npm run db:reset

# Peupler avec des données de test
npm run db:seed
```

### Schéma Principal

Le schéma comprend 25+ tables:
- `users` - Utilisateurs (élèves, professeurs, admins)
- `teacher_profiles` - Profils professeurs
- `subjects` - Matières enseignées
- `subject_offers` - Offres de cours
- `bookings` - Réservations
- `payments` - Paiements
- `reviews` - Avis
- `messages` - Messagerie
- etc.

Voir `prisma/schema.prisma` pour le schéma complet.

## 🛠️ Scripts Disponibles

```bash
# Développement
npm run dev              # Lance le serveur de développement
npm run build            # Build pour la production
npm run start            # Lance le serveur de production
npm run lint             # Linter (ESLint)

# Base de données
npm run db:generate      # Génère le client Prisma
npm run db:migrate       # Exécute les migrations
npm run db:studio        # Ouvre Prisma Studio
npm run db:seed          # Peuple la base avec des données de test
npm run db:reset         # Reset complètement la base

# Tests (à configurer)
npm run test             # Lance les tests
npm run test:watch       # Tests en mode watch
npm run test:e2e         # Tests end-to-end
```

## 🔐 Authentification

Le projet utilise **NextAuth.js** pour l'authentification.

### Providers configurés:
- Email/Password (credentials)
- Google OAuth (à configurer)
- Facebook OAuth (à configurer)

### Configuration OAuth

#### Google OAuth:
1. Créer un projet sur [Google Cloud Console](https://console.cloud.google.com/)
2. Activer l'API Google+
3. Créer des identifiants OAuth 2.0
4. Ajouter les URI de redirection:
   - `http://localhost:3000/api/auth/callback/google` (dev)
   - `https://votre-domaine.com/api/auth/callback/google` (prod)
5. Copier Client ID et Client Secret dans `.env`

```bash
GOOGLE_CLIENT_ID="votre-client-id"
GOOGLE_CLIENT_SECRET="votre-client-secret"
```

## 💳 Paiements (Stripe)

Le projet utilise **Stripe Connect** pour gérer les paiements entre élèves et professeurs.

### Configuration

1. Créer un compte sur [Stripe](https://stripe.com/)
2. Récupérer les clés API (mode test)
3. Ajouter dans `.env`:

```bash
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="pk_test_..."
STRIPE_SECRET_KEY="sk_test_..."
STRIPE_WEBHOOK_SECRET="whsec_..." (après configuration webhook)
```

### Webhooks

Stripe envoie des événements webhook pour:
- Paiements réussis
- Paiements échoués
- Remboursements
- etc.

Endpoint webhook: `/api/webhooks/stripe`

## 📧 Emails

Configuration requise pour l'envoi d'emails (confirmations, notifications, etc.)

### Option 1: SendGrid
```bash
SENDGRID_API_KEY="SG.xxx"
EMAIL_FROM="noreply@superprof.com"
```

### Option 2: Resend (recommandé)
```bash
RESEND_API_KEY="re_xxx"
EMAIL_FROM="noreply@superprof.com"
```

## 🗺️ Géolocalisation

Le projet utilise **Google Maps API** pour:
- Recherche de professeurs par localisation
- Affichage de cartes
- Calcul de distances

### Configuration

1. Activer l'API Google Maps sur [Google Cloud Console](https://console.cloud.google.com/)
2. Créer une clé API
3. Restreindre l'utilisation de la clé (recommandé)
4. Ajouter dans `.env`:

```bash
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY="AIzaSy..."
```

## 🎨 Styling & UI

Le projet utilise:
- **Tailwind CSS** pour le styling
- **shadcn/ui** pour les composants UI (à installer)
- **Lucide React** pour les icônes

### Installer shadcn/ui

```bash
npx shadcn-ui@latest init
npx shadcn-ui@latest add button
npx shadcn-ui@latest add input
npx shadcn-ui@latest add dialog
# etc.
```

## 📱 Responsive Design

L'application est entièrement responsive avec breakpoints Tailwind:
- `sm`: 640px
- `md`: 768px
- `lg`: 1024px
- `xl`: 1280px
- `2xl`: 1536px

## 🚀 Déploiement

### Option 1: Vercel (Recommandé)

1. Créer un compte sur [Vercel](https://vercel.com/)
2. Connecter votre repository GitHub
3. Configurer les variables d'environnement
4. Déployer automatiquement à chaque push

### Option 2: Docker

```bash
# Build l'image
docker build -t superprof .

# Lancer le container
docker run -p 3000:3000 superprof
```

### Variables d'environnement en Production

Assurez-vous de configurer **TOUTES** les variables d'environnement:
- `DATABASE_URL` (PostgreSQL en production)
- `NEXTAUTH_SECRET` (générer avec `openssl rand -base64 32`)
- `NEXTAUTH_URL` (URL de production)
- Toutes les clés API (Stripe, Google, etc.)

## 🧪 Tests

### Structure des tests

```
src/
├── __tests__/
│   ├── unit/           # Tests unitaires
│   ├── integration/    # Tests d'intégration
│   └── e2e/            # Tests end-to-end
```

### Lancer les tests

```bash
# Tous les tests
npm run test

# Tests unitaires uniquement
npm run test:unit

# Tests end-to-end
npm run test:e2e

# Coverage
npm run test:coverage
```

## 📊 Monitoring & Analytics

### Sentry (Error Tracking)

1. Créer un projet sur [Sentry](https://sentry.io/)
2. Ajouter le DSN dans `.env`:

```bash
SENTRY_DSN="https://xxx@xxx.ingest.sentry.io/xxx"
```

### Google Analytics

```bash
NEXT_PUBLIC_GA_ID="G-XXXXXXXXXX"
```

## 🔒 Sécurité

### Best Practices

- ✅ Variables d'environnement sécurisées (jamais committées)
- ✅ HTTPS en production
- ✅ Validation des entrées utilisateur (Zod)
- ✅ Protection CSRF
- ✅ Rate limiting API
- ✅ Passwords hashés avec bcrypt
- ✅ Sanitization des données

### Helmet (HTTP Headers)

Ajouter des headers de sécurité dans `next.config.ts`

## 📚 Documentation Complète

Voir le dossier `../docs/` pour la documentation complète:
- [Architecture Technique](../docs/ARCHITECTURE.md)
- [Fonctionnalités](../docs/FEATURES.md)
- [Schéma de Base de Données](../docs/DATABASE.md)
- [Parcours Utilisateur](../docs/USER_JOURNEY.md)
- [Stratégies de Monétisation](../docs/MONETIZATION.md)

## 🤝 Contribution

### Git Workflow

1. Créer une branche depuis `develop`:
```bash
git checkout -b feature/ma-fonctionnalite
```

2. Faire vos modifications

3. Commit avec un message clair:
```bash
git commit -m "feat: ajoute la recherche par localisation"
```

4. Push et créer une Pull Request

### Convention de Commits

Utiliser [Conventional Commits](https://www.conventionalcommits.org/):
- `feat:` nouvelle fonctionnalité
- `fix:` correction de bug
- `docs:` documentation
- `style:` formatage, point-virgules manquants, etc.
- `refactor:` refactorisation de code
- `test:` ajout de tests
- `chore:` tâches de maintenance

## 🐛 Debugging

### VSCode

Configuration `.vscode/launch.json`:

```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "name": "Next.js: debug server-side",
      "type": "node-terminal",
      "request": "launch",
      "command": "npm run dev"
    }
  ]
}
```

### Prisma Studio

Interface graphique pour explorer la base de données:

```bash
npm run db:studio
```

Ouvre sur [http://localhost:5555](http://localhost:5555)

## 📞 Support

- 📧 Email: dev@superprof.com
- 💬 Slack: #dev-superprof
- 📖 Wiki: [https://wiki.superprof.com](https://wiki.superprof.com)

## 📝 Licence

MIT

---

**Happy Coding! 🚀**
