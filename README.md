# Uber Banking

The next generation Banking TOol.

##PLEASE NOTE:
The file docker-start-script.sh must be encoded as LF. Probably this is only a problem on windows systems.
On Windows systems the volume host mapping did not work under CMD, (other than with administrator permissions), with PowerShell it worked well.

##Install

###Create the docker container (must be inside the folder of the dockerfile)
docker build -t waecm-bsp1 .

###Build an deploy the docker container
docker run -v {path-to-stodtradl-source-code}:/usr/src/app -p 8080:3000 waecm-bsp1 build deploy

##Access the application

https://localhost:8080/

Usernames and Passwords:
max.mustermann         password
erika.test             password
gabi.musterfrau        password



##Technology stack

For creating this application we used 
the ng-fullstack yeoman generator available at https://github.com/ericmdantas/generator-ng-fullstack.

###Frontend

As Frontend we choose **Angular2**.

###Backend

In the backend we decided to use **node.js** and as web application framework **express**.

###Database

As database we use **mongoDB**. As ORM we use mongoose. 
