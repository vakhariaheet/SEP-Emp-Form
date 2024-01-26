# Use Node 16 alpine as parent image
FROM node:latest

# Change the working directory on the Docker image to /app
WORKDIR /src

# Copy package.json and package-lock.json to the /app directory
COPY package.json ./

# Install dependencies
RUN npm install

# Build the application

# Copy the rest of project files into this image
COPY . .

# Expose application port
EXPOSE 3005

# Start the application
CMD npm run dev