# 🚀 Guide d'Installation Complet - SUPERPROF
## Pour PC sans aucun logiciel installé

Ce guide vous accompagne étape par étape pour installer **SUPERPROF** sur un ordinateur vierge (Windows, macOS ou Linux).

---

## 📋 Table des Matières

1. [Installation de Git](#1-installation-de-git)
2. [Installation de Node.js](#2-installation-de-nodejs)
3. [Installation de PostgreSQL](#3-installation-de-postgresql)
4. [Installation du Projet SUPERPROF](#4-installation-du-projet-superprof)
5. [Configuration de la Base de Données](#5-configuration-de-la-base-de-données)
6. [Lancement de l'Application](#6-lancement-de-lapplication)
7. [Vérification de l'Installation](#7-vérification-de-linstallation)
8. [Résolution des Problèmes](#8-résolution-des-problèmes)

---

## 1. Installation de Git

Git est nécessaire pour télécharger le code du projet.

### 🪟 Windows

1. Téléchargez Git depuis : https://git-scm.com/download/win
2. Lancez l'installateur téléchargé (`Git-2.x.x-64-bit.exe`)
3. Suivez l'assistant d'installation :
   - **Éditeur** : Choisissez votre éditeur préféré (Notepad++ ou VS Code recommandé)
   - **PATH** : Sélectionnez "Git from the command line and also from 3rd-party software"
   - **SSH** : Utilisez l'option par défaut
   - **Line endings** : "Checkout Windows-style, commit Unix-style"
   - Laissez les autres options par défaut
4. Cliquez sur "Install" puis "Finish"

**Vérification :**
```bash
# Ouvrez "Invite de commandes" (cmd) ou "PowerShell" et tapez :
git --version
```
Vous devriez voir : `git version 2.x.x`

### 🍎 macOS

1. Ouvrez le **Terminal** (Applications > Utilitaires > Terminal)
2. Tapez :
   ```bash
   git --version
   ```
3. Si Git n'est pas installé, macOS vous proposera de l'installer automatiquement
4. Suivez les instructions à l'écran

**Alternative (avec Homebrew) :**
```bash
# Installer Homebrew si nécessaire
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

# Installer Git
brew install git
```

### 🐧 Linux (Ubuntu/Debian)

```bash
# Mettre à jour les paquets
sudo apt update

# Installer Git
sudo apt install git -y

# Vérifier l'installation
git --version
```

---

## 2. Installation de Node.js

Node.js est le moteur JavaScript nécessaire pour exécuter l'application.

### 🪟 Windows

1. Allez sur : https://nodejs.org/
2. Téléchargez la version **LTS** (Long Term Support) - version 18.x ou supérieure recommandée
3. Lancez l'installateur (`node-v18.x.x-x64.msi`)
4. Suivez l'assistant d'installation :
   - Acceptez la licence
   - Choisissez le dossier d'installation (par défaut : `C:\Program Files\nodejs`)
   - **Important** : Cochez "Automatically install the necessary tools" pour installer les outils de compilation
   - Cliquez sur "Next" puis "Install"
5. Redémarrez votre ordinateur après l'installation

**Vérification :**
```bash
# Ouvrez une nouvelle fenêtre "Invite de commandes" et tapez :
node --version
npm --version
```
Vous devriez voir :
```
v18.x.x
9.x.x
```

### 🍎 macOS

**Méthode 1 : Installateur officiel**
1. Allez sur : https://nodejs.org/
2. Téléchargez la version **LTS** (18.x ou supérieure)
3. Ouvrez le fichier `.pkg` téléchargé
4. Suivez l'assistant d'installation

**Méthode 2 : Avec Homebrew (recommandé)**
```bash
# Installer Node.js
brew install node@18

# Vérifier l'installation
node --version
npm --version
```

### 🐧 Linux (Ubuntu/Debian)

```bash
# Installer Node.js 18.x via NodeSource
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Vérifier l'installation
node --version
npm --version
```

---

## 3. Installation de PostgreSQL

PostgreSQL est la base de données utilisée par SUPERPROF.

### 🪟 Windows

1. Téléchargez PostgreSQL depuis : https://www.postgresql.org/download/windows/
2. Cliquez sur "Download the installer" (EnterpriseDB)
3. Téléchargez la version **14** ou supérieure pour Windows x86-64
4. Lancez l'installateur (`postgresql-14.x-windows-x64.exe`)
5. Suivez l'assistant d'installation :
   - Choisissez le dossier d'installation (par défaut recommandé)
   - Sélectionnez tous les composants (PostgreSQL Server, pgAdmin 4, Command Line Tools)
   - Choisissez le dossier des données (par défaut recommandé)
   - **IMPORTANT** : Définissez un mot de passe pour l'utilisateur `postgres` (notez-le bien !)
   - Port : Laissez **5432** (par défaut)
   - Locale : Français ou Default locale
6. Cliquez sur "Next" puis "Finish"

**Vérification :**
```bash
# Ouvrez "SQL Shell (psql)" depuis le menu Démarrer
# Appuyez sur Entrée pour les valeurs par défaut
# Entrez le mot de passe défini lors de l'installation
```

### 🍎 macOS

**Méthode 1 : Avec Postgres.app (Recommandé pour débutants)**
1. Téléchargez depuis : https://postgresapp.com/
2. Déplacez l'application dans le dossier Applications
3. Lancez Postgres.app
4. Cliquez sur "Initialize" pour créer une nouvelle base de données

**Méthode 2 : Avec Homebrew**
```bash
# Installer PostgreSQL
brew install postgresql@14

# Démarrer PostgreSQL
brew services start postgresql@14

# Créer un utilisateur
createuser -s postgres
```

### 🐧 Linux (Ubuntu/Debian)

```bash
# Installer PostgreSQL
sudo apt update
sudo apt install postgresql postgresql-contrib -y

# Démarrer le service
sudo systemctl start postgresql
sudo systemctl enable postgresql

# Créer un mot de passe pour l'utilisateur postgres
sudo -u postgres psql -c "ALTER USER postgres PASSWORD 'votre_mot_de_passe';"
```

---

## 4. Installation du Projet SUPERPROF

### Télécharger le Projet

```bash
# Ouvrez un terminal (cmd, PowerShell, Terminal, etc.)
# Naviguez vers le dossier où vous voulez installer le projet
cd C:\Users\VotreNom\Documents  # Windows
cd ~/Documents                   # macOS/Linux

# Clonez le projet (remplacez <repository-url> par l'URL réelle)
git clone <repository-url>

# Entrez dans le dossier du projet
cd SUPERPROF
```

### Installer les Dépendances

```bash
# Installer toutes les dépendances Node.js
npm install
```

**Note :** Cette étape peut prendre plusieurs minutes selon votre connexion Internet.

---

## 5. Configuration de la Base de Données

### Créer la Base de Données

**Windows (via pgAdmin 4) :**
1. Ouvrez **pgAdmin 4** depuis le menu Démarrer
2. Entrez le mot de passe principal (défini lors de l'installation)
3. Faites un clic droit sur "Databases" > "Create" > "Database"
4. Nom de la base : `superprof`
5. Cliquez sur "Save"

**macOS/Linux (via Terminal) :**
```bash
# Se connecter à PostgreSQL
psql -U postgres

# Créer la base de données
CREATE DATABASE superprof;

# Quitter psql
\q
```

### Configurer les Variables d'Environnement

```bash
# Créer le fichier .env à partir de l'exemple
cp .env.example .env
```

**Éditez le fichier `.env` avec un éditeur de texte :**

```env
# Base de données
DATABASE_URL="postgresql://postgres:votre_mot_de_passe@localhost:5432/superprof"

# NextAuth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="générez_une_clé_secrète_aléatoire"

# Stripe (optionnel pour le développement)
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=""
STRIPE_SECRET_KEY=""

# Autres configurations
NODE_ENV="development"
```

**Pour générer une clé secrète NEXTAUTH_SECRET :**
```bash
# Exécutez cette commande et copiez le résultat dans .env
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

### Exécuter les Migrations

```bash
# Créer les tables dans la base de données
npm run migrate

# Si cette commande n'existe pas, utilisez :
npx prisma migrate dev
npx prisma generate
```

---

## 6. Lancement de l'Application

### Démarrer le Serveur de Développement

```bash
npm run dev
```

Vous devriez voir un message similaire à :
```
> superprof@0.1.0 dev
> next dev

   ▲ Next.js 14.x.x
   - Local:        http://localhost:3000
   - Network:      http://192.168.x.x:3000

 ✓ Ready in 2.5s
```

### Accéder à l'Application

Ouvrez votre navigateur et allez sur :
```
http://localhost:3000
```

---

## 7. Vérification de l'Installation

### Checklist de Vérification

- [ ] Git installé : `git --version` affiche une version
- [ ] Node.js installé : `node --version` affiche v18.x.x ou supérieur
- [ ] npm installé : `npm --version` affiche une version
- [ ] PostgreSQL installé et démarré
- [ ] Base de données `superprof` créée
- [ ] Fichier `.env` configuré correctement
- [ ] Dépendances installées : dossier `node_modules` présent
- [ ] Migrations exécutées sans erreur
- [ ] Serveur démarre sur http://localhost:3000

### Test de Base

1. Allez sur http://localhost:3000
2. La page d'accueil SUPERPROF devrait s'afficher
3. Essayez de créer un compte ou de vous connecter

---

## 8. Résolution des Problèmes

### Problème : "node: command not found" ou "npm: command not found"

**Solution :**
- Redémarrez votre terminal/invite de commandes
- Redémarrez votre ordinateur
- Vérifiez que Node.js est bien installé dans les variables d'environnement PATH

**Windows :**
1. Recherchez "Variables d'environnement" dans le menu Démarrer
2. Vérifiez que `C:\Program Files\nodejs` est dans la variable PATH
3. Redémarrez l'invite de commandes

### Problème : Erreur de connexion à PostgreSQL

**Solution :**
1. Vérifiez que PostgreSQL est démarré :
   - **Windows** : Services > PostgreSQL Database Server
   - **macOS** : Postgres.app doit être lancé
   - **Linux** : `sudo systemctl status postgresql`

2. Vérifiez le mot de passe dans le fichier `.env`
3. Vérifiez le port (5432 par défaut)

### Problème : "Port 3000 already in use"

**Solution :**
```bash
# Arrêtez le processus utilisant le port 3000
# Windows
netstat -ano | findstr :3000
taskkill /PID <numéro_du_processus> /F

# macOS/Linux
lsof -ti:3000 | xargs kill -9

# Ou changez le port dans package.json
npm run dev -- -p 3001
```

### Problème : Erreurs lors de `npm install`

**Solution :**
```bash
# Nettoyer le cache npm
npm cache clean --force

# Supprimer node_modules et package-lock.json
rm -rf node_modules package-lock.json  # macOS/Linux
rmdir /s node_modules & del package-lock.json  # Windows

# Réinstaller
npm install
```

### Problème : Migrations échouent

**Solution :**
```bash
# Réinitialiser la base de données
npx prisma migrate reset

# Re-exécuter les migrations
npx prisma migrate dev
npx prisma generate
```

### Besoin d'Aide Supplémentaire ?

- Consultez la documentation complète : [README.md](../README.md)
- Vérifiez les logs d'erreur dans votre terminal
- Assurez-vous que tous les prérequis sont installés dans les bonnes versions

---

## 🎉 Félicitations !

Vous avez maintenant installé SUPERPROF sur votre PC. Vous pouvez commencer à développer et à explorer l'application.

### Prochaines Étapes

1. Consultez la [documentation des fonctionnalités](FEATURES.md)
2. Explorez l'[architecture technique](ARCHITECTURE.md)
3. Comprenez le [parcours utilisateur](USER_JOURNEY.md)
4. Créez votre premier compte professeur ou élève

**Bon développement ! 🚀**
