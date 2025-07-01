#!/bin/bash

# Install root dependencies
npm install

# Install client dependencies and build
cd client
npm install
npm run build

echo "Build completed successfully!"