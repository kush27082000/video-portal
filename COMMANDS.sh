#!/bin/bash

# VideoPortal - Quick Setup Commands
# Run these commands in Terminal one by one

echo "========================================="
echo "VideoPortal Local Setup"
echo "========================================="
echo ""

# Check Node.js
echo "Step 1: Checking Node.js installation..."
if command -v node &> /dev/null; then
    echo "✅ Node.js is installed: $(node --version)"
    echo "✅ npm is installed: $(npm --version)"
else
    echo "❌ Node.js is NOT installed"
    echo ""
    echo "Please install Node.js first:"
    echo "Option 1: brew install node"
    echo "Option 2: Download from https://nodejs.org"
    echo ""
    exit 1
fi

echo ""
echo "Step 2: Installing dependencies..."
cd /Users/kushagra.soni/Downloads/dummyjson/video-portal
npm install

echo ""
echo "Step 3: Setting up environment file..."
if [ ! -f .env.local ]; then
    cp .env.local.example .env.local
    echo "✅ Created .env.local file"
    echo ""
    echo "⚠️  IMPORTANT: You need to edit .env.local with your Supabase keys!"
    echo "   Run: open -e .env.local"
    echo ""
    echo "   Get your keys from: https://supabase.com"
    echo "   1. Create a project"
    echo "   2. Run the SQL from supabase-setup.sql"
    echo "   3. Go to Settings → API → Copy the keys"
else
    echo "✅ .env.local already exists"
fi

echo ""
echo "========================================="
echo "Setup Complete! 🎉"
echo "========================================="
echo ""
echo "Before starting the server:"
echo "1. Make sure you've set up Supabase (see START_HERE.md)"
echo "2. Edit .env.local with your Supabase keys"
echo ""
echo "To start the development server, run:"
echo "  npm run dev"
echo ""
echo "Then open: http://localhost:3000"
echo ""
