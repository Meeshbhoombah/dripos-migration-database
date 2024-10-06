# Use Node.js base image
FROM node:22-alpine

# Set working directory
WORKDIR /app

# Copy package.json and install dependencies
COPY package.json ./
RUN npm install

# Copy the rest of the backend code
COPY . .

# Transpile TypeScript code
RUN npx tsc

# Expose the application's port
EXPOSE 5000

# Run the application
CMD ["node", "dist/app.js"]

