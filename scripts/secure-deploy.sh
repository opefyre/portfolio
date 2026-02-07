#!/bin/bash

# Stops the script if any command fails
set -e

echo "🛡️  Starting Secure Deployment Pipeline..."

# 1. Linting
echo "🧹 Running Linter..."
npm run lint
echo "✅ Linting Passed."

# 2. Type Checking & Building
# 'next build' includes type checking.
echo "🏗️  Building Project (Static Export)..."
# Ensure we have the environment variable if needed, though for local it might load from .env.local or machine env
# For now, we assume local environment is set up since they have the key.
npm run build
echo "✅ Build & Type Check Passed."

# 3. Deployment
echo "🚀 Deploying to Firebase Hosting..."
firebase deploy --only hosting

echo "🎉 Secure Deployment Complete!"
