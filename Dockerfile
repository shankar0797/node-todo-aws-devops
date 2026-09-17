# Use a lightweight Node.js runtime
FROM node:20-alpine

# Set application working directory
WORKDIR /app

# Copy dependency files first
COPY package*.json ./

# Install production dependencies
RUN npm ci --omit=dev

# Copy application source code
COPY . .

# Application listens on port 8000
EXPOSE 8000

# Start the application
CMD ["node", "app.js"]