#!/bin/bash
set -e
echo "PROCESSING $1"

# Remove existing source
rm -rf /tmp/*

# Change into source dir
ls -l
cp -R ./spa/ /tmp

cd /tmp/spa

echo "REACT_APP_API_URL=$1" > .env
ls -la
cat .env

# Set NPM cache to /tmp
export NPM_CONFIG_CACHE=/tmp/npm-cache
npm -v

# Install deps
npm install --no-optional

# Production build
npm run build