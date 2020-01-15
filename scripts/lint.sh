#!/usr/bin/env bash
set -e

echo "linting..."

eslint . --fix --cache

echo "lint complete!"
