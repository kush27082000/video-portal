#!/bin/bash

# 🚀 Quick Push Script for Video Portal
# Run this after creating your GitHub repository

echo "🚀 Pushing Video Portal to GitHub..."
echo ""

# Navigate to project
cd /Users/kushagra.soni/Downloads/dummyjson/video-portal

# Check if remote exists
if git remote | grep -q "origin"; then
    echo "⚠️  Remote 'origin' already exists, removing..."
    git remote remove origin
fi

# Add your GitHub remote
echo "📦 Adding GitHub remote..."
git remote add origin https://github.com/kush27082000/video-portal.git

# Show current branch
echo ""
echo "📍 Current branch: $(git branch --show-current)"
echo ""

# Push to GitHub
echo "📤 Pushing to GitHub..."
git push -u origin main

echo ""
echo "✅ DONE! Your code is on GitHub!"
echo ""
echo "🚀 Next step: Deploy to Vercel"
echo "   Go to: https://vercel.com/new"
echo ""
