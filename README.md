# SUPERPROF - Plateforme de Mise en Relation Professeurs/Élèves

## 📋 Vue d'Ensemble

SUPERPROF est une application web et mobile permettant de mettre en relation des professeurs particuliers avec des élèves recherchant des cours dans divers domaines (soutien scolaire, musique, sport, langues, etc.).

## 🎯 Objectifs du MVP

- Permettre aux professeurs de créer un profil détaillé et de proposer leurs services
- Offrir aux élèves un moteur de recherche efficace pour trouver le professeur idéal
- Faciliter la communication et la réservation de cours
- Garantir la qualité via un système d'avis et de validation

## 📚 Documentation

- **[Guide d'Installation Complet (PC vierge)](docs/INSTALLATION_COMPLETE.md)** ⭐ *Nouveau - Installation depuis zéro*
- [Architecture Technique](docs/ARCHITECTURE.md)
- [Fonctionnalités Clés](docs/FEATURES.md)
- [Schéma de Base de Données](docs/DATABASE.md)
- [Parcours Utilisateur](docs/USER_JOURNEY.md)
- [Stratégies de Monétisation](docs/MONETIZATION.md)

## 🚀 Démarrage Rapide

### Installation Automatique (Windows)

**La méthode la plus simple :**

1. Double-cliquez sur `install.bat`
2. Suivez les instructions à l'écran
3. L'application sera prête à l'emploi !

📖 **[Guide d'installation complet](INSTALLATION.md)**

### Installation Manuelle

#### Prérequis

- Node.js 18+
- PostgreSQL 14+
- npm ou yarn

#### Étapes

```bash
# Cloner le repository
git clone <repository-url>

# Installer avec le script automatique (Windows)
install.bat

# OU Installation manuelle :

# 1. Aller dans le dossier de l'application
cd superprof-app

# 2. Installer les dépendances
npm install

# 3. Configurer les variables d'environnement
cp .env.example .env
# Puis modifier .env avec vos configurations

# 4. Générer le client Prisma
npx prisma generate

# 5. Initialiser la base de données
npx prisma db push

# 6. Démarrer le serveur de développement
npm run dev
```

### Démarrage de l'application

**Windows :**
```bash
start.bat
```

**Linux/Mac :**
```bash
./start.sh
```

**Manuellement :**
```bash
cd superprof-app && npm run dev
```

L'application sera disponible sur http://localhost:3000

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
