#!/bin/bash

echo "========================================"
echo "   SUPERPROF - Démarrage Application"
echo "========================================"
echo ""

cd superprof-app

echo "[1/4] Installation des dépendances..."
npm install
if [ $? -ne 0 ]; then
    echo "Erreur lors de l'installation des dépendances"
    exit 1
fi

echo ""
echo "[2/4] Génération du client Prisma..."
npx prisma generate
if [ $? -ne 0 ]; then
    echo "Erreur lors de la génération Prisma"
    exit 1
fi

echo ""
echo "[3/4] Migration de la base de données..."
npx prisma db push
if [ $? -ne 0 ]; then
    echo "Erreur lors de la migration"
    exit 1
fi

echo ""
echo "[4/4] Démarrage du serveur de développement..."
echo ""
echo "========================================"
echo "   Application disponible sur:"
echo "   http://localhost:3000"
echo "========================================"
echo ""

npm run dev
