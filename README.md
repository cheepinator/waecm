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

##REST API

This section describes the REST endpoints.

All rescources with "protected" in the URI, need an autorization header with an valid Java Web Token.

###Authentication

**Create new user**

POST "/api/users"

This endpoints creates a new user and provides an valid JWT-Token.
It is not used anymore in the frontend application.

**Login**

POST "/api/token"

This endpoint handles the login.
A username and password are expected.
It will provide a JWT-Token, if the login was successfull, otherwise a HTTP-401 error is thrown.

###Account

**get account**

GET   "/api/protected/account"

This endpoint provides the account, which is related to the user in the JWT-Token.

###Transaction

The list of the transaction of an account is already included in an account.

**create a new transaction**

POST "/api/protected/transactions"

This endpoint creates a new transaction in the database.
