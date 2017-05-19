import mongoose from "mongoose";
import UserDAO from "../../../server/api/dao/userDAO";
import {expect} from "chai";
import {setupMongoose, createUserAndAccounts} from "../_helpers/db";

let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../../../server/server');

chai.use(chaiHttp);

describe("/POST Transactions: ", () => {

  it('transaction value invalid', (done) => {

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
          .send({value: '-20'})
          .end((err2, res2) => {
            expect(res2.status).to.equal(400);
            done();
          });
      });
  });

});
