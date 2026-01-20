#!/bin/bash

# Script to help clean up an exposed Figma token from Git history
# WARNING: This rewrites Git history. Use with caution!

set -e

FILE_WITH_TOKEN="FIGMA_MCP_SETUP.md"

echo "⚠️  WARNING: This script will rewrite Git history!"
echo "This is a destructive operation that will change commit hashes."
echo ""
echo "Before proceeding:"
echo "1. Revoke the exposed token in Figma"
echo "2. Ensure all team members are aware of this change"
echo "3. Have a backup of your repository"
echo ""
read -p "Do you want to continue? (yes/no): " confirm

if [ "$confirm" != "yes" ]; then
    echo "Aborted."
    exit 1
fi

echo ""
echo "Removing file containing the token from Git history..."

echo ""
echo "Optional: scrub the token value from history as well."
read -s -p "Enter the exposed token (leave blank to skip scrubbing): " EXPOSED_TOKEN
echo ""

if command -v git-filter-repo >/dev/null 2>&1; then
  echo "Using git-filter-repo (recommended)..."

  # Remove the file from history
  git filter-repo --path "$FILE_WITH_TOKEN" --invert-paths

  # If token provided, scrub it from all history
  if [ -n "$EXPOSED_TOKEN" ]; then
    TMP_REPLACE="$(mktemp)"
    printf "%s==>***REDACTED***\n" "$EXPOSED_TOKEN" > "$TMP_REPLACE"
    git filter-repo --replace-text "$TMP_REPLACE"
    rm -f "$TMP_REPLACE"
  fi
else
  echo "git-filter-repo not found. Falling back to git filter-branch..."

  # Remove the file from history (older method)
  git filter-branch --force --index-filter \
    "git rm --cached --ignore-unmatch $FILE_WITH_TOKEN" \
    --prune-empty --tag-name-filter cat -- --all

  if [ -n "$EXPOSED_TOKEN" ]; then
    echo ""
    echo "NOTE: git filter-branch cannot safely scrub token values everywhere."
    echo "Install git-filter-repo for full token replacement:"
    echo "  brew install git-filter-repo"
  fi
fi

echo ""
echo "✅ Cleanup complete"
echo ""
echo "Next steps:"
echo "1. Force push to update remote: git push --force --all"
echo "2. Force push tags: git push --force --tags"
echo "3. Inform all collaborators to re-clone the repository"
echo ""
echo "⚠️  IMPORTANT: All collaborators must re-clone the repo after this change!"

