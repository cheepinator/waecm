FROM ubuntu:latest
RUN mkdir -p /usr/src/tmp
RUN mkdir -p /data/db
VOLUME /usr/src/app/
WORKDIR /usr/src/tmp
COPY docker-start-script.sh /usr/src
RUN apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv EA312927
RUN echo "deb http://repo.mongodb.org/apt/ubuntu $(cat /etc/lsb-release | grep DISTRIB_CODENAME | cut -d= -f2)/mongodb-org/3.2 multiverse" | tee /etc/apt/sources.list.d/mongodb-org-3.2.list
RUN apt-get update && apt-get install -y mongodb-org
RUN apt-get install -y curl
RUN apt-get install -y npm
RUN npm install -g n
RUN n 6.10.1
RUN npm i -g istanbul mocha babel gulp-cli
RUN npm install -g typescript typings
EXPOSE 3000

ENTRYPOINT ["/bin/sh", "-c", "/usr/src/docker-start-script.sh ${*}", "--"]
