#!/usr/bin/env bash
set -e

echo "testing..."

jest --expand $@

echo "test complete!"

