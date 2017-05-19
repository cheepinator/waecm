if [ -n "$1" -a \( "$1" = "build" -o "$1" = "deploy" -o "$1" = "test" -o "$1" = "selenium" \) -a \( -z "$2" -o \( "$1" = "build" -a "$2" = "deploy" \) \) ]
	then
	npm config set loglevel warn
		if [ "$1" = "build" ]
      then
			echo "building ..."
      cp -a /usr/src/app/. /usr/src/tmp/
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
        cp -a /usr/src/app/. /usr/src/tmp/
        cd /usr/src/tmp
        npm install
        typings install
        gulp client.build:dist
        /usr/bin/mongod &
        npm start &
        gulp #todo & entfernen
    elif [ "$1" = "test" ]
			then
    	  echo "testing ..."
        cp -a /usr/src/app/. /usr/src/tmp/
        cd /usr/src/tmp
        npm install -g bower
        npm install
        typings install
        npm config set loglevel info
        npm run-script coveralls-server
    elif [ "$1" = "selenium" ]
    			then
        	  echo "testing selenium ..."
            #export CHROME_BIN=/usr/bin/chromium-browser
            cp -a /usr/src/app/. /usr/src/tmp/
            cd /usr/src/tmp
            npm install
            typings install
            #export DISPLAY=:99.0
            #Xvfb :99 -screen 0 640x480x8 -nolisten tcp
            echo "starting mongodb"
            /usr/bin/mongod &
            echo "starting with npm"
            # npm config set loglevel info
            npm run-script dev &
            # sleep 5s
            echo "start script finished"
            # npm run-script dev &
            sleep 5m
            # npm run-script test-selenium
            # echo "test-selenium finished"
		fi
	else
		echo "usage: build | deploy | build deploy | test | selenium"
fi





