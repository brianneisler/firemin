#!/usr/bin/env bash
set -e

echo "setting up..."

npm install
npm run build

echo "setup complete!"
