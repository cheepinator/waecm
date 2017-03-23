if [ -n "$1" -a \( "$1" = "build" -o "$1" = "deploy" \) -a \( -z "$2" -o \( "$1" = "build" -a "$2" = "deploy" \) \) ]
	then
		if [ "$1" = "build" ]
      then
			echo "building ..."
      cp -R /usr/src/app/. /usr/src/tmp
      cd /usr/src/tmp/
      npm install
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
        cp -R /usr/src/app/. /usr/src/tmp
        cd /usr/src/tmp/
        npm install
        gulp client.build:dist
        /usr/bin/mongod &
        npm start &
        gulp
		fi
	else
		echo "usage: build | depoly | build deploy"
fi





