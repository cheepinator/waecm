# stodtradl

A application for displaying all citybike stations in vienna.

##PLEASE NOTE:
The file docker-start-script.sh must be encoded as LF. Probably this is only a problem on windows systems.
On Windows systems the volume host mapping did not work under CMD, (other than with administrator permissions), with PowerShell it worked well.

##Install

###Create the docker container (must be inside the folder of the dockerfile)
docker build -t waecm-bsp1 .

###Build an deploy the docker container
docker run -v {path-to-stodtradl-source-code}:/usr/src/app -p 8080:3000 waecm-bsp1 build deploy

##Access the application

https://localhost:8080/counter

Comments on the application:
  the Username is "user", the password is "password"
  if a wrong username/password combination is given, the server sends a 401.
  The authentication is realised using jwt.
  by pressing the '+' button, a post is sent to the server to increment the counter.
  After the post, a get is called to retrieve the actual counter value and displays it in the textarea below

##Technology stack

For creating this application we used 
the ng-fullstack yeoman generator available at https://github.com/ericmdantas/generator-ng-fullstack.

###Frontend

As Frontend we choose **Angular2**.

###Backend

In the backend we decided to use **node.js** and as web application framework **express**.

###Database

As database we use **mongoDB**. As ORM we use mongoose. 
