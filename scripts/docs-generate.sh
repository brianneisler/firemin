#!/usr/bin/env bash

echo "generating docs..."

babel-node ./scripts/js/docs-generate.js
npm run prettier:staged ./docs/API.md

echo "docs generated!"
