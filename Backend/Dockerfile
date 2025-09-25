# backend/Dockerfile
# This tells Docker to start from the official Node.js 22 image, specifically the lightweight Alpine Linux variant.
# means inside the container, Node.js v18 will be installed, no matter what version you have on your computer.
FROM node:22-alpine
# Sets /app as the working directory inside the container.
WORKDIR /app
# Copies only package.json and package-lock.json first (better for caching).
COPY package*.json ./
# Installs only production dependencies (no devDependencies) using npm ci (clean, reproducible installs).
RUN npm ci --only=production
# copy app code
COPY . .
# if you need build step (TS), run it here
# we can unccomment this if we need to build the project
# RUN npm run build

# Defines environment variable PORT=5000
# EXPOSE : this container listens on port 5000.
ENV PORT=5000
EXPOSE 5000
# This is the command Docker runs when the container starts.
# It’ll launch server.js with Node.
# Also, we can run our app with npm start if we have that in package.json

CMD ["node", "server.js"]
