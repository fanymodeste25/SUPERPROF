# SUPERPROF - Plateforme de Mise en Relation Professeurs/Élèves

## 📋 Vue d'Ensemble

SUPERPROF est une application web et mobile permettant de mettre en relation des professeurs particuliers avec des élèves recherchant des cours dans divers domaines (soutien scolaire, musique, sport, langues, etc.).

## 🎯 Objectifs du MVP

- Permettre aux professeurs de créer un profil détaillé et de proposer leurs services
- Offrir aux élèves un moteur de recherche efficace pour trouver le professeur idéal
- Faciliter la communication et la réservation de cours
- Garantir la qualité via un système d'avis et de validation

## 📚 Documentation

- [Architecture Technique](docs/ARCHITECTURE.md)
- [Fonctionnalités Clés](docs/FEATURES.md)
- [Schéma de Base de Données](docs/DATABASE.md)
- [Parcours Utilisateur](docs/USER_JOURNEY.md)
- [Stratégies de Monétisation](docs/MONETIZATION.md)

## 🚀 Démarrage Rapide

### Prérequis

- Node.js 18+
- PostgreSQL 14+
- npm ou yarn

### Installation

```bash
# Cloner le repository
git clone <repository-url>

# Installer les dépendances
npm install

# Configurer les variables d'environnement
cp .env.example .env

# Lancer les migrations de base de données
npm run migrate

# Démarrer le serveur de développement
npm run dev
```

## 🛠️ Technologies Utilisées

- **Frontend**: Next.js 14, React, TypeScript, Tailwind CSS
- **Backend**: Node.js, Express, Prisma ORM
- **Base de données**: PostgreSQL
- **Authentification**: NextAuth.js
- **Paiement**: Stripe
- **Hébergement**: Vercel (Frontend), Railway (Backend)

## 📱 Fonctionnalités Principales

### Pour les Professeurs
- Création et gestion de profil
- Définition des matières et tarifs
- Gestion du calendrier de disponibilités
- Réception et gestion des demandes de cours

### Pour les Élèves
- Recherche de professeurs par matière et localisation
- Consultation des profils et avis
- Messagerie interne
- Réservation et paiement de cours

### Pour les Administrateurs
- Validation des profils professeurs
- Modération des avis
- Gestion des litiges
- Statistiques et analytics

## 🤝 Contribution

Les contributions sont les bienvenues ! Veuillez consulter notre guide de contribution avant de soumettre une pull request.

## 📄 Licence

Ce projet est sous licence MIT.

## 📧 Contact

Pour toute question ou suggestion : contact@superprof.com
