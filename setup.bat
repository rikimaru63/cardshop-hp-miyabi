@echo off
echo 🚀 カードショップHP - 開発環境セットアップ
echo ==========================================

REM Check if Docker is running
docker info >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Docker is not running. Please start Docker Desktop and try again.
    exit /b 1
)

echo ✅ Docker is running

REM Start database containers
echo 📦 Starting database containers...
docker-compose up -d

REM Wait for PostgreSQL to be ready
echo ⏳ Waiting for PostgreSQL to be ready...
timeout /t 5 /nobreak >nul

REM Navigate to card-shop-international
cd card-shop-international

REM Install dependencies
echo 📦 Installing npm dependencies...
call npm install

REM Setup Prisma
echo 🗄️ Setting up database schema...
call npx prisma generate
call npx prisma db push

REM Seed database
echo 🌱 Seeding database...
call npm run prisma:seed

REM Run tests
echo 🧪 Running tests...
call npm run test || echo ⚠️ Some tests failed, but continuing...

echo.
echo ✅ Setup complete!
echo.
echo To start the development server:
echo   cd card-shop-international
echo   npm run dev
echo.
echo 📝 Available URLs:
echo   - Application: http://localhost:3000
echo   - Admin Panel: http://localhost:3000/admin
echo   - Database: postgresql://postgres:password@localhost:5432/cardshop
echo.
echo 🤖 Miyabi Agent Status:
echo   - GitHub: https://github.com/rikimaru63/cardshop-hp-miyabi
echo   - Actions: https://github.com/rikimaru63/cardshop-hp-miyabi/actions

pause