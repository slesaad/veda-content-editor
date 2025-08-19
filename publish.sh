#!/bin/bash

# Check if token is provided
if [ -z "$1" ]; then
  echo "Error: NPM token is required"
  echo "Usage: ./publish.sh YOUR_NPM_TOKEN"
  exit 1
fi

NPM_TOKEN=$1

echo "Setting npm authentication token..."
npm config set //registry.npmjs.org/:_authToken "$NPM_TOKEN"

echo "Building the library..."
npm run build:lib

if [ $? -ne 0 ]; then
  echo "Build failed. Aborting publish."
  exit 1
fi

echo "Publishing @slesaad/veda-content-editor to npm..."
npm publish --access public

if [ $? -eq 0 ]; then
  echo "✅ Successfully published @slesaad/veda-content-editor to npm!"
  echo "You can now install it with: npm install @slesaad/veda-content-editor"
else
  echo "❌ Publishing failed. Please check the error messages above."
  exit 1
fi

# Clean up the token from npm config for security
echo "Cleaning up npm config..."
npm config delete //registry.npmjs.org/:_authToken

echo "Done!"