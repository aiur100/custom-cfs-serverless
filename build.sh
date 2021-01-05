#!/bin/bash
set -e

# Remove existing source
rm -rf /tmp/*

# Set NPM cache to /tmp
export NPM_CONFIG_CACHE=/tmp/npm-cache

# Change into source dir
cd /var/task/spa

# Install deps
npm install --no-optional

# Run unit tests
#npm run test

# Production build
npm run build

# Upload (custom script)
#npm run upload