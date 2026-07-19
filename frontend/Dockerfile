# Use an official lightweight Node.js image
FROM node:18-alpine

# Set the working directory in the container
WORKDIR /app

# Copy package.json and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose port 3000 for the Express server
EXPOSE 3000

# Command to start the frontend server
CMD ["npm", "start"]
