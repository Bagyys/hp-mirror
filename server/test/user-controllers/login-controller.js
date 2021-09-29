const expect = require("chai").expect;
const sinon = require("sinon");
const mongoose = require("mongoose");
const { User } = require("../../models/userModel");
const LoginController = require("../../controllers/user/login");
const bcrypt = require("bcrypt");

let sandbox = null;

describe("User Controller - Login", function () {
  let req = {
    body: {
      email: "test@test.com",
      password: "12345678",
    },
  };

  let res = {
    token: undefined,
    user: undefined,
    message: undefined,
    json: function (data) {
      this.token = data.token;
      this.user = data.user;
      this.message = data.message;
    },
    status: function (code) {
      this.statusCode = code;
      return this;
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
          email: "7a51ffefebfe35684b2c979e658e84b9",
          password:
            "$2b$10$blH5Z.HfuBC301g6wV.3deGG4a5PqUzjV2D5rMBSJ3xjG4MwhyBIu",
        });
        return user.save();
      })
      .then(() => {
        done();
      })
      .catch(done);
  });

  afterEach(function (done) {
    sandbox.restore();
    User.deleteMany({})
      .then(() => {
        return mongoose.disconnect();
      })
      .then(() => {
        done();
      });
  });

  it("should login successfully if providing correct email and password", function (done) {
    sandbox.spy(res, "json");
    sandbox.spy(res, "status");
    LoginController.login(req, res)
      .then(() => {
        expect(res.message).to.be.undefined;
        expect(res.user).to.exist;
        expect(res.user.email).equal(req.body.email);
        expect(res.json.callCount).equal(1);
        done();
      })
      .catch(done);
  });

  it("should send message 'there is no user with this email' if there no such user in db", function (done) {
    sandbox.spy(res, "json");
    sandbox.spy(res, "status");
    sandbox.stub(User, "findOne").returns(Promise.resolve(false));
    LoginController.login(req, res)
      .then(() => {
        expect(res.message).to.be.equal("There is no user with this email");
        expect(res.token, res.user).to.be.undefined;
        expect(res.json.callCount).to.equal(1);
        done();
      })
      .catch(done);
  });

  it("should send message 'incorrect password or email', when providing incorrect password", function (done) {
    sandbox.spy(res, "json");
    sandbox.spy(res, "status");
    sandbox.stub(bcrypt, "compare").returns(Promise.resolve(false));
    LoginController.login(req, res)
      .then(() => {
        expect(res.message).to.be.equal("Incorrect password or email");
        expect(res.user, res.token).to.be.undefined;
        expect(res.json.callCount).to.equal(1);
        done();
      })
      .catch(done);
  });

  it("should catch error, if something goes wrong", function(done) {
    sandbox.spy(res, "json");
    sandbox.spy(res, "status");
    sandbox.stub(bcrypt, "compare").throws();
    LoginController.login(req, res).then(()=>{
      expect(res.message).to.be.equal("Error");
      expect(res.user, res.token).to.be.undefined;
      expect(res.json.callCount).to.equal(1);
      done();
    }).catch (done);
  });

  it("should throw an error 400 and error message, if accesing fails", function (done) {
    sandbox.stub(User, "findOne").throws();
    sandbox.spy(res, "json");
    sandbox.spy(res, "status");
    LoginController.login(req, res)
      .then(() => {
        expect(res.status.callCount).to.equal(1);
        expect(res).to.have.property("statusCode", 400);
        expect(res.message).to.be.equal("Error");
        expect(res.token, res.user).to.be.undefined;
        expect(res.json.callCount).to.equal(1);
        expect(res.status.callCount).to.equal(1);
        done();
      })
      .catch(done);
  });
});
