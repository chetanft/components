#!/bin/bash

# Script to help clean up exposed Figma token from Git history
# WARNING: This rewrites Git history. Use with caution!

set -e

EXPOSED_TOKEN="figd_XOy4gRvyyNg91Cfz2Xrc11pqKQqizAFz41XT0NjL"
FILE_WITH_TOKEN="FIGMA_MCP_SETUP.md"

echo "⚠️  WARNING: This script will rewrite Git history!"
echo "This is a destructive operation that will change commit hashes."
echo ""
echo "Before proceeding:"
echo "1. Make sure you've revoked the exposed token in Figma"
echo "2. Ensure all team members are aware of this change"
echo "3. Have a backup of your repository"
echo ""
read -p "Do you want to continue? (yes/no): " confirm

if [ "$confirm" != "yes" ]; then
    echo "Aborted."
    exit 1
fi

echo ""
echo "Removing token from Git history..."

# Method 1: Using git filter-branch (older method, but widely compatible)
# This removes the token from all commits
git filter-branch --force --index-filter \
  "git rm --cached --ignore-unmatch $FILE_WITH_TOKEN" \
  --prune-empty --tag-name-filter cat -- --all

# Method 2: Using git-filter-repo (newer, faster method - requires installation)
# Uncomment if you have git-filter-repo installed:
# git filter-repo --path $FILE_WITH_TOKEN --invert-paths

echo ""
echo "✅ Token removed from Git history"
echo ""
echo "Next steps:"
echo "1. Force push to update remote: git push --force --all"
echo "2. Force push tags: git push --force --tags"
echo "3. Inform all collaborators to re-clone the repository"
echo ""
echo "⚠️  IMPORTANT: All collaborators must re-clone the repo after this change!"

