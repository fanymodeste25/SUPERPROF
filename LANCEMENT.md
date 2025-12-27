# 🚀 Scripts de Lancement SUPERPROF

Ce dossier contient des scripts pour faciliter le lancement de l'application SUPERPROF.

## Scripts Disponibles

### Windows
```bash
start.bat
```

### Linux / Mac
```bash
./start.sh
```

## Ce que font les scripts

Les scripts exécutent automatiquement les étapes suivantes :

1. **Installation des dépendances** : `npm install`
2. **Génération du client Prisma** : `npx prisma generate`
3. **Migration de la base de données** : `npx prisma db push`
4. **Démarrage du serveur** : `npm run dev`

## Utilisation

### Sur Windows
Double-cliquez sur `start.bat` ou exécutez dans le terminal :
```cmd
start.bat
```

### Sur Linux/Mac
Exécutez dans le terminal :
```bash
./start.sh
```

## Accès à l'application

Une fois le serveur démarré, l'application est accessible sur :
```
http://localhost:3000
```

## Arrêter le serveur

Appuyez sur `Ctrl + C` dans le terminal pour arrêter le serveur de développement.

## Prérequis

- Node.js 18+ installé
- npm ou yarn installé
- Fichier `.env` configuré dans le dossier `superprof-app`

## En cas d'erreur

Si vous rencontrez des erreurs :

1. Vérifiez que vous êtes dans le bon répertoire
2. Supprimez `node_modules` et `package-lock.json` puis relancez
3. Vérifiez que votre fichier `.env` est correctement configuré
4. Consultez `README-DEV.md` dans le dossier `superprof-app` pour plus de détails
