# Guide d'Installation SUPERPROF

## 🚀 Installation Automatique (Windows)

### Méthode Rapide

1. **Téléchargez le projet** ou clonez-le avec Git
2. **Double-cliquez sur `install.bat`**
3. **Suivez les instructions à l'écran**

Le script va automatiquement :
- ✅ Vérifier que Node.js est installé (version 18+)
- ✅ Vérifier que npm est installé
- ✅ Configurer SQLite comme base de données (aucune installation requise !)
- ✅ Créer le fichier de configuration `.env`
- ✅ Installer toutes les dépendances npm
- ✅ Générer le client Prisma
- ✅ Créer et initialiser la base de données SQLite automatiquement

### Prérequis

Avant de lancer `install.bat`, vous avez besoin de :

#### 1. Node.js (version 18 ou supérieure) - **OBLIGATOIRE**
- **Téléchargement** : https://nodejs.org/
- **Installation** : Téléchargez et installez la version LTS
- **Vérification** : Ouvrez un terminal et tapez `node --version`

#### 2. Git (optionnel, pour cloner le projet)
- **Téléchargement** : https://git-scm.com/download/win

**C'est tout !** SQLite est inclus et ne nécessite aucune installation.

### Base de Données : SQLite vs PostgreSQL

#### SQLite (Par défaut - Recommandé pour débuter)
- ✅ **Aucune installation requise**
- ✅ **Configuration automatique**
- ✅ **Parfait pour le développement local**
- ✅ **Fichier unique : `dev.db`**
- ✅ **Prêt en quelques secondes**

#### PostgreSQL (Optionnel - Pour la production)
- 📦 Nécessite une installation séparée
- ⚙️ Configuration manuelle requise
- 🚀 Recommandé pour le déploiement en production
- **Téléchargement** : https://www.postgresql.org/download/windows/
- **Alternative Docker** :
  ```bash
  docker run -d -p 5432:5432 -e POSTGRES_PASSWORD=postgres postgres:14
  ```

## 📝 Configuration

### Configuration Automatique avec SQLite

**Bonne nouvelle !** Avec SQLite, aucune configuration manuelle n'est nécessaire.

Le fichier `.env` est créé automatiquement avec :
```env
DATABASE_URL="file:./dev.db"
```

La base de données `dev.db` sera créée automatiquement au premier démarrage.

### Configuration Optionnelle

#### Générer une clé NEXTAUTH_SECRET sécurisée (Recommandé)

Après l'exécution de `install.bat`, vous pouvez améliorer la sécurité en ouvrant `superprof-app/.env` et en modifiant :

```env
# Générez une clé secrète aléatoire (32+ caractères)
NEXTAUTH_SECRET="votre-cle-secrete-aleatoire-ici"
```

#### Passer à PostgreSQL (Pour la production)

Si vous souhaitez utiliser PostgreSQL au lieu de SQLite :

1. **Installez PostgreSQL** :
   - Téléchargez depuis https://www.postgresql.org/download/windows/
   - Notez le mot de passe défini lors de l'installation

2. **Créez une base de données** :
   ```sql
   CREATE DATABASE superprof_db;
   ```

3. **Modifiez le fichier `.env`** :
   ```env
   # Commentez SQLite
   # DATABASE_URL="file:./dev.db"

   # Décommentez et configurez PostgreSQL
   DATABASE_URL="postgresql://postgres:votre_mot_de_passe@localhost:5432/superprof_db?schema=public"
   ```

4. **Réinitialisez la base de données** :
   ```bash
   cd superprof-app
   npx prisma db push
   ```

#### Méthodes pour générer une clé NEXTAUTH_SECRET

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

### Message : "PostgreSQL non détecté (optionnel)"
- **C'est normal !** SQLite est utilisé par défaut
- PostgreSQL n'est nécessaire que pour la production
- Vous pouvez continuer sans problème

### Erreur de connexion à la base de données
- Vérifiez que le fichier `.env` existe dans `superprof-app/`
- Vérifiez que `DATABASE_URL="file:./dev.db"` est présent dans `.env`
- Si vous utilisez PostgreSQL :
  - Vérifiez que PostgreSQL est en cours d'exécution
  - Ouvrez pgAdmin ou exécutez `psql -U postgres` pour tester la connexion
  - Vérifiez que le `DATABASE_URL` dans `.env` est correct
  - Assurez-vous que la base de données existe

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
2. **Base de données SQLite** :
   - Le fichier `dev.db` contient toutes vos données
   - Sauvegardez-le régulièrement (c'est juste un fichier)
   - Copiez `dev.db` pour créer des sauvegardes instantanées
3. **Sécurité** : Ne partagez JAMAIS votre fichier `.env`
4. **Production** :
   - Passez à PostgreSQL pour la production
   - Utilisez des variables d'environnement sécurisées
   - Générez une nouvelle clé `NEXTAUTH_SECRET`

## ❓ Besoin d'aide ?

Si vous rencontrez des problèmes :
1. Consultez la section "Résolution de Problèmes" ci-dessus
2. Vérifiez les logs d'erreur dans la console
3. Consultez la documentation du projet dans `/docs`

Bon développement ! 🚀
