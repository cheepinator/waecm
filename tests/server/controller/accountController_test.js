import mongoose from "mongoose";
import UserDAO from "../../../server/api/dao/userDAO";
import {expect} from "chai";
import {setupMongoose, createUserAndAccounts} from "../_helpers/db";

let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../../../server/server');

chai.use(chaiHttp);

describe("token", () => {
  before(() => {
    setupMongoose(mongoose);
  });

  afterEach((done) => {
    UserDAO.remove({}, () => done());
  })

  describe("/GET accountByUsername", () => {

    it('it should get the Account by Username and first login', (done) => {

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
            .get('/api/protected/account')
            .set('Authorization', 'Bearer '+token)
            .send({username: 'max.mustermann'})
            .end((err2, res2) => {
              expect(res2.status).to.equal(200);
              expect(res2.body).to.have.property("balance");
              expect(res2.body).to.have.property("iban");
              expect(res2.body.iban).to.equals("AT55 7989 9877 9879"); //IBAN of max.mustermann

              done();
            });
        });
    });

    it('it should get authentication error 401', (done) => {

      process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

      //retrieve token, so that we are logged in
      let token = "wrongtoken";

      chai.request(server)
        .get('/api/protected/account')
        .set('Authorization', 'Bearer ' + token)
        .end((err2, res2) => {
          expect(res2.status).to.equal(401);
          expect(res2.body).to.not.have.property("balance");
          expect(res2.body).to.not.have.property("iban");

          done();
        });
    });

    it('it should get max.mustermann\'s account even if another username is passed because of the parameter', (done) => {

      //Login first
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
            .get('/api/protected/account')
            .set('Authorization', 'Bearer '+token)
            .send({user:{username: 'user'}})
            .end((err2, res2) => {
              expect(res2.status).to.equal(200);
              expect(res2.body).to.have.property("balance");
              expect(res2.body).to.have.property("iban");
              expect(res2.body.iban).to.equals("AT55 7989 9877 9879"); //IBAN of max.mustermann

              done();
            });
        });
    });
  });

})

