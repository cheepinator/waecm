cd /usr/src/app/
gulp client.build:dist
cp -R /usr/src/app/. /usr/src/tmp
rm -rf /usr/src/app/client/dist
cd /usr/src/tmp/
npm install
/usr/bin/mongod &
npm start &
gulp
