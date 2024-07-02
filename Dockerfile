FROM node:14

# Create a non-root user and group
RUN groupadd -r nodegroup && useradd -r -g nodegroup -s /bin/bash -m nodeuser

# Set the working directory to /app
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install any needed dependencies
RUN npm install

# Copy the rest of the application code to the working directory
COPY . .

# Change ownership of the working directory to the non-root user
RUN chown -R nodeuser:nodegroup /app

# Switch to the non-root user
USER nodeuser

# Make the environment variables configurable
ARG PORT=8080
ARG HOST=0.0.0.0

# Inform Docker that the container is listening on the specified port
EXPOSE $PORT

# Run the application
CMD ["node", "src/index.js"]