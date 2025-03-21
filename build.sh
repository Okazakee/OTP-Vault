#!/bin/bash
set -e

# Check for EXPO_TOKEN
if [ -z "${EXPO_TOKEN}" ]; then
  echo "EXPO_TOKEN is not set. Please enter your Expo token:"
  read -r EXPO_TOKEN
  export EXPO_TOKEN
fi

# Get the absolute path to the script directory
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

# Build the Docker image
echo "Building Docker image..."
docker build -t expo-android-builder -f "${SCRIPT_DIR}/Dockerfile" .

# Run the build command inside the Docker container
echo "Running Expo build inside Docker container..."
docker run --rm \
  -v "${PWD}:/app" \
  -v "${HOME}/.npm:/home/expo/.npm" \
  -v "${HOME}/.gradle:/home/expo/.gradle" \
  -e EXPO_TOKEN=${EXPO_TOKEN} \
  expo-android-builder \
  "cd /app && npm install && eas build --platform android --profile preview --local --non-interactive"

echo "Build completed. APK should be available in the project output directory."