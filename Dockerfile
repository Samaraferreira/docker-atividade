# Build Stage
FROM node:23-alpine3.19 AS build

WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install --only=production

# Copy application source
COPY ./src ./src
COPY ./database ./database

# RUN npm run build

# Runtime Stage
FROM node:23-alpine3.19 AS runtime
WORKDIR /app

# Copy only the production files from the build stage
COPY --from=build /app .
# COPY .env .env

# Expose application port
EXPOSE 3000

# Run the application
CMD ["node", "src/index.js"]
