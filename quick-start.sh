#!/bin/bash

# Quick Start Script for Stripe Account API
# This script helps you get the API running quickly

echo "🚀 Stripe Account API - Quick Start"
echo "==================================="

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed."
    echo "Please run: ./install-node.sh"
    exit 1
fi

echo "✅ Node.js is installed: $(node --version)"
echo "✅ npm is installed: $(npm --version)"
echo ""

# Check if .env file exists
if [ ! -f ".env" ]; then
    echo "📝 Setting up environment file..."
    cp env.example .env
    echo "✅ Created .env file from template"
    echo ""
    echo "⚠️  IMPORTANT: Please edit .env file and add your Stripe API keys!"
    echo "   Get them from: https://dashboard.stripe.com/test/apikeys"
    echo ""
    read -p "Press Enter after you've added your Stripe keys to .env file..."
fi

# Install dependencies
echo "📦 Installing dependencies..."
npm install

if [ $? -ne 0 ]; then
    echo "❌ Failed to install dependencies"
    exit 1
fi

echo "✅ Dependencies installed successfully!"
echo ""

# Build the project
echo "🔨 Building the project..."
npm run build

if [ $? -ne 0 ]; then
    echo "❌ Build failed"
    exit 1
fi

echo "✅ Project built successfully!"
echo ""

# Start the server
echo "🚀 Starting the server..."
echo ""
echo "The API will be available at:"
echo "  🌐 Main API: http://localhost:3000"
echo "  📚 Swagger Docs: http://localhost:3000/api-docs"
echo "  ❤️  Health Check: http://localhost:3000/health"
echo ""
echo "Press Ctrl+C to stop the server"
echo ""

npm start
