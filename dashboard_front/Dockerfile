# Use an official Node.js runtime as a base image
FROM node:14-alpine

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the local source files to the container
COPY . .

# Build the React app
RUN npm run build

# Expose port 8080
EXPOSE 8080

# Set the environment variable to production
ENV NODE_ENV=production

# Command to run the application
CMD ["npm", "start"]
