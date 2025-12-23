# Architecture Technique - SUPERPROF

## 🏗️ Vue d'Ensemble de l'Architecture

L'application SUPERPROF suit une architecture moderne en couches avec séparation frontend/backend.

```
┌─────────────────────────────────────────────────────────┐
│                    CLIENT LAYER                         │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐ │
│  │   Web App    │  │  Mobile iOS  │  │ Mobile Android│ │
│  │  (Next.js)   │  │ (React Native│  │(React Native) │ │
│  └──────────────┘  └──────────────┘  └──────────────┘ │
└─────────────────────────────────────────────────────────┘
                          │
                          ▼
┌─────────────────────────────────────────────────────────┐
│                      API GATEWAY                        │
│              (Next.js API Routes / Express)             │
└─────────────────────────────────────────────────────────┘
                          │
          ┌───────────────┼───────────────┐
          ▼               ▼               ▼
┌──────────────┐ ┌──────────────┐ ┌──────────────┐
│   Auth       │ │   Business   │ │   External   │
│   Service    │ │   Logic      │ │   Services   │
│ (NextAuth)   │ │   (API)      │ │ (Stripe,etc) │
└──────────────┘ └──────────────┘ └──────────────┘
                          │
                          ▼
┌─────────────────────────────────────────────────────────┐
│                   DATA LAYER                            │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐ │
│  │  PostgreSQL  │  │    Redis     │  │   S3/Cloud   │ │
│  │  (Primary DB)│  │    (Cache)   │  │  (Storage)   │ │
│  └──────────────┘  └──────────────┘  └──────────────┘ │
└─────────────────────────────────────────────────────────┘
```

## 📦 Stack Technologique Recommandée

### Option 1: Stack Full JavaScript (Recommandée pour MVP)

#### Frontend
- **Framework**: Next.js 14 (App Router)
  - Avantages: SSR, SEO optimisé, API routes intégrées
  - Rendu hybride (SSR + CSR)
- **UI Library**: React 18
- **Language**: TypeScript
- **Styling**: Tailwind CSS + shadcn/ui
- **State Management**: Zustand ou React Query
- **Forms**: React Hook Form + Zod (validation)
- **Maps**: Mapbox ou Google Maps API

#### Backend
- **Runtime**: Node.js 20 LTS
- **Framework**: Express.js ou Next.js API Routes
- **ORM**: Prisma
- **Authentication**: NextAuth.js (OAuth + JWT)
- **Validation**: Zod
- **File Upload**: Multer + Sharp (compression)

#### Base de Données
- **Primary Database**: PostgreSQL 15
  - Stockage des utilisateurs, profils, cours, réservations
  - Support PostGIS pour géolocalisation
- **Cache**: Redis
  - Sessions utilisateurs
  - Cache de recherche
- **Storage**: AWS S3 ou Cloudinary
  - Photos de profil
  - Documents/certifications

#### Services Externes
- **Payment**: Stripe Connect
  - Paiements entre élèves et professeurs
  - Gestion des commissions
- **Email**: SendGrid ou Resend
- **SMS**: Twilio (notifications)
- **Maps/Geocoding**: Google Maps API
- **Video**: Whereby ou Zoom API (cours en ligne)

#### Infrastructure & DevOps
- **Hosting Frontend**: Vercel
- **Hosting Backend**: Railway ou Render
- **Database**: Supabase ou Railway
- **CI/CD**: GitHub Actions
- **Monitoring**: Sentry
- **Analytics**: Google Analytics + Mixpanel

### Option 2: Stack Low-Code (Lancement Rapide)

#### Platform: FlutterFlow + Supabase
- **Frontend**: FlutterFlow (génération automatique iOS/Android/Web)
- **Backend**: Supabase (PostgreSQL + Auth + Storage + Realtime)
- **Payment**: Stripe (intégration FlutterFlow)
- **Avantages**:
  - Développement 3x plus rapide
  - Un seul codebase pour toutes les plateformes
  - Coût initial réduit
- **Inconvénients**:
  - Moins de flexibilité
  - Dépendance à la plateforme

### Option 3: Stack No-Code (Prototype/Test)

#### Platform: Bubble.io
- **Tout-en-un**: Bubble + plugins
- **Avantages**:
  - Pas de code nécessaire
  - MVP en 2-4 semaines
- **Inconvénients**:
  - Scalabilité limitée
  - Performances réduites
  - Coût à long terme élevé

## 🔐 Architecture de Sécurité

### Authentification & Autorisation
```typescript
// Stratégie d'authentification
- JWT tokens (access + refresh)
- OAuth 2.0 (Google, Facebook, Apple)
- 2FA optionnel pour professeurs
- RBAC (Role-Based Access Control)
  - STUDENT
  - TEACHER
  - ADMIN
  - SUPER_ADMIN
```

### Sécurité des Données
- Chiffrement des mots de passe: bcrypt (10 rounds)
- HTTPS obligatoire (TLS 1.3)
- Rate limiting: 100 req/min par IP
- CORS configuré strictement
- Validation des entrées (Zod)
- Protection CSRF
- Sanitization des données

## 🚀 Architecture de Déploiement

### Environnements

```yaml
# Development
- Local: localhost:3000
- Database: Docker PostgreSQL
- Redis: Docker Redis

# Staging
- URL: staging.superprof.com
- Database: Railway/Supabase
- Auto-deploy depuis branch 'develop'

# Production
- URL: superprof.com
- Database: Managed PostgreSQL (haute disponibilité)
- CDN: Cloudflare
- Auto-deploy depuis branch 'main'
```

### Scalabilité

#### Phase 1 (0-1000 utilisateurs)
- Monolith Next.js
- Single PostgreSQL instance
- Redis optionnel

#### Phase 2 (1000-10000 utilisateurs)
- Séparation Frontend/Backend
- PostgreSQL avec réplicas (lecture)
- Redis obligatoire
- CDN pour assets statiques

#### Phase 3 (10000+ utilisateurs)
- Microservices (optionnel)
  - User Service
  - Search Service
  - Booking Service
  - Payment Service
- Load balancer
- PostgreSQL clustering
- Redis clustering
- Queue system (Bull/BullMQ)

## 📊 Architecture de Données

### Principe de Séparation
```
┌─────────────────────────────────────┐
│      Operational Database           │
│         (PostgreSQL)                │
│  - Transactions en temps réel       │
│  - Données CRUD                     │
└─────────────────────────────────────┘
              │
              │ ETL Pipeline
              ▼
┌─────────────────────────────────────┐
│      Analytics Database             │
│    (PostgreSQL/BigQuery)            │
│  - Données agrégées                 │
│  - Rapports                         │
└─────────────────────────────────────┘
```

## 🔄 Architecture API

### REST API Structure
```
/api/v1
  /auth
    POST   /register
    POST   /login
    POST   /logout
    POST   /refresh
    POST   /forgot-password
    POST   /reset-password

  /users
    GET    /me
    PATCH  /me
    DELETE /me
    GET    /:id

  /teachers
    GET    /             # Search teachers
    GET    /:id          # Teacher profile
    POST   /             # Become teacher
    PATCH  /:id          # Update profile
    GET    /:id/reviews
    GET    /:id/availability
    PATCH  /:id/availability

  /subjects
    GET    /             # List all subjects
    GET    /:id

  /bookings
    GET    /             # My bookings
    POST   /             # Create booking
    GET    /:id
    PATCH  /:id          # Update status
    DELETE /:id          # Cancel

  /reviews
    GET    /teacher/:id
    POST   /
    PATCH  /:id
    DELETE /:id

  /messages
    GET    /conversations
    GET    /conversations/:id
    POST   /conversations
    POST   /conversations/:id/messages

  /payments
    POST   /create-intent
    POST   /confirm
    GET    /history

  /admin
    GET    /users
    PATCH  /users/:id/verify
    GET    /teachers/pending
    PATCH  /teachers/:id/approve
    GET    /statistics
```

### GraphQL (Alternative)
```graphql
# Pour réduire le over-fetching et under-fetching
query {
  teacherSearch(
    subject: "Mathématiques"
    location: { lat: 48.8566, lng: 2.3522, radius: 10 }
    priceRange: { min: 20, max: 50 }
  ) {
    id
    name
    avatar
    rating
    hourlyRate
    subjects {
      name
      level
    }
    availability {
      date
      slots
    }
  }
}
```

## 🎨 Architecture Frontend

### Structure de Dossiers (Next.js)
```
src/
├── app/                    # App Router (Next.js 14)
│   ├── (auth)/
│   │   ├── login/
│   │   └── register/
│   ├── (dashboard)/
│   │   ├── student/
│   │   └── teacher/
│   ├── search/
│   ├── teachers/[id]/
│   └── api/               # API Routes
├── components/
│   ├── ui/                # shadcn components
│   ├── forms/
│   ├── layouts/
│   └── features/
│       ├── auth/
│       ├── search/
│       ├── booking/
│       └── messaging/
├── lib/
│   ├── db.ts             # Prisma client
│   ├── auth.ts           # NextAuth config
│   └── utils.ts
├── hooks/
├── types/
└── styles/
```

## 🔧 Configuration Recommandée

### Variables d'Environnement
```bash
# Database
DATABASE_URL="postgresql://user:pass@localhost:5432/superprof"

# Auth
NEXTAUTH_SECRET="your-secret-key"
NEXTAUTH_URL="http://localhost:3000"

# OAuth
GOOGLE_CLIENT_ID="..."
GOOGLE_CLIENT_SECRET="..."

# Stripe
STRIPE_PUBLIC_KEY="pk_test_..."
STRIPE_SECRET_KEY="sk_test_..."
STRIPE_WEBHOOK_SECRET="whsec_..."

# Storage
AWS_S3_BUCKET="superprof-uploads"
AWS_ACCESS_KEY_ID="..."
AWS_SECRET_ACCESS_KEY="..."

# Email
SENDGRID_API_KEY="..."

# Maps
GOOGLE_MAPS_API_KEY="..."

# Redis
REDIS_URL="redis://localhost:6379"
```

## 📈 Performance & Optimisation

### Frontend
- Code splitting automatique (Next.js)
- Image optimization (next/image)
- Lazy loading des composants
- Memoization (React.memo, useMemo)
- Service Worker (PWA)

### Backend
- Database indexing
- Query optimization (Prisma)
- Caching strategy (Redis)
- Pagination
- Rate limiting

### CDN & Assets
- Cloudflare CDN
- Images: WebP format
- Compression Brotli/Gzip
- Browser caching

## 🧪 Tests

### Strategy
```
├── Unit Tests (Jest)         # 70%
├── Integration Tests (Jest)  # 20%
└── E2E Tests (Playwright)    # 10%
```

### Outils
- Jest + React Testing Library
- Playwright (E2E)
- MSW (Mock Service Worker)
- Cypress (alternative E2E)

## 📱 Architecture Mobile (React Native)

### Structure
```
mobile/
├── src/
│   ├── screens/
│   ├── components/
│   ├── navigation/
│   ├── services/
│   ├── hooks/
│   └── utils/
├── ios/
└── android/
```

### Technologies
- React Native 0.73
- React Navigation
- React Query
- AsyncStorage
- Push Notifications (Firebase)

## 🔍 Monitoring & Observabilité

### Logging
- Winston (Backend)
- Sentry (Errors)
- LogRocket (Session replay)

### Metrics
- Prometheus + Grafana
- Uptime monitoring (UptimeRobot)
- Performance (Web Vitals)

### Analytics
- Google Analytics 4
- Mixpanel (Product analytics)
- Hotjar (Heatmaps)
