#!/bin/bash

# Node.js Installation Script for macOS
# This script helps you install Node.js if you don't have it

echo "🚀 Node.js Installation Helper"
echo "=============================="

# Check if Node.js is already installed
if command -v node &> /dev/null; then
    echo "✅ Node.js is already installed!"
    echo "Version: $(node --version)"
    echo "npm Version: $(npm --version)"
    echo ""
    echo "You can now run: npm install"
    exit 0
fi

echo "❌ Node.js is not installed."
echo ""
echo "Here are your options to install Node.js:"
echo ""
echo "1. 🍺 Using Homebrew (Recommended)"
echo "   Run: brew install node"
echo ""
echo "2. 📥 Download from Official Website"
echo "   Go to: https://nodejs.org/"
echo "   Download the LTS version"
echo ""
echo "3. 🔧 Using Node Version Manager (nvm)"
echo "   Run: curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash"
echo "   Then: nvm install 18 && nvm use 18"
echo ""

# Check if Homebrew is available
if command -v brew &> /dev/null; then
    echo "✅ Homebrew is available!"
    echo ""
    read -p "Would you like me to install Node.js using Homebrew? (y/n): " -n 1 -r
    echo ""
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        echo "Installing Node.js with Homebrew..."
        brew install node
        
        if [ $? -eq 0 ]; then
            echo "✅ Node.js installed successfully!"
            echo "Version: $(node --version)"
            echo "npm Version: $(npm --version)"
            echo ""
            echo "You can now run: npm install"
        else
            echo "❌ Installation failed. Please try one of the other methods."
        fi
    else
        echo "Please install Node.js using one of the methods above."
    fi
else
    echo "❌ Homebrew is not available."
    echo "Please install Node.js using one of the other methods above."
fi

echo ""
echo "After installing Node.js, come back and run:"
echo "  npm install"
echo "  npm run dev"
