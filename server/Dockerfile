FROM node:16-alpine
WORKDIR /app
# Install dependencies and build tools
RUN apk update && apk add --no-cache \
  g++ \
  gcc \
  make \
  openjdk11-jdk \
  python3 \
  py3-pip

COPY package*.json ./
RUN npm install
COPY . .
COPY /utils/firebase/creds.json /app/creds.json
EXPOSE 5000
CMD ["npm", "start"]