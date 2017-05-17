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
        gulp
    elif [ "$1" = "test" ]
			then
    	  echo "testing ..."
        export CHROME_BIN=/usr/bin/chromium-browser
        cp -a /usr/src/app/. /usr/src/tmp/
        cd /usr/src/tmp
        npm install -g bower
        npm install
        typings install
        export DISPLAY=:99.0
        Xvfb :99 -screen 0 640x480x8 -nolisten tcp &
        gulp coverage_frontend
        npm config set loglevel info
        npm run-script test-client
        npm run-script coverage-server
    elif [ "$1" = "selenium" ]
    			then
        	  echo "testing selenium ..."
            #export CHROME_BIN=/usr/bin/chromium-browser
            cp -a /usr/src/app/. /usr/src/tmp/
            cd /usr/src/tmp
            npm install -g bower
            npm install
            typings install
            echo "starting sauce..."

            CONNECT_URL="http://saucelabs.com/downloads/Sauce-Connect-latest.zip"
            CONNECT_DIR="/tmp/sauce-connect-$RANDOM"
            CONNECT_DOWNLOAD="Sauce_Connect.zip"
            READY_FILE="connect-ready-$RANDOM"

            # Get Connect and start it
            mkdir -p $CONNECT_DIR
            cd $CONNECT_DIR
            curl $CONNECT_URL > $CONNECT_DOWNLOAD
            unzip $CONNECT_DOWNLOAD
            rm $CONNECT_DOWNLOAD
            java -jar Sauce-Connect.jar --readyfile $READY_FILE \
                --tunnel-identifier $TRAVIS_JOB_NUMBER \
                $SAUCE_USERNAME $SAUCE_ACCESS_KEY &

            # Wait for Connect to be ready before exiting
            while [ ! -f $READY_FILE ]; do
              sleep .5
            done
            echo "sauce started"
            #export DISPLAY=:99.0
            #Xvfb :99 -screen 0 640x480x8 -nolisten tcp
            gulp client.build:dist
            echo "starting mongodb"
            /usr/bin/mongod &
            echo "starting with npm"
            npm config set loglevel info
            #npm start &
            #gulp &
            sleep 5s
            echo "start script finished"
            npm run-script dev &
            npm run-script test-selenium
            echo "test-selenium finished"
		fi
	else
		echo "usage: build | deploy | build deploy | test | selenium"
fi





