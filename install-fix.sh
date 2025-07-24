#!/bin/bash

echo "🔧 Fixing GiftCards India project dependencies..."

# Clear any existing node_modules
echo "🧹 Cleaning up existing installation..."
rm -rf node_modules
rm -f package-lock.json
rm -f yarn.lock

# Clear npm cache
echo "🧹 Clearing npm cache..."
npm cache clean --force

# Install dependencies
echo "📦 Installing fixed dependencies..."
npm install --verbose

# Verify installation
echo "✅ Verifying installation..."
if [ -d "node_modules" ]; then
    echo "✅ Dependencies installed successfully!"
    echo ""
    echo "🚀 Ready to start development:"
    echo "   npm run dev"
    echo ""
    echo "🌐 Your app will be available at http://localhost:3000"
else
    echo "❌ Installation failed. Please check the error messages above."
    exit 1
fi