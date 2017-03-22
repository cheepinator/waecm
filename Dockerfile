FROM ubuntu:latest
RUN mkdir -p /usr/src/tmp
RUN mkdir -p /data/db
VOLUME /usr/src/app/
WORKDIR /usr/src/tmp
COPY package.json /usr/src/tmp/
COPY typings.json /usr/src/tmp/
COPY docker-start-script.sh /usr/src/tmp/
RUN apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv EA312927
RUN echo "deb http://repo.mongodb.org/apt/ubuntu $(cat /etc/lsb-release | grep DISTRIB_CODENAME | cut -d= -f2)/mongodb-org/3.2 multiverse" | tee /etc/apt/sources.list.d/mongodb-org-3.2.list
RUN apt-get update && apt-get install -y mongodb-org
RUN apt-get install -y curl
RUN apt-get install -y npm
RUN npm install -g n
RUN n 6.10.1
RUN npm install
RUN npm i -g istanbul mocha babel gulp-cli
RUN npm install -g typescript typings
RUN typings install
EXPOSE 3000:8080

ENTRYPOINT ["/bin/sh", "-c", "/usr/src/tmp/docker-start-script.sh"]
#todo call entrypoint script ENTRYPOINT ["/bin/sh", "-c", "/docker-start-script.sh ${*}", "--"]
#todo run -v /src/webapp:/usr/src/app/ to mount the first to the second in the container
# todo make
