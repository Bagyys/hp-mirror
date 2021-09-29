const expect = require("chai").expect;
const mongoose = require("mongoose");
const sinon = require("sinon");

const { User } = require("../../models/userModel");
const LoadUser = require("../../controllers/user/loadUser");

let sandbox = null;

describe("User Controller - Load User", function () {
  const req = {
    body: {
      userId: "613b097e3b4f1bd1586b573a",
      // email: "cabe957e1b41a55e47d5e4e459d44b3e",
    },
  };

  const res = {
    message: null,
    user: null,
    statusCode: null,
    json: function (data) {
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
          email: "cabe957e1b41a55e47d5e4e459d44b3e",
          password: "tester",
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

  it("should send a response with valid user and without error message", function (done) {
    sandbox.spy(res, "json");
    sandbox.spy(res, "status");
    LoadUser.loadUser(req, res)
      .then(() => {
        expect(res.message).not.equal("No user was found");
        expect(res.user).to.exist;
        expect(res).does.not.have.property("statusCode", 400);
        expect(res.json.callCount).to.be.equal(1);

        done();
      })
      .catch(done);
  });

  it("should throw an error 400 and error message, if accesing fails", function (done) {
    sandbox.spy(res, "json");
    sandbox.spy(res, "status");
    sandbox.stub(User, "findById").throws();
    LoadUser.loadUser(req, res)
      .then(() => {
        expect(res).has.property("statusCode", 400);
        expect(res.message).to.equal("Error");
        expect(res.user).to.be.undefined;
        expect(res.status.callCount).equals(1);
        done();
      })
      .catch(done);
  });

  it("should send a message 'no user was found', if user does not exist", function (done) {
    sandbox.spy(res, "json");
    sandbox.spy(res, "status");
    sandbox.stub(User, "findById").returns(Promise.resolve(false));
    LoadUser.loadUser(req, res)
      .then(() => {
        expect(res.message).to.equal("No user was found");
        expect(res.json.callCount).to.be.equal(1);
        expect(res.status.callCount).to.be.equal(0);
        done();
      })
      .catch(done);
  });
});
