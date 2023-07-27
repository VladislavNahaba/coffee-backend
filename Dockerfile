FROM node:18
# Create app directory
WORKDIR /code

# fix error with diff date on diff computers
RUN echo "Acquire::Check-Valid-Until \"false\";\nAcquire::Check-Date \"false\";" | cat > /etc/apt/apt.conf.d/10no--check-valid-until
RUN apt-get update
COPY package*.json /code/
RUN npm install

COPY . /code/
