#!/usr/bin/env bash
set -e

echo "testing in debug..."

node --inspect node_modules/.bin/jest $@ --runInBand --expand

echo "test complete!"
