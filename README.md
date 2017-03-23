# stodtradl

A application for displaying all citybike stations in vienna.

##Install

###Create the docker container (must be inside the folder of the dockerfile)
docker build -t waecm-bsp1 .

###Build an deploy the docker container
docker run waecm-bsp1 -v {path-to-stodtradl-source-code}:/usr/src/app -p 8080:3000 build deploy

##Access the application

https://localhost:8080/counter

##Technology stack

For creating this application we used 
the ng-fullstack yeoman generator available at https://github.com/ericmdantas/generator-ng-fullstack.

###Frontend

As Frontend we choose **Angular2**.

###Backend

In the backend we decided to use **node.js** and as web application framework **express**.

###Database

As database we use **mongoDB**. As ORM we use mongoose. 
