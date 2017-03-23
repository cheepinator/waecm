echo $1 $2
if [ -n "$1" -a \( "$1" = "build" -o "$1" = "deploy" \) -a \( -z "$2" -o \( "$1" = "build" -a "$2" = "deploy" \) \) ]
	then
		if [ "$1" = "build" ]
      then
			echo "building ..."
			cd /usr/src/app/
      gulp client.build:dist
      cp -R /usr/src/app/. /usr/src/tmp
      rm -rf /usr/src/app/client/dist
      cd /usr/src/tmp/
      npm install
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
        cd /usr/src/app/
        gulp client.build:dist
        cp -R /usr/src/app/. /usr/src/tmp
        rm -rf /usr/src/app/client/dist
        cd /usr/src/tmp/
        npm install
        /usr/bin/mongod &
        npm start &
        gulp
		fi
	else
		echo "usage: build | depoly | build deploy"
fi





