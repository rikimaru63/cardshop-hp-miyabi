#!/bin/bash

echo "🚀 カードショップHP - 開発環境セットアップ"
echo "=========================================="

# Check if Docker is running
if ! docker info > /dev/null 2>&1; then
    echo "❌ Docker is not running. Please start Docker Desktop and try again."
    exit 1
fi

echo "✅ Docker is running"

# Start database containers
echo "📦 Starting database containers..."
docker-compose up -d

# Wait for PostgreSQL to be ready
echo "⏳ Waiting for PostgreSQL to be ready..."
sleep 5

# Navigate to card-shop-international
cd card-shop-international

# Install dependencies
echo "📦 Installing npm dependencies..."
npm install

# Setup Prisma
echo "🗄️ Setting up database schema..."
npx prisma generate
npx prisma db push

# Seed database
echo "🌱 Seeding database..."
npm run prisma:seed

# Run tests
echo "🧪 Running tests..."
npm run test || echo "⚠️ Some tests failed, but continuing..."

echo ""
echo "✅ Setup complete!"
echo ""
echo "To start the development server:"
echo "  cd card-shop-international"
echo "  npm run dev"
echo ""
echo "📝 Available URLs:"
echo "  - Application: http://localhost:3000"
echo "  - Admin Panel: http://localhost:3000/admin"
echo "  - Database: postgresql://postgres:password@localhost:5432/cardshop"
echo ""
echo "🤖 Miyabi Agent Status:"
echo "  - GitHub: https://github.com/rikimaru63/cardshop-hp-miyabi"
echo "  - Actions: https://github.com/rikimaru63/cardshop-hp-miyabi/actions"