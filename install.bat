@echo off
chcp 65001 >nul
cls
echo ========================================
echo    SUPERPROF - Installation Automatique
echo ========================================
echo.
echo Ce script va installer et configurer SUPERPROF sur votre PC.
echo.
pause

:: Vérification des privilèges administrateur
net session >nul 2>&1
if %errorlevel% neq 0 (
    echo.
    echo [ATTENTION] Certaines installations peuvent nécessiter des droits administrateur.
    echo Si l'installation échoue, réexécutez ce script en tant qu'administrateur.
    echo.
    pause
)

:: Étape 1 : Vérification de Node.js
echo.
echo ========================================
echo [1/6] Vérification de Node.js...
echo ========================================
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo.
    echo [ERREUR] Node.js n'est pas installé !
    echo.
    echo Veuillez installer Node.js 18 ou supérieur depuis :
    echo https://nodejs.org/
    echo.
    echo Après l'installation, réexécutez ce script.
    pause
    exit /b 1
) else (
    node --version
    echo [OK] Node.js est installé
)

:: Vérification de la version de Node.js
for /f "tokens=1,2,3 delims=.v" %%a in ('node --version') do (
    set NODE_MAJOR=%%a
)
if %NODE_MAJOR% LSS 18 (
    echo.
    echo [ATTENTION] Votre version de Node.js est trop ancienne.
    echo Version minimale requise : 18.x
    echo Version actuelle :
    node --version
    echo.
    echo Veuillez mettre à jour Node.js depuis : https://nodejs.org/
    pause
    exit /b 1
)

:: Étape 2 : Vérification de npm
echo.
echo ========================================
echo [2/6] Vérification de npm...
echo ========================================
npm --version >nul 2>&1
if %errorlevel% neq 0 (
    echo [ERREUR] npm n'est pas installé !
    pause
    exit /b 1
) else (
    npm --version
    echo [OK] npm est installé
)

:: Étape 3 : Information sur la base de données
echo.
echo ========================================
echo [3/6] Configuration de la base de données...
echo ========================================
echo.
echo [INFO] SQLite sera utilisé par défaut pour le développement local
echo        - Aucune installation requise
echo        - Fichier de base de données : dev.db
echo        - Parfait pour débuter et tester l'application
echo.
psql --version >nul 2>&1
if %errorlevel% neq 0 (
    echo [INFO] PostgreSQL non détecté (optionnel)
    echo        Pour la production, vous pourrez passer à PostgreSQL plus tard.
    echo.
) else (
    psql --version
    echo [OK] PostgreSQL est également disponible pour la production
    echo.
)

:: Étape 4 : Configuration du fichier .env
echo.
echo ========================================
echo [4/6] Configuration de l'environnement...
echo ========================================
cd /d "%~dp0\superprof-app"

if not exist ".env" (
    if exist ".env.example" (
        echo Copie de .env.example vers .env...
        copy .env.example .env
        echo.
        echo [IMPORTANT] Le fichier .env a été créé avec SQLite par défaut.
        echo.
        echo Configuration actuelle :
        echo - Base de données : SQLite (dev.db) - Prêt à l'emploi !
        echo.
        echo Configurations optionnelles à modifier :
        echo 1. NEXTAUTH_SECRET : Générez une clé secrète unique (recommandé)
        echo 2. STRIPE_SECRET_KEY : Vos clés Stripe (optionnel)
        echo 3. DATABASE_URL : Changez pour PostgreSQL en production (optionnel)
        echo.
        echo Voulez-vous modifier le fichier .env maintenant ? (O/N)
        choice /C ON /N /M "Tapez O pour ouvrir ou N pour continuer : "
        if errorlevel 1 if not errorlevel 2 (
            notepad .env
        )
    ) else (
        echo [ATTENTION] Fichier .env.example non trouvé !
        echo Vous devrez créer manuellement le fichier .env
    )
) else (
    echo [OK] Le fichier .env existe déjà
)

:: Étape 5 : Installation des dépendances
echo.
echo ========================================
echo [5/6] Installation des dépendances npm...
echo ========================================
echo Cette étape peut prendre plusieurs minutes...
echo.

call npm install
if %errorlevel% neq 0 (
    echo.
    echo [ERREUR] L'installation des dépendances a échoué !
    echo.
    echo Essayez ces solutions :
    echo 1. Supprimez le dossier node_modules et réessayez
    echo 2. Exécutez : npm cache clean --force
    echo 3. Vérifiez votre connexion Internet
    pause
    exit /b %errorlevel%
)

echo.
echo [OK] Dépendances installées avec succès

:: Étape 6 : Configuration de Prisma
echo.
echo ========================================
echo [6/6] Configuration de Prisma...
echo ========================================

:: Génération du client Prisma
echo Génération du client Prisma...
call npx prisma generate
if %errorlevel% neq 0 (
    echo.
    echo [ATTENTION] Erreur lors de la génération Prisma
    echo Vous pourrez le faire manuellement avec : npx prisma generate
    echo.
)

:: Initialisation de la base de données SQLite
echo.
echo Initialisation de la base de données SQLite...
echo (Création automatique du fichier dev.db)
echo.
call npx prisma db push
if %errorlevel% neq 0 (
    echo.
    echo [ATTENTION] L'initialisation de la base de données a échoué
    echo.
    echo Vérifiez que :
    echo 1. Le fichier .env existe et contient DATABASE_URL
    echo 2. Le schema Prisma est valide
    echo.
    echo Vous pourrez réessayer manuellement avec :
    echo cd superprof-app ^&^& npx prisma db push
    echo.
) else (
    echo [OK] Base de données SQLite créée et initialisée !
    echo     Fichier : superprof-app/dev.db
)

:: Retour au répertoire racine
cd /d "%~dp0"

:: Installation terminée
echo.
echo ========================================
echo    Installation Terminée !
echo ========================================
echo.
echo Votre application est prête !
echo.
echo Base de données : SQLite (dev.db)
echo - Aucune configuration supplémentaire nécessaire
echo - Parfait pour le développement local
echo.
echo Prochaines étapes :
echo.
echo 1. Pour démarrer l'application :
echo    - Double-cliquez sur start.bat
echo    ou
echo    - cd superprof-app ^&^& npm run dev
echo.
echo 2. L'application sera accessible sur : http://localhost:3000
echo.
echo 3. (Optionnel) Modifiez superprof-app\.env pour :
echo    - Générer une clé NEXTAUTH_SECRET sécurisée
echo    - Ajouter vos clés Stripe
echo    - Passer à PostgreSQL en production
echo.
echo ========================================
echo.

echo Voulez-vous démarrer l'application maintenant ? (O/N)
choice /C ON /N /M "Tapez O pour démarrer ou N pour quitter : "
if errorlevel 1 if not errorlevel 2 (
    echo.
    echo Démarrage de l'application...
    call start.bat
) else (
    echo.
    echo Installation terminée. Utilisez start.bat pour lancer l'application.
    pause
)
