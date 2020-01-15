#!/usr/bin/env bash
set -e

echo "building..."

mkdir -p dist
babel src -d dist --source-maps --ignore "**/*.test.js" --ignore "**/__mocks__" --ignore "**/__snapshots__" --ignore "**/__tests__"

echo "build complete!"
