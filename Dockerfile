# Use the official Node.js 20.9 image as the base image
FROM node:20.9-slim


ARG NEXT_PUBLIC_API_BASE_URL

# Set the working directory inside the container
WORKDIR /app

# Copy the application code to the working directory
COPY . /app

# Install dependencies
RUN npm install

# Build the Next.js application
ENV NEXT_PUBLIC_API_BASE_URL=$NEXT_PUBLIC_API_BASE_URL
RUN npm run build

# Expose the port that the Next.js app will run on
EXPOSE 3000

# Start the Next.js application
CMD ["npm", "start"]
