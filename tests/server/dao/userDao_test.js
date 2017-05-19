import mongoose from "mongoose";
import UserDAO from "../../../server/api/dao/userDAO";
import {expect} from "chai";
import {setupMongoose, createUserAndAccounts} from "../_helpers/db";

describe("userDAO", () => {

  before(() => {
    setupMongoose(mongoose);
  });

  afterEach((done) => {
    UserDAO.remove({}, () => done());
    //done();
  })


  describe("getAllUsers", () => {

    beforeEach((done) => {
      createUserAndAccounts()
        .then(() => { done();})
        .catch(() => { done();});
    })

    it("should get all users", (done) => {
      let _onSuccess = users => {
        expect(users).to.be.defined;

        for (let i = 0; i < 10; i++) {
          expect(users[i]).to.have.property("username").and.to.contain("user");
          expect(users[i]).to.have.property("password").and.to.equal("password");
          expect(users[i]).to.have.property("firstName").and.to.contain("Max");
          expect(users[i]).to.have.property("lastName").and.to.contain("Muster");
          expect(users[i]).to.have.property("phoneNumber").and.to.contain("0123456789");
          //expect(users[i]).to.have.property("bankAccount").and.to.be.defined;
        }

        done();
      }

      let _onError = (err) => {
        console.log(err);
        expect(true).to.be.false; // should not come here
      }

      UserDAO
        .getAllUsers()//.then(() => console.log("TEST"), (users) => console.log(users))
        .then(_onSuccess)
        .catch(_onError);


    })
  })

  describe("getByUsername", () => {

    beforeEach((done) => {
      createUserAndAccounts()
        .then(() =>  done())
        .catch(() => done());
    })

    it("should get user", (done) => {
      let _onSuccess = user => {
        expect(user).to.be.defined;

        expect(user.username).to.equal("user0");
        expect(user.password).to.equal("password");
        expect(user.firstName).to.equal("Max0");
        expect(user.lastName).to.equal("Muster0");
        expect(user.phoneNumber).and.to.equal("01234567890");
        expect(user.bankAccount).and.to.be.defined;

        done();
      }

      let _onError = (err) => {
        done();
        expect(true).to.be.false; // should not come here
      }

      UserDAO
        .getByUsername("user0")//.then(() => console.log("TEST"), (users) => console.log(users))
        .then(_onSuccess)
        .catch(_onError);
    });

    it("should throw exception due to invalid username", (done) => {
      let _onSuccess = user => {
        expect(true).to.be.false;
      }

      let _onError = (err) => {
        expect(err).to.be.defined;
        done();
      }

      UserDAO
        .getByUsername("user000")
        .then(_onSuccess)
        .catch(_onError);
    });

  })

  describe("getByIBAN", () => {

    beforeEach((done) => {
      createUserAndAccounts()
        .then(() =>  done())
        .catch(() => done());
    })

    it("should get user", (done) => {
      let _onSuccess = user => {
        expect(user).to.be.defined;

        expect(user.username).to.equal("user0");
        expect(user.password).to.equal("password");
        expect(user.firstName).to.equal("Max0");
        expect(user.lastName).to.equal("Muster0");
        expect(user.phoneNumber).and.to.equal("01234567890");
        expect(user.bankAccount).and.to.be.defined;

        done();
      }

      let _onError = (err) => {
        console.log(err);
        expect(true).to.be.false; // should not come here
      }

      UserDAO
        .getByIBAN("IBAN0")//.then(() => console.log("TEST"), (users) => console.log(users))
        .then(_onSuccess)
        .catch(_onError);
    })

    it("should throw exception due to invalid iban", (done) => {
      let _onSuccess = user => {
        expect(true).to.be.false;
      }

      let _onError = (err) => {
        expect(err).to.be.defined;
        done();
      }

      UserDAO
        .getByIBAN("IBAN000")//.then(() => console.log("TEST"), (users) => console.log(users))
        .then(_onSuccess)
        .catch(_onError);
    })

  })

  describe("createUser", () => {
    it("should throw an error, object passed is not defined", (done) => {
      let _undefinedUser = undefined;

      let _onSuccess = () => {
        expect(true).to.be.false; // should not come here;
      }

      let _onError = error => {
        expect(error).to.be.defined;

        done();
      }

      UserDAO
        .createUser(_undefinedUser)
        .then(_onSuccess)
        .catch(_onError);
    })

    it("should create the user correctly", (done) => {
      let _user = {
        username: 'user',
        password: 'password',
        firstName: 'Max',
        lastName: 'Muster',
        phoneNumber: '0123456789'
      };

      let _onSuccess = user => {
        expect(user).to.be.defined;
        expect(user.username).to.equal("user");
        expect(user.password).to.equal("password");
        expect(user.firstName).to.equal("Max");
        expect(user.lastName).to.equal("Muster");
        expect(user.phoneNumber).and.to.equal("0123456789");
        expect(user.bankAccount).and.to.be.undefined;


        done();
      }

      let _onError = () => {
        expect(true).to.be.false;
      }

      UserDAO
        .createUser(_user)
        .then(_onSuccess)
        .catch(_onError);
    })
  })
/*
  describe("deleteTodo", () => {
    beforeEach((done) => {
      createTodos()
        .then(() => done())
        .catch(() => done());
    })

    it("should get an error back, id is not defined", (done) => {
      let _id = null;

      let _onSuccess = () => {
        expect(true).to.be.false;
      }

      let _onError = error => {
        expect(error).to.be.defined;

        done();
      }

      TodoDAO
        .deleteTodo(_id)
        .then(_onSuccess)
        .catch(_onError);
    })

    it("should delete the doc successfully", (done) => {
      let _id = "507c7f79bcf86cd7994f6c10";

      let _onSuccess = () => {
        expect(true).to.be.true;

        done();
      }

      let _onError = () => {
        expect(true).to.be.false;
      }

      TodoDAO
        .deleteTodo(_id)
        .then(_onSuccess)
        .catch(_onError);
    })
  })*/
})
