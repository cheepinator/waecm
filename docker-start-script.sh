#!/usr/bin/env bash
if [ -n "$1" -a \( "$1" = "build" -o "$1" = "deploy" -o "$1" = "test"\) -a \( -z "$2" -o \( "$1" = "build" -a "$2" = "deploy" \) \) ]
	then
		if [ "$1" = "build" ]
      then
			echo "building ..."
      cp -av /usr/src/app/. /usr/src/tmp/
      cd /usr/src/tmp
      npm install
      typings install
      gulp client.build:dist
			if [ "$2" = "deploy" ]
				then
				echo "deploying ..."
				/usr/bin/mongod &
        npm start &
        gulp
			fi
		elif [ "$1" = "deploy" ]
			then
    	  echo "deploying ..."
        cp -av /usr/src/app/. /usr/src/tmp/
        cd /usr/src/tmp
        npm install
        typings install
        gulp client.build:dist
        /usr/bin/mongod &
        npm start &
        gulp
    elif [ "$1" = "test" ]
			then
    	  echo "testing ..."
        cp -av /usr/src/app/. /usr/src/tmp/
        cd /usr/src/tmp
        npm install -g bower
        npm install
        typings install
        npm run-script test-on-travis
        bower install
        export DISPLAY=:99.0
        sh -e /etc/init.d/xvfb start
        gulp coverage_frontend
        npm run-script test-on-travis
		fi
	else
		echo "usage: build | deploy | build deploy"
fi





