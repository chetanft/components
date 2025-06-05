#!/bin/bash

# Script to share Storybook with designers
echo "🎨 Design System Storybook Sharing Tool"
echo "======================================"
echo ""

# Get local IP address
LOCAL_IP=$(ipconfig getifaddr en0 2>/dev/null || hostname -I 2>/dev/null | awk '{print $1}' || echo "localhost")

echo "📦 Building latest Storybook..."
npm run build-storybook

echo ""
echo "🚀 Starting local server..."
echo ""

# Start server in background
cd storybook-static
python3 -m http.server 8080 &
SERVER_PID=$!

echo "✅ Storybook is now available at:"
echo ""
echo "   🏠 Local:    http://localhost:8080"
echo "   🌐 Network:  http://$LOCAL_IP:8080"
echo ""
echo "📋 Share this network URL with designers on the same WiFi:"
echo "   http://$LOCAL_IP:8080"
echo ""
echo "💡 Deployment Options:"
echo "   • Drag storybook-static folder to netlify.com/drop"
echo "   • Upload to Vercel: npx vercel storybook-static"
echo "   • GitHub Pages: Push to repo and enable Pages"
echo ""
echo "🛑 Press Ctrl+C to stop the server"

# Wait for Ctrl+C
trap "kill $SERVER_PID; exit" INT
wait 