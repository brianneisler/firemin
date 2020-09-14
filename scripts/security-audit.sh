#!/usr/bin/env bash
set -e

echo "Auditing node packages..."

# critical issues should fail build
npm audit --audit-level=critical

echo "Audit complete!"
