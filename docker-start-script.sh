if [ -n "$1" -a \( "$1" = "build" -o "$1" = "deploy" \) -a \( -z "$2" -o \( "$1" = "build" -a "$2" = "deploy" \) \) ]
	then
		if [ "$1" = "build" ]
      then
			echo "building ..."
      cp -av /usr/src/app/. /usr/src/tmp/
      cd /usr/src/tmp
      rm -rf node_modules
      rm -rf typings
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
        rm -rf node_modules
        rm -rf typings
        npm install
        typings install
        gulp client.build:dist
        /usr/bin/mongod &
        npm start &
        gulp
		fi
	else
		echo "usage: build | deploy | build deploy"
fi





