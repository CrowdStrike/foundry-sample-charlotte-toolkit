#!/bin/bash

# Script to install enhanced build optimization dependencies
echo "Installing optimization dependencies for LLM Assistant UI"

# Install image optimization
npm install --save-dev @rollup/plugin-image

# Install compression plugins
npm install --save-dev rollup-plugin-gzip

# Install bundle analysis
npm install --save-dev rollup-plugin-visualizer

# Install CSS optimization tools
npm install --save-dev autoprefixer cssnano cssnano-preset-advanced postcss-purgecss

# Install cross-env for profiling
npm install --save-dev cross-env

echo "All optimization dependencies installed successfully!"
echo "Run 'npm run build:prod' to build with optimizations or 'npm run analyze' to analyze the bundle."
