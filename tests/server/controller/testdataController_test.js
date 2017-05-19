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


  describe("/POST token to check Testdata", () => {

    it('it should insert testdata', (done) => {
      //Check users DB = 0 entries
      UserDAO
        .getAllUsers()
        .then((users) => {
          expect(users).to.be.defined;
          expect(users.length).to.equals(0);

          chai.request(server)
            .post('/api/testData')
            .end((err, res) => {
              expect(res.status).to.equal(200);

              // Check the insert of the testdata
              UserDAO
                .getAllUsers()
                .then((users2) => {
                  expect(users2).to.be.defined;
                  expect(users2.length).to.equals(3);
                  done();
                })
                .catch((err) => {
                  expect(true).to.be.false; // should not come here
                });
            });
        })
        .catch((err) => {
          expect(true).to.be.false; // should not come here
        });
    });
  });

  describe("/POST token to check Testdata", () => {

    it('it should insert testdata on login, if no users are in the DB', (done) => {
      //Check users DB = 0 entries
      UserDAO
      .getAllUsers()
      .then((users) => {
        expect(users).to.be.defined;
        expect(users.length).to.equals(0);

        chai.request(server)
          .post('/api/token')
          .send({username: 'max.mustermann', password: 'password'})
          .end((err, res) => {
            expect(res.status).to.equal(201);
            expect(res.body).to.have.property("id_token");

            //retrieve token, so that we are logged in
            let token = res.body.id_token;

            // Check the insert of the testdata
            UserDAO
              .getAllUsers()
              .then((users2) => {
                expect(users2).to.be.defined;
                expect(users2.length).to.equals(3);
                done();
              })
              .catch((err) => {
                expect(true).to.be.false; // should not come here
              });
          });
      })
      .catch((err) => {
        expect(true).to.be.false; // should not come here
      });
    });
  });


})

