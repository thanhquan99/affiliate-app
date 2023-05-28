FROM node:14

# Update OS
RUN apt-get update && apt-get -y install sudo
RUN sudo apt-get -y install build-essential libcairo2-dev libpango1.0-dev libjpeg-dev libgif-dev librsvg2-dev

# Work with api
WORKDIR /usr/src/api
# Copy package.json and yarn.lock
COPY package.json /usr/src/api/package.json
COPY yarn.lock /usr/src/api/yarn.lock
# Install package
RUN yarn
# Copy src
COPY . /usr/src/api

# Run server
CMD yarn knex:migrate:latest && yarn start:dev