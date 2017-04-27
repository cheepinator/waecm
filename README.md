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

It would expect a User in JSON Form as body, seen as follows:

{
    "username" : "erika.test",
    "firstName" : "Erika",
    "lastName" : "Test",
    "password" : "5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8",
}

(Disclaimer: obviously, this endpoint opens a wide array of Security concerns, and would not be present in this way in a Production Application.)

**Login**

POST "/api/token"

This endpoint handles the login.
A username and a hashed password are expected.
It will provide a JWT-Token, if the login was successfull, otherwise a HTTP-401 error is thrown.

{
    "username" : "erika.test",
    "password" : "5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8",
}

Result:
{
    "id_token" : "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VybmFtZSI6Im1heC5tdXN0ZXJtYW5uIiwiZmlyc3ROYW1lIjoiTWF4IiwibGFzdE5hbWUiOiJNdXN0ZXJtYW5uIiwiaWF0IjoxNDkzMjkyMTgwLCJleHAiOjE0OTMzMTAxODB9.drfRpVQ3ZqlQ_oSxWC7hZHIcM8tdNf6DEHQ2yr87tS0"
}

###Account

**get account**

GET   "/api/protected/account"

This endpoint provides the account, which is related to the user in the JWT-Token.

Example Result:

{
    "username" : "erika.test",
    "firstName" : "Erika",
    "lastName" : "Test",
    "bankAccount" : {
        "iban" : AT 5345 2345 4365 3456,
        "balance" : 900,
        "transactions" : [ 
            {
                "ibanReceiver" : "AT 5345 2345 4365 3452",
                "value" : -100,
                "date" : ISODate("2017-04-25T16:57:14.680Z"),
                "ibanSender" : "3",
            }
        ]
    },
}

###Transaction

The list of the transaction of an account is already included in an account.

**create a new transaction**

POST "/api/protected/transactions"
´´´
Example Request: 
{
        "value" : 50,
        "ibanReceiver" : "AT55 7989 9877 9879",
},
 ´´´
 
 Example Response:
 ´´´
 {
         "value" : 50,
         "ibanReceiver" : "AT55 7989 9877 9879",
 },
 ´´´
 With this Response, a verification TAN is sent via a Secondary Channel (SMS, log output on server for testing).
 This TAN is to be sent via another Request to confirm the Transaction.
 The second Request has to look like the following:
 Example Request:
 
 Example Request: 
 ´´´
 {
         "value" : 50,
         "ibanReceiver" : "AT55 7989 9877 9879",
         "tan" : "ab32ba"
 },
  ´´´
 Example Response:
 ´´´
  {
          "value" : 50,
          "ibanReceiver" : "AT55 7989 9877 9879",
          "tan" : "ab32ba"
  },
   ´´´
 If the tan is correctly verified, the same Transaction is sent back as confirmation.
 
 
 
 
This endpoint creates a new transaction in the database.
