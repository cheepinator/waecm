cd /usr/src/app/
gulp client.build:/usr/src/tmp/dist
cp -R /usr/src/app/server/ /usr/src/tmp
cd /usr/src/tmp/
npm start dev
