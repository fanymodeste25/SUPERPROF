@echo off
echo ========================================
echo    SUPERPROF - Demarrage Application
echo ========================================
echo.

cd superprof-app

echo [1/4] Installation des dependances...
call npm install
if %errorlevel% neq 0 (
    echo Erreur lors de l'installation des dependances
    pause
    exit /b %errorlevel%
)

echo.
echo [2/4] Generation du client Prisma...
call npx prisma generate
if %errorlevel% neq 0 (
    echo Erreur lors de la generation Prisma
    pause
    exit /b %errorlevel%
)

echo.
echo [3/4] Migration de la base de donnees...
call npx prisma db push
if %errorlevel% neq 0 (
    echo Erreur lors de la migration
    pause
    exit /b %errorlevel%
)

echo.
echo [4/4] Demarrage du serveur de developpement...
echo.
echo ========================================
echo   Application disponible sur:
echo   http://localhost:3000
echo ========================================
echo.

call npm run dev
