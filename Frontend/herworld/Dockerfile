# Starts from a small Linux image that already has Node v22 installed.
# We need Node to run npm and build the React (Vite) app. as build
# build stage
FROM node:22-alpine as build
# Sets the working folder inside the container to /app.
WORKDIR /app
# Copies package.json and package-lock.json first.
COPY package*.json ./
# Installs the project dependencies exactly as recorded in package-lock.json.
# npm ci is faster and more reproducible than npm install for CI/builds. (It expects a package-lock.json.
RUN npm ci
# Copies the rest of the application code to the working directory.
COPY . .
# Builds the app for production to the dist folder.
# This step compiles/transforms your React + assets into plain HTML/CSS/JS that a web server can serve.
RUN npm run build
# production stage: serve with nginx
# We don’t need Node in the final image — only a static web server (Nginx) to serve the built files. This keeps the final image small and secure
FROM nginx:alpine
# Copies the files created in the build stage (/app/dist) into Nginx’s default website folder.
# nginx will serve the static files to visitors
COPY --from=build /app/dist /usr/share/nginx/html 
# Declares that the container listens on port 80 (HTTP).
EXPOSE 80
# Runs Nginx in the foreground so the container stays alive and serves requests.
# Docker containers exit if the main process finishes — running nginx this way keeps it running.
CMD ["nginx", "-g", "daemon off;"]
