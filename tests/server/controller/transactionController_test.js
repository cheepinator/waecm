import mongoose from "mongoose";
import UserDAO from "../../../server/api/dao/userDAO";
import {expect} from "chai";
import {setupMongoose, createUserAndAccounts} from "../_helpers/db";

let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../../../server/server');

chai.use(chaiHttp);

describe("Transaction", () => {
  before(() => {
    setupMongoose(mongoose);
  });

  afterEach((done) => {
    UserDAO.remove({}, () => done());
  })

  describe("send transaction", () => {

    it('it should throw error, no 0 Transactions allowed', (done) => {

      let transaction = {
        value: 0,
        date: new Date(),
        ibanSender: "AT55 7989 9877 9879",
        ibanReceiver: "AT55 2189 1241 0275",
        paymentReference: "Ich need test money",
        category: "Test",
        tan:null
      };

      //First login
      process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
      chai.request(server)
        .post('/api/token')
        .send({username: 'max.mustermann', password: 'password'})
        .end((err, res) => {
          expect(res.status).to.equal(201);
          expect(res.body).to.have.property("id_token");

          //retrieve token, so that we are logged in
          let token = res.body.id_token;

          chai.request(server)
            .post('/api/protected/transactions')
            .set('Authorization', 'Bearer ' + token)
            .send(transaction)
            .end((err2, res2) => {
              expect(res2.status).to.equal(400);
              expect(res2.text).to.equal("No negative Transactions allowed");

              done();
            });
        });
    });

    it('it should throw error, no negative Transactions allowed', (done) => {

      let transaction = {
        value: -100,
        date: new Date(),
        ibanSender: "AT55 7989 9877 9879",
        ibanReceiver: "AT55 2189 1241 0275",
        paymentReference: "Ich need test money",
        category: "Test",
        tan:null
      };

      //First login
      process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
      chai.request(server)
        .post('/api/token')
        .send({username: 'max.mustermann', password: 'password'})
        .end((err, res) => {
          expect(res.status).to.equal(201);
          expect(res.body).to.have.property("id_token");

          //retrieve token, so that we are logged in
          let token = res.body.id_token;

          chai.request(server)
            .post('/api/protected/transactions')
            .set('Authorization', 'Bearer ' + token)
            .send(transaction)
            .end((err2, res2) => {
              expect(res2.status).to.equal(400);
              expect(res2.text).to.equal("No negative Transactions allowed");

              done();
            });
        });
    });

    it('it should throw error, receiver IBAN not found', (done) => {

      let transaction = {
        value: 100,
        date: new Date(),
        ibanSender: "AT55 7989 9877 9879",
        ibanReceiver: "undefined",
        paymentReference: "Ich need test money",
        category: "Test",
        tan:null
      };

      //First login
      process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
      chai.request(server)
        .post('/api/token')
        .send({username: 'max.mustermann', password: 'password'})
        .end((err, res) => {
          expect(res.status).to.equal(201);
          expect(res.body).to.have.property("id_token");

          //retrieve token, so that we are logged in
          let token = res.body.id_token;

          chai.request(server)
            .post('/api/protected/transactions')
            .set('Authorization', 'Bearer ' + token)
            .send(transaction)
            .end((err2, res2) => {
              expect(res2.status).to.equal(403);
              expect(res2.text).to.equal("IBAN or Username incorrect!");

              done();
            });
        });
    });

    it('it should throw error, sender and reciever IBAN are identical', (done) => {

      let transaction = {
        value: 100,
        date: new Date(),
        ibanSender: "AT55 7989 9877 9879",
        ibanReceiver: "AT55 7989 9877 9879",
        paymentReference: "Ich need test money",
        category: "Test",
        tan:null
      };

      //First login
      process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
      chai.request(server)
        .post('/api/token')
        .send({username: 'max.mustermann', password: 'password'})
        .end((err, res) => {
          expect(res.status).to.equal(201);
          expect(res.body).to.have.property("id_token");

          //retrieve token, so that we are logged in
          let token = res.body.id_token;

          chai.request(server)
            .post('/api/protected/transactions')
            .set('Authorization', 'Bearer ' + token)
            .send(transaction)
            .end((err2, res2) => {
              expect(res2.status).to.equal(403);
              expect(res2.text).to.equal("Sender and Receiver Account are identical!");

              done();
            });
        });
    });

    it('it should generate a tan', (done) => {

      let transaction = {
        value: 100,
        date: new Date(),
        ibanSender: "AT55 7989 9877 9879",
        ibanReceiver: "AT55 2189 1241 0275",
        paymentReference: "Ich need test money",
        category: "Test",
        tan: null
      };

      //First login
      process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
      chai.request(server)
        .post('/api/token')
        .send({username: 'max.mustermann', password: 'password'})
        .end((err, res) => {
          expect(res.status).to.equal(201);
          expect(res.body).to.have.property("id_token");

          //retrieve token, so that we are logged in
          let token = res.body.id_token;

          UserDAO
            .getByUsername("max.mustermann")
            .then((max) => {
              expect(max).to.be.defined;
              expect(max).to.have.property("bankAccount");
              expect(max.bankAccount.nexttan).to.be.undefined;

              chai.request(server)
                .post('/api/protected/transactions')
                .set('Authorization', 'Bearer ' + token)
                .send(transaction)
                .end((err2, res2) => {
                  expect(res2.status).to.equal(200);


                  UserDAO
                    .getByUsername("max.mustermann")
                    .then((max) => {
                      expect(max).to.be.defined;
                      expect(max).to.have.property("bankAccount");
                      let bank = max.bankAccount;

                      expect(max.bankAccount.nexttan).to.not.be.undefined;
                      expect(max.bankAccount.nexttan).to.not.be.null;

                      done();
                    })
                    .catch((err) => {
                      console.log(err);
                      expect(true).to.be.false; // should not come here
                    });
                });
            })
            .catch((err) => {
              console.log(err);
              expect(true).to.be.false; // should not come here
            });
        });
    });
  });

  describe("execute transaction", () => {

    it('it should throw error, no 0 Transactions allowed (with TAN)', (done) => {

      let transaction = {
        value: 0,
        date: new Date(),
        ibanSender: "AT55 7989 9877 9879",
        ibanReceiver: "AT55 2189 1241 0275",
        paymentReference: "Ich need test money",
        category: "Test",
        tan: "testtan"
      };

      //First login
      process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
      chai.request(server)
        .post('/api/token')
        .send({username: 'max.mustermann', password: 'password'})
        .end((err, res) => {
          expect(res.status).to.equal(201);
          expect(res.body).to.have.property("id_token");

          //retrieve token, so that we are logged in
          let token = res.body.id_token;

          chai.request(server)
            .post('/api/protected/transactions')
            .set('Authorization', 'Bearer ' + token)
            .send(transaction)
            .end((err2, res2) => {
              expect(res2.status).to.equal(400);
              expect(res2.text).to.equal("No negative Transactions allowed");

              done();
            });
        });
    });

    it('it should throw error, no negative Transactions allowed (with TAN)', (done) => {

      let transaction = {
        value: -100,
        date: new Date(),
        ibanSender: "AT55 7989 9877 9879",
        ibanReceiver: "AT55 2189 1241 0275",
        paymentReference: "Ich need test money",
        category: "Test",
        tan:"testtan"
      };

      //First login
      process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
      chai.request(server)
        .post('/api/token')
        .send({username: 'max.mustermann', password: 'password'})
        .end((err, res) => {
          expect(res.status).to.equal(201);
          expect(res.body).to.have.property("id_token");

          //retrieve token, so that we are logged in
          let token = res.body.id_token;

          chai.request(server)
            .post('/api/protected/transactions')
            .set('Authorization', 'Bearer ' + token)
            .send(transaction)
            .end((err2, res2) => {
              expect(res2.status).to.equal(400);
              expect(res2.text).to.equal("No negative Transactions allowed");

              done();
            });
        });
    });

    it('it should throw error, receiver IBAN not found (with TAN)', (done) => {

      let transaction = {
        value: 100,
        date: new Date(),
        ibanSender: "AT55 7989 9877 9879",
        ibanReceiver: "undefined",
        paymentReference: "Ich need test money",
        category: "Test",
        tan:"testtan"
      };

      //First login
      process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
      chai.request(server)
        .post('/api/token')
        .send({username: 'max.mustermann', password: 'password'})
        .end((err, res) => {
          expect(res.status).to.equal(201);
          expect(res.body).to.have.property("id_token");

          //retrieve token, so that we are logged in
          let token = res.body.id_token;

          chai.request(server)
            .post('/api/protected/transactions')
            .set('Authorization', 'Bearer ' + token)
            .send(transaction)
            .end((err2, res2) => {
              expect(res2.status).to.equal(404);
              expect(res2.text).to.equal("Wrong IBAN or Username!");

              done();
            });
        });
    });

    it('it should throw error, sender and reciever IBAN are identical (with TAN)', (done) => {

      let transaction = {
        value: 100,
        date: new Date(),
        ibanSender: "AT55 7989 9877 9879",
        ibanReceiver: "AT55 7989 9877 9879",
        paymentReference: "Ich need test money",
        category: "Test",
        tan:"testtan"
      };

      //First login
      process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
      chai.request(server)
        .post('/api/token')
        .send({username: 'max.mustermann', password: 'password'})
        .end((err, res) => {
          expect(res.status).to.equal(201);
          expect(res.body).to.have.property("id_token");

          //retrieve token, so that we are logged in
          let token = res.body.id_token;

          chai.request(server)
            .post('/api/protected/transactions')
            .set('Authorization', 'Bearer ' + token)
            .send(transaction)
            .end((err2, res2) => {
              expect(res2.status).to.equal(403);
              expect(res2.text).to.equal("Sender and Receiver Account are identical!");

              done();
            });
        });
    });

    it('it should execute transaction with given tan', (done) => {

      let transaction = {
        value: 100,
        date: new Date(),
        ibanSender: "AT55 7989 9877 9879",
        ibanReceiver: "AT55 2189 1241 0275",
        paymentReference: "Ich need test money",
        category: "Test",
        tan: "TESTTAN1"
      };

      //First login
      process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
      chai.request(server)
        .post('/api/token')
        .send({username: 'max.mustermann', password: 'password'})
        .end((err, res) => {
          expect(res.status).to.equal(201);
          expect(res.body).to.have.property("id_token");

          //retrieve token, so that we are logged in
          let token = res.body.id_token;

          UserDAO
            .getByUsername("max.mustermann")
            .then((max) => {
              expect(max).to.be.defined;
              expect(max).to.have.property("bankAccount");
              expect(max.bankAccount.nexttan).to.be.undefined;
              expect(max.bankAccount.transactions.length).to.be.equal(3);

              //Set Tan and save
              max.bankAccount.nexttan = "TESTTAN1";
              max.save();

              chai.request(server)
                .post('/api/protected/transactions')
                .set('Authorization', 'Bearer ' + token)
                .send(transaction)
                .end((err2, res2) => {
                  expect(res2.status).to.equal(200);


                  UserDAO
                    .getByUsername("max.mustermann")
                    .then((max) => {
                      expect(max).to.be.defined;
                      expect(max).to.have.property("bankAccount");

                      //New Transaction is in DB
                      expect(max.bankAccount.transactions.length).to.be.equal(4);

                      done();
                    })
                    .catch((err) => {
                      console.log(err);
                      expect(true).to.be.false; // should not come here
                    });
                });
            })
            .catch((err) => {
              console.log(err);
              expect(true).to.be.false; // should not come here
            });
        });
    });

    it('it should throw error, wrong tan', (done) => {

      let transaction = {
        value: 100,
        date: new Date(),
        ibanSender: "AT55 7989 9877 9879",
        ibanReceiver: "AT55 2189 1241 0275",
        paymentReference: "Ich need test money",
        category: "Test",
        tan: "wrong tan"
      };

      //First login
      process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
      chai.request(server)
        .post('/api/token')
        .send({username: 'max.mustermann', password: 'password'})
        .end((err, res) => {
          expect(res.status).to.equal(201);
          expect(res.body).to.have.property("id_token");

          //retrieve token, so that we are logged in
          let token = res.body.id_token;

          UserDAO
            .getByUsername("max.mustermann")
            .then((max) => {
              expect(max).to.be.defined;
              expect(max).to.have.property("bankAccount");
              expect(max.bankAccount.nexttan).to.be.undefined;
              expect(max.bankAccount.transactions.length).to.be.equal(3);

              //Set Tan and save
              max.bankAccount.nexttan = "TESTTAN1";
              max.save();

              chai.request(server)
                .post('/api/protected/transactions')
                .set('Authorization', 'Bearer ' + token)
                .send(transaction)
                .end((err2, res2) => {
                  expect(res2.status).to.equal(403);
                  expect(res2.text).to.equal("Wrong TAN!");

                  done();
                });
            })
            .catch((err) => {
              console.log(err);
              expect(true).to.be.false; // should not come here
            });
        });
    });

  });

})

