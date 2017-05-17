import mongoose from "mongoose";
import UserDAO from "../../../../server/api/dao/userDAO";
import {expect} from "chai";
import {setupMongoose, createUserAndAccounts} from "../../_helpers/db";

describe("userDAO", () => {

  before(() => {
    setupMongoose(mongoose);
  });

  afterEach((done) => {
    UserDAO.remove({}, () => done());
    //done();
  })


  describe("getAll", () => {

    beforeEach((done) => {
      console.log("test before each");
      createUserAndAccounts()
        .then(() => {console.log("THEN"); done();})
        .catch(() => {console.log("ERROR"); done();});
    })

    it("should get all users", (done) => {
      let _onSuccess = users => {
        console.log("TEST IT");
        console.log(users)
        expect(users).to.be.defined;

        for (let i = 0; i < 1; i++) {
          expect(users[i]).to.have.property("username").and.to.equal("userddd"+i);
          expect(users[i]).to.have.property("password").and.to.equal("password"+i);
          expect(users[i]).to.have.property("firstName").and.to.equal("Max"+i);
          expect(users[i]).to.have.property("lastName").and.to.equal("Mustersssd"+i);
          expect(users[i]).to.have.property("phoneNumber").and.to.equal("0123456789"+i);
          expect(users[i]).to.have.property("bankAccount").and.to.be.defined;
        }

        done();
      }

      let _onError = (err) => {
        done();
        expect(true).to.be.false; // should not come here
      }

      console.log("TEST");
      UserDAO
        .getAllUsers()//.then(() => console.log("TEST"), (users) => console.log(users))
        .then(_onSuccess)
        .catch(_onError);


    })
  })

  describe("getByUsername", () => {

    beforeEach((done) => {
      console.log("test before each");
      createUserAndAccounts()
        .then(() => {console.log("THEN"); done();})
        .catch(() => {console.log("ERROR"); done();});
    })

    it("should get user", (done) => {
      let _onSuccess = user => {
        console.log("TEST IT");
        console.log(user)
        expect(user).to.be.defined;

        expect(user.username).to.equal("user0");
        expect(user.password).to.equal("password0");
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

      console.log("TEST Start");
      UserDAO
        .getByUsername("user0")//.then(() => console.log("TEST"), (users) => console.log(users))
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
        expect(user.lastName).to.equal("Mustersssd");
        expect(user.phoneNumber).and.to.equal("0123456789");
        expect(user.bankAccount).and.to.be.undefined;

        console.log("TEST GEHT");

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
