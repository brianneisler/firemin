#!/usr/bin/env bash
set -e

echo "cleansing..."

npm run clean
rm -rf node_modules
rm -f package-lock.json

echo "cleanse complete!"
