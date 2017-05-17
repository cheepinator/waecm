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

  describe("/POST CreateUsers", () => {

    it('it should create user and get token', (done) => {

      process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
      chai.request(server)
        .post('/api/users')
        .send({username: 'user100', password: 'password'})
        //.send({username: 'user0', password: '5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8'})
        .end((err, res) => {
          expect(res.status).to.equal(201);
          expect(res.body).to.have.property("id_token");

          // Check User is in database
          UserDAO.getByUsername('user100').then((user) => {
            expect(user).to.be.defined;
            expect(user.username).to.equal("user100");
            expect(user.password).to.equal("password");

            done();
          });
        });
    });

    it('it should know the GET method', (done) => {

      process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
      chai.request(server)
        .get('/api/users')
        .end((err, res) => {
          expect(res.status).to.equal(404);
          expect(res.body).to.not.have.property("id_token");

            done();
        });
    });
  });

  describe("/POST Token", () => {

    it('it should validate login return token', (done) => {

        process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
        chai.request(server)
          .post('/api/token')
          .send({username: 'max.mustermann', password: 'password'})
          .end((err, res) => {
            expect(res.status).to.equal(201);
            expect(res.body).to.have.property("id_token");

            done();
          });
    });

    it('it should not login with wrong credentials', (done) => {

      process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
      chai.request(server)
        .post('/api/token')
        .send({username: 'unknown', password: 'unknown'})
        .end((err, res) => {
          expect(res.status).to.equal(401);
          expect(res.body).to.not.have.property("id_token");

          done();
        });
    });

    it('it should not login with valid username but wrong passowrd', (done) => {

      process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
      chai.request(server)
        .post('/api/token')
        .send({username: 'max.mustermann', password: 'unknown'})
        .end((err, res) => {
          expect(res.status).to.equal(401);
          expect(res.body).to.not.have.property("id_token");

          done();
        });
    });
  });

})

