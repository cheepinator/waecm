/*import mongoose from "mongoose";
import UserDAO from "../../../server/api/dao/userDAO";
import {setupMongoose, createUserAndAccounts} from "../_helpers/db";

let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../../../server/server');
chai.use(chaiHttp);

describe("accountController", () => {
  before(() => {
    setupMongoose(mongoose);
  });

  afterEach((done) => {
    UserDAO.remove({}, () => done());
  })

  describe("/GET getAccountByUser", () => {
    beforeEach((done) => {
      createUserAndAccounts()
        .then(() => done())
        .catch(() => done());
    })

      it('it should GET all the Accounts of the user', (done) => {

        let _onSuccess = todos => {
          expect(todos).to.be.defined;
          expect(todos[0]).to.have.property("username").and.to.equal("aaaaaaa0");
          expect(todos[0]).to.have.property("createdAt").and.to.be.defined;

          done();
        }

        let _onError = (err) => {
          expect(true).to.be.false; // should not come here
        }

        chai.request(server)
          .get('/book')
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('array');
            res.body.length.should.be.eql(0);
            done();
          });
      });

    it("should get all todos", (done) => {
      let _onSuccess = todos => {
        expect(todos).to.be.defined;
        expect(todos[0]).to.have.property("username").and.to.equal("aaaaaaa0");
        expect(todos[0]).to.have.property("createdAt").and.to.be.defined;

        done();
      }

      let _onError = (err) => {
        expect(true).to.be.false; // should not come here
      }

      TodoDAO
        .getAll()
        .then(_onSuccess)
        .catch(_onError);
    })
  })

})

*/
