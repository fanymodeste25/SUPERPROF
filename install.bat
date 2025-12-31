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

:: Étape 3 : Vérification de PostgreSQL
echo.
echo ========================================
echo [3/6] Vérification de PostgreSQL...
echo ========================================
psql --version >nul 2>&1
if %errorlevel% neq 0 (
    echo.
    echo [ATTENTION] PostgreSQL n'est pas détecté !
    echo.
    echo Pour utiliser SUPERPROF, vous devez installer PostgreSQL 14 ou supérieur.
    echo.
    echo Options :
    echo 1. Installer PostgreSQL depuis : https://www.postgresql.org/download/windows/
    echo 2. Utiliser Docker : docker run -d -p 5432:5432 -e POSTGRES_PASSWORD=postgres postgres:14
    echo.
    echo Voulez-vous continuer sans PostgreSQL ? (O/N)
    choice /C ON /N /M "Tapez O pour continuer ou N pour quitter : "
    if errorlevel 2 (
        echo Installation annulée.
        pause
        exit /b 1
    )
    echo.
    echo [ATTENTION] Vous devrez configurer PostgreSQL manuellement plus tard.
) else (
    psql --version
    echo [OK] PostgreSQL est installé
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
        echo [IMPORTANT] Le fichier .env a été créé.
        echo Vous devez le modifier avec vos propres configurations :
        echo.
        echo 1. DATABASE_URL : Votre connexion PostgreSQL
        echo 2. NEXTAUTH_SECRET : Générez une clé secrète unique
        echo 3. STRIPE_SECRET_KEY : Vos clés Stripe (si vous utilisez les paiements)
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

:: Migration de la base de données (optionnel)
echo.
echo Voulez-vous initialiser la base de données maintenant ? (O/N)
echo (Assurez-vous que PostgreSQL est en cours d'exécution et configuré dans .env)
choice /C ON /N /M "Tapez O pour initialiser ou N pour passer : "
if errorlevel 1 if not errorlevel 2 (
    echo.
    echo Migration de la base de données...
    call npx prisma db push
    if %errorlevel% neq 0 (
        echo.
        echo [ATTENTION] La migration de la base de données a échoué
        echo Vérifiez que :
        echo 1. PostgreSQL est en cours d'exécution
        echo 2. La DATABASE_URL dans .env est correcte
        echo 3. La base de données existe
        echo.
        echo Vous pourrez le faire manuellement avec : npx prisma db push
    ) else (
        echo [OK] Base de données initialisée
    )
)

:: Retour au répertoire racine
cd /d "%~dp0"

:: Installation terminée
echo.
echo ========================================
echo    Installation Terminée !
echo ========================================
echo.
echo Prochaines étapes :
echo.
echo 1. Vérifiez et modifiez le fichier .env avec vos configurations :
echo    - superprof-app\.env
echo.
echo 2. Si vous n'avez pas encore configuré PostgreSQL :
echo    - Installez PostgreSQL
echo    - Créez une base de données "superprof_db"
echo    - Mettez à jour DATABASE_URL dans .env
echo    - Exécutez : cd superprof-app ^&^& npx prisma db push
echo.
echo 3. Pour démarrer l'application, utilisez :
echo    - start.bat (pour Windows)
echo    ou
echo    - cd superprof-app ^&^& npm run dev
echo.
echo 4. L'application sera accessible sur : http://localhost:3000
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
