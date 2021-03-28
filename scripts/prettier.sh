 #!/usr/bin/env bash
set -e
nvm-guard

echo "prettifying..."

prettier --write "**/*.{json,md,yml}"

echo "prettier complete!"
