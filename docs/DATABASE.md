# Schéma de Base de Données - SUPERPROF

## 🗄️ Vue d'Ensemble

La base de données utilise PostgreSQL avec les extensions suivantes:
- **PostGIS**: Pour la géolocalisation
- **pg_trgm**: Pour la recherche full-text
- **uuid-ossp**: Pour la génération d'UUIDs

## 📊 Diagramme Entité-Relations

```
┌─────────────┐         ┌──────────────┐         ┌─────────────┐
│    Users    │────────>│TeacherProfile│<───────>│  Subjects   │
└─────────────┘         └──────────────┘         └─────────────┘
      │                        │                        │
      │                        │                        │
      v                        v                        v
┌─────────────┐         ┌──────────────┐         ┌─────────────┐
│  Messages   │         │  Bookings    │────────>│SubjectOffers│
└─────────────┘         └──────────────┘         └─────────────┘
      │                        │
      │                        v
      │                  ┌──────────────┐
      └─────────────────>│   Reviews    │
                         └──────────────┘
```

## 📋 Tables Principales

### 1. Table `users`
Table centrale pour tous les utilisateurs (élèves, professeurs, admins).

```sql
CREATE TABLE users (
  id                UUID PRIMARY KEY DEFAULT uuid_generate_v4(),

  -- Authentification
  email             VARCHAR(255) UNIQUE NOT NULL,
  password_hash     VARCHAR(255) NOT NULL,
  email_verified    BOOLEAN DEFAULT FALSE,
  email_verified_at TIMESTAMP,

  -- Informations personnelles
  first_name        VARCHAR(100) NOT NULL,
  last_name         VARCHAR(100) NOT NULL,
  phone             VARCHAR(20),
  phone_verified    BOOLEAN DEFAULT FALSE,
  date_of_birth     DATE,
  gender            VARCHAR(10) CHECK (gender IN ('M', 'F', 'Other')),

  -- Avatar & Médias
  avatar_url        VARCHAR(500),

  -- Rôle & Statut
  role              VARCHAR(20) NOT NULL DEFAULT 'student'
                    CHECK (role IN ('student', 'teacher', 'admin', 'super_admin')),
  status            VARCHAR(20) NOT NULL DEFAULT 'active'
                    CHECK (status IN ('active', 'inactive', 'suspended', 'banned')),

  -- Localisation
  city              VARCHAR(100),
  postal_code       VARCHAR(20),
  country           VARCHAR(2) DEFAULT 'FR', -- Code ISO
  location          GEOGRAPHY(POINT, 4326), -- PostGIS

  -- OAuth
  google_id         VARCHAR(255) UNIQUE,
  facebook_id       VARCHAR(255) UNIQUE,
  apple_id          VARCHAR(255) UNIQUE,

  -- Préférences
  language          VARCHAR(5) DEFAULT 'fr',
  timezone          VARCHAR(50) DEFAULT 'Europe/Paris',
  currency          VARCHAR(3) DEFAULT 'EUR',

  -- Notifications
  notifications_settings JSONB DEFAULT '{
    "email": {
      "bookings": true,
      "messages": true,
      "reviews": true,
      "promotions": false
    },
    "push": {
      "messages": true,
      "reminders": true
    },
    "sms": {
      "reminders": false
    }
  }',

  -- Métadonnées
  created_at        TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at        TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  last_login_at     TIMESTAMP,
  last_login_ip     INET,
  deleted_at        TIMESTAMP, -- Soft delete (RGPD)

  -- Indexes
  CONSTRAINT users_email_check CHECK (email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$')
);

-- Indexes
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_role ON users(role);
CREATE INDEX idx_users_status ON users(status);
CREATE INDEX idx_users_location ON users USING GIST(location);
CREATE INDEX idx_users_created_at ON users(created_at);
```

### 2. Table `teacher_profiles`
Profil détaillé pour les professeurs.

```sql
CREATE TABLE teacher_profiles (
  id                    UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id               UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,

  -- Présentation
  headline              VARCHAR(200), -- "Professeur de maths, 10 ans d'expérience"
  bio                   TEXT,
  video_url             VARCHAR(500), -- Vidéo de présentation
  cover_image_url       VARCHAR(500),

  -- Badges & Vérifications
  identity_verified     BOOLEAN DEFAULT FALSE,
  background_check      BOOLEAN DEFAULT FALSE,
  pro_badge             BOOLEAN DEFAULT FALSE, -- Badge "Pro"

  -- Disponibilité générale
  teaching_mode         VARCHAR[] DEFAULT ARRAY['in-person'],
                        -- ['in-person', 'online', 'at-teacher']
  travel_radius_km      INTEGER, -- Rayon de déplacement
  travel_fee            DECIMAL(10, 2), -- Frais de déplacement

  -- Paramètres de réservation
  min_advance_hours     INTEGER DEFAULT 24, -- Réservation min 24h à l'avance
  max_advance_days      INTEGER DEFAULT 90,
  auto_accept_bookings  BOOLEAN DEFAULT FALSE,
  buffer_time_minutes   INTEGER DEFAULT 0, -- Temps entre 2 cours

  -- Statistiques
  total_lessons         INTEGER DEFAULT 0,
  total_students        INTEGER DEFAULT 0,
  average_rating        DECIMAL(3, 2) DEFAULT 0,
  response_time_minutes INTEGER, -- Temps de réponse moyen
  response_rate         DECIMAL(5, 2) DEFAULT 0, -- %

  -- Statut professeur
  approval_status       VARCHAR(20) DEFAULT 'pending'
                        CHECK (approval_status IN ('pending', 'approved', 'rejected', 'suspended')),
  approved_at           TIMESTAMP,
  approved_by           UUID REFERENCES users(id),
  rejection_reason      TEXT,

  -- Calendrier externe
  google_calendar_id    VARCHAR(255),
  calendar_sync_enabled BOOLEAN DEFAULT FALSE,
  calendar_last_sync    TIMESTAMP,

  -- Métadonnées
  created_at            TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at            TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

  CONSTRAINT teacher_profiles_user_unique UNIQUE(user_id)
);

-- Indexes
CREATE INDEX idx_teacher_profiles_user_id ON teacher_profiles(user_id);
CREATE INDEX idx_teacher_profiles_approval_status ON teacher_profiles(approval_status);
CREATE INDEX idx_teacher_profiles_rating ON teacher_profiles(average_rating DESC);
```

### 3. Table `teacher_education`
Formation académique des professeurs.

```sql
CREATE TABLE teacher_education (
  id                UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  teacher_profile_id UUID NOT NULL REFERENCES teacher_profiles(id) ON DELETE CASCADE,

  degree            VARCHAR(200) NOT NULL, -- "Master Mathématiques"
  institution       VARCHAR(200) NOT NULL, -- "Sorbonne Université"
  year              INTEGER,
  certificate_url   VARCHAR(500), -- URL du diplôme scanné
  verified          BOOLEAN DEFAULT FALSE,

  display_order     INTEGER DEFAULT 0,

  created_at        TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_teacher_education_profile ON teacher_education(teacher_profile_id);
```

### 4. Table `teacher_experience`
Expériences professionnelles des professeurs.

```sql
CREATE TABLE teacher_experience (
  id                UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  teacher_profile_id UUID NOT NULL REFERENCES teacher_profiles(id) ON DELETE CASCADE,

  title             VARCHAR(200) NOT NULL, -- "Professeur de mathématiques"
  organization      VARCHAR(200) NOT NULL, -- "Lycée Henri IV"
  start_date        DATE NOT NULL,
  end_date          DATE, -- NULL si en cours
  description       TEXT,

  display_order     INTEGER DEFAULT 0,

  created_at        TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_teacher_experience_profile ON teacher_experience(teacher_profile_id);
```

### 5. Table `teacher_certifications`
Certifications et badges des professeurs.

```sql
CREATE TABLE teacher_certifications (
  id                UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  teacher_profile_id UUID NOT NULL REFERENCES teacher_profiles(id) ON DELETE CASCADE,

  name              VARCHAR(200) NOT NULL,
  issuer            VARCHAR(200) NOT NULL,
  issue_date        DATE,
  expiry_date       DATE,
  certificate_url   VARCHAR(500),
  verified          BOOLEAN DEFAULT FALSE,

  created_at        TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_teacher_certifications_profile ON teacher_certifications(teacher_profile_id);
```

### 6. Table `teacher_languages`
Langues parlées par les professeurs.

```sql
CREATE TABLE teacher_languages (
  id                UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  teacher_profile_id UUID NOT NULL REFERENCES teacher_profiles(id) ON DELETE CASCADE,

  language          VARCHAR(50) NOT NULL, -- "Français", "English"
  language_code     VARCHAR(5), -- "fr", "en"
  proficiency_level VARCHAR(10) NOT NULL
                    CHECK (proficiency_level IN ('A1', 'A2', 'B1', 'B2', 'C1', 'C2', 'Native')),

  CONSTRAINT teacher_languages_unique UNIQUE(teacher_profile_id, language_code)
);

CREATE INDEX idx_teacher_languages_profile ON teacher_languages(teacher_profile_id);
```

### 7. Table `categories`
Catégories de matières.

```sql
CREATE TABLE categories (
  id                UUID PRIMARY KEY DEFAULT uuid_generate_v4(),

  name              VARCHAR(100) NOT NULL,
  slug              VARCHAR(100) UNIQUE NOT NULL,
  description       TEXT,
  icon              VARCHAR(50), -- Nom de l'icône
  color             VARCHAR(7), -- Code couleur hex

  display_order     INTEGER DEFAULT 0,
  visible           BOOLEAN DEFAULT TRUE,

  created_at        TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at        TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Indexes
CREATE INDEX idx_categories_slug ON categories(slug);
CREATE INDEX idx_categories_visible ON categories(visible);

-- Données d'exemple
INSERT INTO categories (name, slug, icon, color) VALUES
  ('Soutien Scolaire', 'soutien-scolaire', '📚', '#3B82F6'),
  ('Musique', 'musique', '🎵', '#8B5CF6'),
  ('Sport', 'sport', '🏃', '#10B981'),
  ('Arts', 'arts', '🎨', '#F59E0B'),
  ('Informatique', 'informatique', '💻', '#6366F1'),
  ('Langues', 'langues', '🗣️', '#EC4899'),
  ('Autres', 'autres', '🎭', '#64748B');
```

### 8. Table `subjects`
Matières enseignées.

```sql
CREATE TABLE subjects (
  id                UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  category_id       UUID NOT NULL REFERENCES categories(id) ON DELETE CASCADE,

  name              VARCHAR(100) NOT NULL,
  slug              VARCHAR(100) UNIQUE NOT NULL,
  description       TEXT,

  -- SEO
  meta_title        VARCHAR(200),
  meta_description  TEXT,

  display_order     INTEGER DEFAULT 0,
  active            BOOLEAN DEFAULT TRUE,

  created_at        TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at        TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Indexes
CREATE INDEX idx_subjects_category ON subjects(category_id);
CREATE INDEX idx_subjects_slug ON subjects(slug);
CREATE INDEX idx_subjects_active ON subjects(active);

-- Données d'exemple
INSERT INTO subjects (category_id, name, slug) VALUES
  ((SELECT id FROM categories WHERE slug = 'soutien-scolaire'), 'Mathématiques', 'mathematiques'),
  ((SELECT id FROM categories WHERE slug = 'soutien-scolaire'), 'Français', 'francais'),
  ((SELECT id FROM categories WHERE slug = 'soutien-scolaire'), 'Physique-Chimie', 'physique-chimie'),
  ((SELECT id FROM categories WHERE slug = 'musique'), 'Piano', 'piano'),
  ((SELECT id FROM categories WHERE slug = 'musique'), 'Guitare', 'guitare'),
  ((SELECT id FROM categories WHERE slug = 'sport'), 'Yoga', 'yoga'),
  ((SELECT id FROM categories WHERE slug = 'langues'), 'Anglais', 'anglais');
```

### 9. Table `subject_offers`
Offres de cours par professeur et matière.

```sql
CREATE TABLE subject_offers (
  id                UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  teacher_profile_id UUID NOT NULL REFERENCES teacher_profiles(id) ON DELETE CASCADE,
  subject_id        UUID NOT NULL REFERENCES subjects(id) ON DELETE CASCADE,

  -- Niveaux enseignés
  levels            VARCHAR[] NOT NULL,
                    -- ['Primaire', 'Collège', 'Lycée', 'Université', 'Adulte', 'Professionnel']

  -- Tarification
  hourly_rate       DECIMAL(10, 2) NOT NULL,
  first_lesson_free BOOLEAN DEFAULT FALSE,

  -- Packs de cours
  packages          JSONB DEFAULT '[]',
  -- Exemple: [{"lessons": 10, "discount": 15, "totalPrice": 255}]

  -- Modes de cours
  teaching_modes    VARCHAR[] NOT NULL,
                    -- ['in-person', 'online', 'at-teacher']

  -- Description
  description       TEXT,
  methodology       TEXT,

  -- Statut
  active            BOOLEAN DEFAULT TRUE,

  created_at        TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at        TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

  CONSTRAINT subject_offers_unique UNIQUE(teacher_profile_id, subject_id)
);

-- Indexes
CREATE INDEX idx_subject_offers_teacher ON subject_offers(teacher_profile_id);
CREATE INDEX idx_subject_offers_subject ON subject_offers(subject_id);
CREATE INDEX idx_subject_offers_active ON subject_offers(active);
CREATE INDEX idx_subject_offers_price ON subject_offers(hourly_rate);
```

### 10. Table `availability_schedules`
Disponibilités récurrentes des professeurs.

```sql
CREATE TABLE availability_schedules (
  id                UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  teacher_profile_id UUID NOT NULL REFERENCES teacher_profiles(id) ON DELETE CASCADE,

  -- Jour de la semaine (0 = Dimanche, 6 = Samedi)
  day_of_week       INTEGER NOT NULL CHECK (day_of_week >= 0 AND day_of_week <= 6),

  -- Plage horaire
  start_time        TIME NOT NULL,
  end_time          TIME NOT NULL,

  -- Durée des créneaux
  slot_duration_minutes INTEGER DEFAULT 60,

  -- Statut
  active            BOOLEAN DEFAULT TRUE,

  created_at        TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

  CONSTRAINT availability_schedules_time_check CHECK (end_time > start_time)
);

-- Indexes
CREATE INDEX idx_availability_schedules_teacher ON availability_schedules(teacher_profile_id);
CREATE INDEX idx_availability_schedules_day ON availability_schedules(day_of_week);
```

### 11. Table `availability_exceptions`
Créneaux spécifiques ou indisponibilités.

```sql
CREATE TABLE availability_exceptions (
  id                UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  teacher_profile_id UUID NOT NULL REFERENCES teacher_profiles(id) ON DELETE CASCADE,

  -- Date spécifique
  date              DATE NOT NULL,

  -- Plage horaire (NULL si indisponible toute la journée)
  start_time        TIME,
  end_time          TIME,

  -- Type
  type              VARCHAR(20) NOT NULL
                    CHECK (type IN ('available', 'unavailable')),

  -- Raison (pour indisponibilités)
  reason            VARCHAR(200),

  created_at        TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Indexes
CREATE INDEX idx_availability_exceptions_teacher ON availability_exceptions(teacher_profile_id);
CREATE INDEX idx_availability_exceptions_date ON availability_exceptions(date);
```

### 12. Table `bookings`
Réservations de cours.

```sql
CREATE TABLE bookings (
  id                UUID PRIMARY KEY DEFAULT uuid_generate_v4(),

  -- Participants
  student_id        UUID NOT NULL REFERENCES users(id),
  teacher_id        UUID NOT NULL REFERENCES users(id),
  subject_offer_id  UUID NOT NULL REFERENCES subject_offers(id),

  -- Horaire
  scheduled_at      TIMESTAMP NOT NULL,
  duration_minutes  INTEGER NOT NULL DEFAULT 60,
  ends_at           TIMESTAMP NOT NULL,

  -- Mode de cours
  teaching_mode     VARCHAR(20) NOT NULL
                    CHECK (teaching_mode IN ('in-person', 'online', 'at-teacher')),

  -- Localisation (si cours à domicile)
  location_address  TEXT,
  location_coords   GEOGRAPHY(POINT, 4326),
  location_notes    TEXT, -- Instructions (code porte, etc.)

  -- Lien visio (si cours en ligne)
  online_meeting_url VARCHAR(500),

  -- Statut
  status            VARCHAR(20) NOT NULL DEFAULT 'pending'
                    CHECK (status IN ('pending', 'confirmed', 'cancelled', 'completed', 'no-show')),

  -- Récurrence
  is_recurring      BOOLEAN DEFAULT FALSE,
  recurrence_parent_id UUID REFERENCES bookings(id),
  recurrence_rule   JSONB, -- {"frequency": "weekly", "count": 10}

  -- Message initial
  student_message   TEXT,

  -- Annulation
  cancelled_at      TIMESTAMP,
  cancelled_by      UUID REFERENCES users(id),
  cancellation_reason TEXT,

  -- Confirmation
  confirmed_at      TIMESTAMP,

  -- Completion
  completed_at      TIMESTAMP,

  -- Notes
  teacher_notes     TEXT, -- Notes privées du professeur

  -- Métadonnées
  created_at        TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at        TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Indexes
CREATE INDEX idx_bookings_student ON bookings(student_id);
CREATE INDEX idx_bookings_teacher ON bookings(teacher_id);
CREATE INDEX idx_bookings_subject_offer ON bookings(subject_offer_id);
CREATE INDEX idx_bookings_status ON bookings(status);
CREATE INDEX idx_bookings_scheduled_at ON bookings(scheduled_at);
CREATE INDEX idx_bookings_created_at ON bookings(created_at);
```

### 13. Table `payments`
Paiements effectués.

```sql
CREATE TABLE payments (
  id                UUID PRIMARY KEY DEFAULT uuid_generate_v4(),

  booking_id        UUID REFERENCES bookings(id),
  student_id        UUID NOT NULL REFERENCES users(id),
  teacher_id        UUID NOT NULL REFERENCES users(id),

  -- Montants
  amount            DECIMAL(10, 2) NOT NULL, -- Montant total payé par l'élève
  teacher_amount    DECIMAL(10, 2) NOT NULL, -- Montant pour le professeur
  platform_fee      DECIMAL(10, 2) NOT NULL, -- Commission plateforme

  currency          VARCHAR(3) DEFAULT 'EUR',

  -- Méthode de paiement
  payment_method    VARCHAR(50) NOT NULL, -- 'card', 'sepa', 'apple_pay', etc.

  -- Stripe
  stripe_payment_intent_id VARCHAR(255),
  stripe_charge_id  VARCHAR(255),

  -- Statut
  status            VARCHAR(20) NOT NULL DEFAULT 'pending'
                    CHECK (status IN ('pending', 'succeeded', 'failed', 'refunded', 'cancelled')),

  -- Remboursement
  refunded_at       TIMESTAMP,
  refund_amount     DECIMAL(10, 2),
  refund_reason     TEXT,

  -- Métadonnées
  metadata          JSONB,

  created_at        TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at        TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Indexes
CREATE INDEX idx_payments_booking ON payments(booking_id);
CREATE INDEX idx_payments_student ON payments(student_id);
CREATE INDEX idx_payments_teacher ON payments(teacher_id);
CREATE INDEX idx_payments_status ON payments(status);
CREATE INDEX idx_payments_created_at ON payments(created_at);
```

### 14. Table `payouts`
Virements vers les professeurs.

```sql
CREATE TABLE payouts (
  id                UUID PRIMARY KEY DEFAULT uuid_generate_v4(),

  teacher_id        UUID NOT NULL REFERENCES users(id),

  -- Montant
  amount            DECIMAL(10, 2) NOT NULL,
  currency          VARCHAR(3) DEFAULT 'EUR',

  -- Stripe Connect
  stripe_payout_id  VARCHAR(255),
  stripe_account_id VARCHAR(255),

  -- Statut
  status            VARCHAR(20) NOT NULL DEFAULT 'pending'
                    CHECK (status IN ('pending', 'in_transit', 'paid', 'failed', 'cancelled')),

  -- Dates
  arrival_date      DATE, -- Date d'arrivée estimée
  paid_at           TIMESTAMP,
  failed_at         TIMESTAMP,
  failure_reason    TEXT,

  -- Métadonnées
  created_at        TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at        TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Indexes
CREATE INDEX idx_payouts_teacher ON payouts(teacher_id);
CREATE INDEX idx_payouts_status ON payouts(status);
CREATE INDEX idx_payouts_created_at ON payouts(created_at);
```

### 15. Table `reviews`
Avis et évaluations.

```sql
CREATE TABLE reviews (
  id                UUID PRIMARY KEY DEFAULT uuid_generate_v4(),

  booking_id        UUID NOT NULL REFERENCES bookings(id),
  student_id        UUID NOT NULL REFERENCES users(id),
  teacher_id        UUID NOT NULL REFERENCES users(id),

  -- Note globale
  rating            INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),

  -- Critères détaillés
  pedagogy_rating   INTEGER CHECK (pedagogy_rating >= 1 AND pedagogy_rating <= 5),
  expertise_rating  INTEGER CHECK (expertise_rating >= 1 AND expertise_rating <= 5),
  communication_rating INTEGER CHECK (communication_rating >= 1 AND communication_rating <= 5),
  punctuality_rating INTEGER CHECK (punctuality_rating >= 1 AND punctuality_rating <= 5),
  value_rating      INTEGER CHECK (value_rating >= 1 AND value_rating <= 5),

  -- Commentaire
  comment           TEXT,

  -- Options
  is_anonymous      BOOLEAN DEFAULT FALSE,

  -- Réponse du professeur
  teacher_response  TEXT,
  teacher_response_at TIMESTAMP,

  -- Modération
  is_verified       BOOLEAN DEFAULT TRUE, -- Cours vérifié
  is_published      BOOLEAN DEFAULT TRUE,
  is_reported       BOOLEAN DEFAULT FALSE,
  moderation_status VARCHAR(20) DEFAULT 'approved'
                    CHECK (moderation_status IN ('pending', 'approved', 'rejected')),

  -- Métadonnées
  helpful_count     INTEGER DEFAULT 0, -- Nombre de "utile"

  created_at        TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at        TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

  CONSTRAINT reviews_booking_unique UNIQUE(booking_id)
);

-- Indexes
CREATE INDEX idx_reviews_student ON reviews(student_id);
CREATE INDEX idx_reviews_teacher ON reviews(teacher_id);
CREATE INDEX idx_reviews_rating ON reviews(rating);
CREATE INDEX idx_reviews_published ON reviews(is_published);
CREATE INDEX idx_reviews_created_at ON reviews(created_at DESC);
```

### 16. Table `conversations`
Conversations entre utilisateurs.

```sql
CREATE TABLE conversations (
  id                UUID PRIMARY KEY DEFAULT uuid_generate_v4(),

  -- Participants (élève et professeur)
  student_id        UUID NOT NULL REFERENCES users(id),
  teacher_id        UUID NOT NULL REFERENCES users(id),

  -- Sujet (optionnel)
  subject_id        UUID REFERENCES subjects(id),

  -- Dernier message
  last_message_at   TIMESTAMP,
  last_message_preview TEXT,

  -- Statut
  archived_by_student BOOLEAN DEFAULT FALSE,
  archived_by_teacher BOOLEAN DEFAULT FALSE,

  created_at        TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at        TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

  CONSTRAINT conversations_participants_unique UNIQUE(student_id, teacher_id)
);

-- Indexes
CREATE INDEX idx_conversations_student ON conversations(student_id);
CREATE INDEX idx_conversations_teacher ON conversations(teacher_id);
CREATE INDEX idx_conversations_last_message ON conversations(last_message_at DESC);
```

### 17. Table `messages`
Messages individuels.

```sql
CREATE TABLE messages (
  id                UUID PRIMARY KEY DEFAULT uuid_generate_v4(),

  conversation_id   UUID NOT NULL REFERENCES conversations(id) ON DELETE CASCADE,
  sender_id         UUID NOT NULL REFERENCES users(id),

  -- Contenu
  content           TEXT NOT NULL,

  -- Pièces jointes
  attachments       JSONB DEFAULT '[]',
  -- Exemple: [{"url": "...", "type": "image", "name": "file.jpg"}]

  -- Lecture
  read_at           TIMESTAMP,

  -- Métadonnées
  created_at        TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

  deleted_at        TIMESTAMP -- Soft delete
);

-- Indexes
CREATE INDEX idx_messages_conversation ON messages(conversation_id);
CREATE INDEX idx_messages_sender ON messages(sender_id);
CREATE INDEX idx_messages_created_at ON messages(created_at);
CREATE INDEX idx_messages_read_at ON messages(read_at);
```

### 18. Table `favorites`
Professeurs favoris des élèves.

```sql
CREATE TABLE favorites (
  id                UUID PRIMARY KEY DEFAULT uuid_generate_v4(),

  student_id        UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  teacher_id        UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,

  created_at        TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

  CONSTRAINT favorites_unique UNIQUE(student_id, teacher_id)
);

-- Indexes
CREATE INDEX idx_favorites_student ON favorites(student_id);
CREATE INDEX idx_favorites_teacher ON favorites(teacher_id);
```

### 19. Table `notifications`
Notifications système.

```sql
CREATE TABLE notifications (
  id                UUID PRIMARY KEY DEFAULT uuid_generate_v4(),

  user_id           UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,

  -- Type de notification
  type              VARCHAR(50) NOT NULL,
  -- 'booking_confirmed', 'new_message', 'review_received', etc.

  -- Contenu
  title             VARCHAR(200) NOT NULL,
  message           TEXT NOT NULL,

  -- Lien
  action_url        VARCHAR(500),

  -- Statut
  read_at           TIMESTAMP,

  -- Métadonnées
  data              JSONB, -- Données supplémentaires

  created_at        TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Indexes
CREATE INDEX idx_notifications_user ON notifications(user_id);
CREATE INDEX idx_notifications_read ON notifications(read_at);
CREATE INDEX idx_notifications_created_at ON notifications(created_at DESC);
```

### 20. Table `promo_codes`
Codes promotionnels.

```sql
CREATE TABLE promo_codes (
  id                UUID PRIMARY KEY DEFAULT uuid_generate_v4(),

  -- Code
  code              VARCHAR(50) UNIQUE NOT NULL,

  -- Type de réduction
  discount_type     VARCHAR(20) NOT NULL CHECK (discount_type IN ('percentage', 'fixed')),
  discount_value    DECIMAL(10, 2) NOT NULL,

  -- Conditions
  min_amount        DECIMAL(10, 2),
  max_discount      DECIMAL(10, 2),
  first_order_only  BOOLEAN DEFAULT FALSE,

  -- Matières éligibles
  subject_ids       UUID[], -- NULL = toutes les matières

  -- Validité
  valid_from        TIMESTAMP NOT NULL,
  valid_to          TIMESTAMP NOT NULL,

  -- Utilisation
  usage_limit       INTEGER, -- NULL = illimité
  per_user_limit    INTEGER DEFAULT 1,
  usage_count       INTEGER DEFAULT 0,

  -- Statut
  active            BOOLEAN DEFAULT TRUE,

  -- Métadonnées
  created_by        UUID REFERENCES users(id),
  created_at        TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Indexes
CREATE INDEX idx_promo_codes_code ON promo_codes(code);
CREATE INDEX idx_promo_codes_active ON promo_codes(active);
CREATE INDEX idx_promo_codes_valid ON promo_codes(valid_from, valid_to);
```

### 21. Table `promo_code_usages`
Utilisation des codes promo.

```sql
CREATE TABLE promo_code_usages (
  id                UUID PRIMARY KEY DEFAULT uuid_generate_v4(),

  promo_code_id     UUID NOT NULL REFERENCES promo_codes(id),
  user_id           UUID NOT NULL REFERENCES users(id),
  booking_id        UUID REFERENCES bookings(id),

  discount_amount   DECIMAL(10, 2) NOT NULL,

  created_at        TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Indexes
CREATE INDEX idx_promo_code_usages_code ON promo_code_usages(promo_code_id);
CREATE INDEX idx_promo_code_usages_user ON promo_code_usages(user_id);
```

### 22. Table `referrals`
Programme de parrainage.

```sql
CREATE TABLE referrals (
  id                UUID PRIMARY KEY DEFAULT uuid_generate_v4(),

  -- Parrain
  referrer_id       UUID NOT NULL REFERENCES users(id),
  referrer_code     VARCHAR(50) UNIQUE NOT NULL,

  -- Filleul
  referred_id       UUID REFERENCES users(id),
  referred_email    VARCHAR(255),

  -- Statut
  status            VARCHAR(20) NOT NULL DEFAULT 'pending'
                    CHECK (status IN ('pending', 'completed', 'expired')),

  -- Récompenses
  referrer_reward   DECIMAL(10, 2), -- 20€
  referred_reward   DECIMAL(10, 2), -- 20€

  -- Dates
  completed_at      TIMESTAMP, -- Quand le filleul a effectué sa 1ère réservation

  created_at        TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Indexes
CREATE INDEX idx_referrals_referrer ON referrals(referrer_id);
CREATE INDEX idx_referrals_referred ON referrals(referred_id);
CREATE INDEX idx_referrals_code ON referrals(referrer_code);
```

### 23. Table `reports`
Signalements.

```sql
CREATE TABLE reports (
  id                UUID PRIMARY KEY DEFAULT uuid_generate_v4(),

  -- Auteur du signalement
  reporter_id       UUID NOT NULL REFERENCES users(id),

  -- Élément signalé
  reported_type     VARCHAR(50) NOT NULL, -- 'user', 'review', 'message'
  reported_id       UUID NOT NULL,

  -- Raison
  reason            VARCHAR(50) NOT NULL
                    CHECK (reason IN ('spam', 'inappropriate', 'fake', 'offensive', 'harassment', 'other')),
  description       TEXT,

  -- Statut
  status            VARCHAR(20) DEFAULT 'pending'
                    CHECK (status IN ('pending', 'investigating', 'resolved', 'dismissed')),

  -- Traitement
  assigned_to       UUID REFERENCES users(id), -- Admin assigné
  admin_notes       TEXT,
  resolved_at       TIMESTAMP,
  resolution        TEXT,

  created_at        TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at        TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Indexes
CREATE INDEX idx_reports_reporter ON reports(reporter_id);
CREATE INDEX idx_reports_reported ON reports(reported_type, reported_id);
CREATE INDEX idx_reports_status ON reports(status);
```

### 24. Table `audit_logs`
Logs d'audit (actions admin).

```sql
CREATE TABLE audit_logs (
  id                UUID PRIMARY KEY DEFAULT uuid_generate_v4(),

  -- Admin qui effectue l'action
  admin_id          UUID NOT NULL REFERENCES users(id),

  -- Action
  action            VARCHAR(100) NOT NULL, -- 'user.suspend', 'review.delete', etc.

  -- Cible
  target_type       VARCHAR(50),
  target_id         UUID,

  -- Détails
  details           JSONB,

  -- IP
  ip_address        INET,
  user_agent        TEXT,

  created_at        TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Indexes
CREATE INDEX idx_audit_logs_admin ON audit_logs(admin_id);
CREATE INDEX idx_audit_logs_action ON audit_logs(action);
CREATE INDEX idx_audit_logs_created_at ON audit_logs(created_at DESC);
```

### 25. Table `search_logs`
Logs de recherche (analytics).

```sql
CREATE TABLE search_logs (
  id                UUID PRIMARY KEY DEFAULT uuid_generate_v4(),

  user_id           UUID REFERENCES users(id),
  session_id        VARCHAR(255),

  -- Requête
  query             TEXT,
  filters           JSONB,

  -- Résultats
  results_count     INTEGER,

  -- Interaction
  clicked_teacher_id UUID REFERENCES users(id),
  clicked_position  INTEGER, -- Position dans les résultats

  created_at        TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Indexes
CREATE INDEX idx_search_logs_user ON search_logs(user_id);
CREATE INDEX idx_search_logs_created_at ON search_logs(created_at);
```

## 🔐 Sécurité & Permissions

### Triggers pour `updated_at`

```sql
-- Fonction générique pour mettre à jour updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = CURRENT_TIMESTAMP;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Appliquer à toutes les tables avec updated_at
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_teacher_profiles_updated_at BEFORE UPDATE ON teacher_profiles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ... (répéter pour chaque table avec updated_at)
```

### Trigger pour calculer la note moyenne

```sql
CREATE OR REPLACE FUNCTION update_teacher_rating()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE teacher_profiles
  SET
    average_rating = (
      SELECT AVG(rating)::DECIMAL(3,2)
      FROM reviews
      WHERE teacher_id = NEW.teacher_id AND is_published = TRUE
    ),
    updated_at = CURRENT_TIMESTAMP
  WHERE user_id = NEW.teacher_id;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_rating_on_review AFTER INSERT OR UPDATE ON reviews
  FOR EACH ROW EXECUTE FUNCTION update_teacher_rating();
```

### Row Level Security (RLS)

```sql
-- Activer RLS sur la table messages
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;

-- Policy: Les utilisateurs ne peuvent voir que leurs propres messages
CREATE POLICY messages_select_policy ON messages
  FOR SELECT
  USING (
    sender_id = current_setting('app.current_user_id')::UUID
    OR
    conversation_id IN (
      SELECT id FROM conversations
      WHERE student_id = current_setting('app.current_user_id')::UUID
         OR teacher_id = current_setting('app.current_user_id')::UUID
    )
  );
```

## 📊 Vues Utiles

### Vue: Profils professeurs complets

```sql
CREATE VIEW teacher_profiles_full AS
SELECT
  tp.*,
  u.email,
  u.first_name,
  u.last_name,
  u.avatar_url,
  u.city,
  u.location,
  COUNT(DISTINCT b.id) FILTER (WHERE b.status = 'completed') as lessons_count,
  COUNT(DISTINCT r.id) as reviews_count,
  COALESCE(AVG(r.rating), 0)::DECIMAL(3,2) as current_rating
FROM teacher_profiles tp
JOIN users u ON tp.user_id = u.id
LEFT JOIN subject_offers so ON tp.id = so.teacher_profile_id
LEFT JOIN bookings b ON u.id = b.teacher_id
LEFT JOIN reviews r ON u.id = r.teacher_id AND r.is_published = TRUE
GROUP BY tp.id, u.id;
```

### Vue: Recherche de professeurs

```sql
CREATE MATERIALIZED VIEW teacher_search_index AS
SELECT
  u.id as teacher_id,
  u.first_name || ' ' || u.last_name as full_name,
  tp.headline,
  tp.bio,
  tp.average_rating,
  tp.total_lessons,
  u.city,
  u.location,
  ARRAY_AGG(DISTINCT s.name) as subjects,
  ARRAY_AGG(DISTINCT s.id) as subject_ids,
  MIN(so.hourly_rate) as min_price,
  MAX(so.hourly_rate) as max_price,
  tp.teaching_mode,
  tp.approval_status,
  u.created_at
FROM users u
JOIN teacher_profiles tp ON u.id = tp.user_id
LEFT JOIN subject_offers so ON tp.id = so.teacher_profile_id
LEFT JOIN subjects s ON so.subject_id = s.id
WHERE u.role = 'teacher' AND tp.approval_status = 'approved'
GROUP BY u.id, tp.id;

-- Index pour la recherche géographique
CREATE INDEX idx_teacher_search_location ON teacher_search_index USING GIST(location);

-- Index pour la recherche textuelle
CREATE INDEX idx_teacher_search_fulltext ON teacher_search_index
  USING GIN(to_tsvector('french', full_name || ' ' || COALESCE(headline, '') || ' ' || COALESCE(bio, '')));

-- Rafraîchir régulièrement
REFRESH MATERIALIZED VIEW CONCURRENTLY teacher_search_index;
```

## 🎯 Requêtes Optimisées Courantes

### Recherche de professeurs

```sql
-- Recherche par matière, localisation et prix
SELECT *
FROM teacher_search_index
WHERE
  'Mathématiques' = ANY(subjects)
  AND ST_DWithin(
    location,
    ST_SetSRID(ST_MakePoint(2.3522, 48.8566), 4326)::geography,
    10000 -- 10km en mètres
  )
  AND min_price <= 50
  AND approval_status = 'approved'
ORDER BY
  ST_Distance(location, ST_SetSRID(ST_MakePoint(2.3522, 48.8566), 4326)::geography),
  average_rating DESC
LIMIT 20;
```

### Dashboard professeur

```sql
-- Statistiques du mois
SELECT
  COUNT(*) FILTER (WHERE status = 'completed') as lessons_completed,
  COUNT(*) FILTER (WHERE status = 'pending') as lessons_pending,
  SUM(p.teacher_amount) FILTER (WHERE p.status = 'succeeded') as earnings
FROM bookings b
LEFT JOIN payments p ON b.id = p.booking_id
WHERE
  b.teacher_id = :teacher_id
  AND b.scheduled_at >= DATE_TRUNC('month', CURRENT_DATE)
  AND b.scheduled_at < DATE_TRUNC('month', CURRENT_DATE) + INTERVAL '1 month';
```

### Cours à venir

```sql
SELECT
  b.*,
  u.first_name as student_first_name,
  u.avatar_url as student_avatar,
  s.name as subject_name
FROM bookings b
JOIN users u ON b.student_id = u.id
JOIN subject_offers so ON b.subject_offer_id = so.id
JOIN subjects s ON so.subject_id = s.id
WHERE
  b.teacher_id = :teacher_id
  AND b.status IN ('confirmed', 'pending')
  AND b.scheduled_at >= CURRENT_TIMESTAMP
ORDER BY b.scheduled_at ASC
LIMIT 10;
```

## 🔄 Migrations & Seeders

### Migration initiale (Prisma)

```prisma
// schema.prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model User {
  id            String   @id @default(uuid())
  email         String   @unique
  passwordHash  String   @map("password_hash")
  emailVerified Boolean  @default(false) @map("email_verified")
  firstName     String   @map("first_name")
  lastName      String   @map("last_name")
  role          Role     @default(STUDENT)
  status        Status   @default(ACTIVE)
  createdAt     DateTime @default(now()) @map("created_at")
  updatedAt     DateTime @updatedAt @map("updated_at")

  teacherProfile TeacherProfile?
  sentMessages   Message[]       @relation("SentMessages")
  // ... autres relations

  @@map("users")
}

enum Role {
  STUDENT
  TEACHER
  ADMIN
  SUPER_ADMIN
}

enum Status {
  ACTIVE
  INACTIVE
  SUSPENDED
  BANNED
}

// ... autres modèles
```

### Seeder de données de test

```sql
-- Créer des utilisateurs de test
INSERT INTO users (email, password_hash, first_name, last_name, role, city, postal_code, location)
VALUES
  ('sophie.martin@test.fr', '$2b$10$...', 'Sophie', 'Martin', 'teacher', 'Paris', '75015', ST_SetSRID(ST_MakePoint(2.3522, 48.8566), 4326)),
  ('jean.dupont@test.fr', '$2b$10$...', 'Jean', 'Dupont', 'student', 'Paris', '75001', ST_SetSRID(ST_MakePoint(2.3412, 48.8606), 4326));
```

## 📈 Performance & Optimisation

### Index composites recommandés

```sql
-- Recherche de professeurs par matière et localisation
CREATE INDEX idx_teacher_subject_location ON subject_offers(subject_id, teacher_profile_id)
  INCLUDE (hourly_rate, active);

-- Recherche de cours par professeur et dates
CREATE INDEX idx_bookings_teacher_date ON bookings(teacher_id, scheduled_at)
  WHERE status IN ('pending', 'confirmed');

-- Messages non lus
CREATE INDEX idx_messages_unread ON messages(conversation_id, created_at)
  WHERE read_at IS NULL;
```

### Partitionnement (pour grande échelle)

```sql
-- Partitionner les messages par mois
CREATE TABLE messages_2024_01 PARTITION OF messages
  FOR VALUES FROM ('2024-01-01') TO ('2024-02-01');

CREATE TABLE messages_2024_02 PARTITION OF messages
  FOR VALUES FROM ('2024-02-01') TO ('2024-03-01');

-- ... etc.
```

---

## 📝 Notes Importantes

1. **UUID vs INT**: Utilisation d'UUID pour éviter l'énumération et améliorer la sécurité
2. **Soft Delete**: Utilisation de `deleted_at` pour respecter le RGPD tout en conservant l'historique
3. **PostGIS**: Essentiel pour les recherches géographiques performantes
4. **JSONB**: Pour flexibilité (notifications_settings, packages, etc.)
5. **Indexes**: À créer selon les patterns de requêtes réels
6. **Materialized Views**: Pour accélérer les recherches complexes
7. **RLS**: Pour sécurité multi-tenant au niveau base de données
8. **Triggers**: Automatisation (notes moyennes, timestamps)

## 🔧 Commandes Utiles

```bash
# Créer la base de données
createdb superprof

# Activer les extensions
psql superprof -c "CREATE EXTENSION IF NOT EXISTS postgis;"
psql superprof -c "CREATE EXTENSION IF NOT EXISTS pg_trgm;"
psql superprof -c "CREATE EXTENSION IF NOT EXISTS \"uuid-ossp\";"

# Exécuter les migrations
psql superprof < schema.sql

# Backup
pg_dump superprof > backup.sql

# Restore
psql superprof < backup.sql
```
