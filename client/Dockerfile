# Stage 1: Build React application (with caching)
FROM node:18-alpine AS builder  

WORKDIR /app

# Copy package.json and package-lock.json for efficient caching
COPY package*.json ./

# Install dependencies, caching node_modules
RUN npm install --cache /usr/local/npm_cache

# Copy the rest of the application
COPY . .

# Build React app with Vite, potentially caching build artifacts
RUN npm run build  # Adjust if your build command has a different name

# Stage 2: Production-ready Nginx image (with potential caching)
FROM nginx:alpine AS nginx

# Reuse cached build artifacts from stage 1 (if applicable)
COPY --from=builder /app/dist /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Customize Nginx configuration for production (optional)
# Consider adding a custom configuration file

# Start Nginx in the background for production (optional)
CMD ["nginx", "-g", "daemon off;"]  # Replace with a process manager in production
