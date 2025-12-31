# Guide d'Installation SUPERPROF

## 🚀 Installation Automatique (Windows)

### Méthode Rapide

1. **Téléchargez le projet** ou clonez-le avec Git
2. **Double-cliquez sur `install.bat`**
3. **Suivez les instructions à l'écran**

Le script va automatiquement :
- ✅ Vérifier que Node.js est installé (version 18+)
- ✅ Vérifier que npm est installé
- ✅ Vérifier que PostgreSQL est installé
- ✅ Créer le fichier de configuration `.env`
- ✅ Installer toutes les dépendances npm
- ✅ Générer le client Prisma
- ✅ Initialiser la base de données (optionnel)

### Prérequis

Avant de lancer `install.bat`, assurez-vous d'avoir :

#### 1. Node.js (version 18 ou supérieure)
- **Téléchargement** : https://nodejs.org/
- **Installation** : Téléchargez et installez la version LTS
- **Vérification** : Ouvrez un terminal et tapez `node --version`

#### 2. PostgreSQL (version 14 ou supérieure)
- **Téléchargement** : https://www.postgresql.org/download/windows/
- **Installation** :
  - Téléchargez l'installateur Windows
  - Notez bien le mot de passe que vous définissez pour l'utilisateur `postgres`
  - Le port par défaut est `5432`
- **Alternative Docker** :
  ```bash
  docker run -d -p 5432:5432 -e POSTGRES_PASSWORD=postgres postgres:14
  ```

#### 3. Git (optionnel, pour cloner le projet)
- **Téléchargement** : https://git-scm.com/download/win

## 📝 Configuration Manuelle

### Étape 1 : Configuration de PostgreSQL

1. **Créez une base de données** :
   ```sql
   CREATE DATABASE superprof_db;
   ```

2. **Notez vos informations de connexion** :
   - Utilisateur : `postgres` (par défaut)
   - Mot de passe : celui que vous avez défini lors de l'installation
   - Host : `localhost`
   - Port : `5432`
   - Base de données : `superprof_db`

### Étape 2 : Configuration du fichier .env

Après l'exécution de `install.bat`, ouvrez le fichier `superprof-app/.env` et modifiez :

```env
# Remplacez username, password par vos vraies informations
DATABASE_URL="postgresql://postgres:votre_mot_de_passe@localhost:5432/superprof_db?schema=public"

# Générez une clé secrète aléatoire (32+ caractères)
NEXTAUTH_SECRET="changez-cette-cle-secrete-par-une-vraie-cle-aleatoire"

# Clés Stripe (optionnel pour le moment, utilisez les clés de test)
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="pk_test_..."
STRIPE_SECRET_KEY="sk_test_..."
```

### Étape 3 : Génération d'une clé secrète

Pour générer une clé `NEXTAUTH_SECRET` sécurisée, utilisez l'une de ces méthodes :

**Option 1 : En ligne**
- Allez sur https://generate-secret.vercel.app/32

**Option 2 : Avec Node.js**
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
```

**Option 3 : PowerShell**
```powershell
[Convert]::ToBase64String((1..32 | ForEach-Object { Get-Random -Minimum 0 -Maximum 256 }))
```

## 🎯 Démarrage de l'Application

### Après l'installation

1. **Démarrez l'application** avec `start.bat`
2. **Ouvrez votre navigateur** sur http://localhost:3000
3. **Profitez de SUPERPROF !**

### Commandes utiles

```bash
# Démarrer l'application en mode développement
cd superprof-app
npm run dev

# Construire pour la production
npm run build

# Démarrer en production
npm start

# Réinitialiser la base de données
npx prisma db push

# Voir les données dans Prisma Studio
npx prisma studio
```

## 🔧 Résolution de Problèmes

### Erreur : "Node.js n'est pas installé"
- Installez Node.js depuis https://nodejs.org/
- Redémarrez votre terminal/invite de commande
- Réexécutez `install.bat`

### Erreur : "PostgreSQL n'est pas détecté"
- Installez PostgreSQL depuis https://www.postgresql.org/download/windows/
- Ajoutez PostgreSQL au PATH système
- Ou utilisez Docker : `docker run -d -p 5432:5432 -e POSTGRES_PASSWORD=postgres postgres:14`

### Erreur de connexion à la base de données
- Vérifiez que PostgreSQL est en cours d'exécution
- Ouvrez pgAdmin ou exécutez `psql -U postgres` pour tester la connexion
- Vérifiez que le `DATABASE_URL` dans `.env` est correct
- Assurez-vous que la base de données `superprof_db` existe

### Erreur lors de l'installation des dépendances npm
```bash
# Nettoyez le cache npm
npm cache clean --force

# Supprimez node_modules et réinstallez
cd superprof-app
rmdir /s /q node_modules
npm install
```

### Erreur Prisma
```bash
# Régénérez le client Prisma
cd superprof-app
npx prisma generate

# Réinitialisez la base de données
npx prisma db push --force-reset
```

## 🌐 Installation sur Linux/Mac

Pour Linux et Mac, utilisez le script `start.sh` :

```bash
# Rendez le script exécutable
chmod +x start.sh

# Exécutez le script
./start.sh
```

## 📚 Ressources Supplémentaires

- [Documentation Next.js](https://nextjs.org/docs)
- [Documentation Prisma](https://www.prisma.io/docs)
- [Documentation PostgreSQL](https://www.postgresql.org/docs/)
- [Documentation Stripe](https://stripe.com/docs)

## 💡 Conseils

1. **Développement** : Utilisez toujours `npm run dev` pour le développement
2. **Base de données** : Sauvegardez régulièrement votre base de données
3. **Sécurité** : Ne partagez JAMAIS votre fichier `.env`
4. **Production** : Utilisez des variables d'environnement réelles en production

## ❓ Besoin d'aide ?

Si vous rencontrez des problèmes :
1. Consultez la section "Résolution de Problèmes" ci-dessus
2. Vérifiez les logs d'erreur dans la console
3. Consultez la documentation du projet dans `/docs`

Bon développement ! 🚀
