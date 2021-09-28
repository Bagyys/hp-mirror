const expect = require("chai").expect;
const mongoose = require("mongoose");
const sinon = require("sinon");
const bcrypt = require("bcrypt");

const { User } = require("../../models/userModel");
const RegisterController = require("../../controllers/user/register");

let sandbox = null;

describe("Register controller - register", function () {
  const req = {
    body: {
      email: "test@test.com",
      password: "12345678",
    },
  };

  const res = {
    token: undefined,
    user: undefined,
    message: undefined,
    json: function (data) {
      this.token = data.token;
      this.user = data.user;
      this.message = data.message;
    },
  };

  beforeEach(function (done) {
    sandbox = sinon.createSandbox();
    mongoose
      .connect(
        "mongodb+srv://user1:l3kJif2TwBYcfwUE@test-cluster.5gddu.mongodb.net/test-project?retryWrites=true&w=majority"
      )
      .then(() => {
        const user = new User({
          email: "ad27313d47ff19738a26e0a9ec8c89e9",
          password:
            "$2b$10$b.m34zPkIYMalJ2Rdu6PsexFdgyIdXEaFE6kCDesxAy3A2GoICZwW",
          name: "Test",
          activeReservations: [],
          pastReservations: [],
          canceledReservations: [],
          favorites: [],
          _id: "613b097e3b4f1bd1586b573a",
        });
        return user.save();
      })
      .then(() => {
        done();
      }).catch(done);
  });

  afterEach(function (done) {
    sandbox.restore();
    User.deleteMany({})
      .then(() => {
        return mongoose.disconnect();
      })
      .then(() => {
        done();
      }).catch(done);
  });

  it("should check if user does not exists and register user successfully", function (done) {
    sandbox.spy(res, "json");
    RegisterController.register(req, res).then(() => {
      expect(res.user.email).to.be.equal("test@test.com");
      expect(res.token).to.exist;
      expect(res.user).to.exist;
      expect(res.json.callCount).equals(1)
      done();
    }).catch(done);
  });

  it("should return a message 'There is a user registered with this email', if the user already exists", function (done) {
    sandbox.spy(res, "json");
    sandbox.stub(User, "findOne").returns(Promise.resolve(true));
    RegisterController.register(req, res)
      .then(() => {
        expect(res.message).to.be.equal(
          "There is a user registered with this email"
        );
        expect(res.token, res.user).to.be.undefined;
        expect(res.json.callCount).to.be.equal(1);
        done();
      }).catch(done);
  });

  it("should send a message 'Error' if password hashing fails??? :/ ", function (done) {
    sandbox.spy(res, "json");
    sandbox.stub(bcrypt, "hash").throws();
    RegisterController.register(req, res)
      .then(() => {
        expect(res.message).to.be.equal("Error");
        expect(res.token, res.user).to.be.undefined;
        expect(res.json.callCount).equals(1);
        done();
      })
      .catch(done);
  });

  it("should send a message 'An unexpected error occured' if hashedpassword not defined?? :/ ", (done) => {
    sandbox.spy(res, "json");
    sandbox.stub(bcrypt, "hash").returns(Promise.resolve(false));
    RegisterController.register(req, res)
      .then(() => {
        expect(res.message).to.be.equal("An unexpected error occured");
        expect(res.token, res.user).to.be.undefined;
        done();
      })
      .catch(done);
  });

  it("should throw an error message, if accessing fails", function (done) {
    sandbox.stub(User, "findOne").throws();
    RegisterController.register(req, res)
      .then(() => {
        expect(res.message).to.be.equal("Error");
        expect(res.token, res.user).to.be.undefined;
        done();
      })
      .catch(done);
  });
});
