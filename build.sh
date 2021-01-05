#!/bin/bash
set -e

# Remove existing source
rm -rf /tmp/*

# Change into source dir
ls -l
cp -R ./spa/ /tmp

cd /tmp/spa
ls -l

# Set NPM cache to /tmp
export NPM_CONFIG_CACHE=/tmp/npm-cache
npm -v

# Install deps
npm install --no-optional

# Production build
npm run build