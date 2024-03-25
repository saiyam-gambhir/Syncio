FROM node:16.10-alpine

# make the 'app' folder the current working directory
WORKDIR /usr/src/app/syncio-fe

# copy both 'package.json' and 'package-lock.json' (if available)
COPY package*.json ./

# install project dependencies
RUN npm install

# Copy project files into the docker image
COPY . .

EXPOSE 8080

# Start the Vite server
CMD ["npm", "run", "dev"]