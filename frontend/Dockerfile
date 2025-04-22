# Use an official Node.js runtime as a parent image
FROM node:16

# Set the working directory
WORKDIR /app

# Copy the current directory contents into the container at /app
COPY . .

# Install dependencies
RUN npm install

# Build the React app
RUN npm run build

# Expose port 3000 for the React app
EXPOSE 3000

# Run the application
CMD ["npm", "start"]
