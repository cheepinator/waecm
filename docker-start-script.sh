ls
cd /usr/src/app/
gulp client.build:dist
mkdir -p /usr/src/tmp/client
cp -R /usr/src/app/server/ /usr/src/tmp
cp -R /usr/src/app/tasks/ /usr/src/tmp
cp /usr/src/app/gulpfile.babel.js /usr/src/tmp
cp -R /usr/src/app/client/dist /usr/src/tmp/client
rm -rf /usr/src/app/client/dist
cd /usr/src/tmp/
npm install
cd /usr/src/app/
npm install
/usr/bin/mongod &
gulp &
npm start
