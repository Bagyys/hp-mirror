const expect = require("chai").expect;
const sinon = require("sinon");
const mongoose = require("mongoose");
const { encrypt } = require("../../utils/encryption");
const faker = require("faker");
const xss = require("xss");

const { User } = require("../../models/userModel");
const SendVerify = require("../../controllers/user/sendVerify");

let sandbox = null;

// ar veiks po to, kai bus sutvarkytas email verification send?
describe("SendVerify controller - sendVerify", function () {
  const req = {
    body: {
      email: "test@test.com",
      password: "12345678",
    },
  };

  const res = {
    user: undefined,
    message: undefined,
    statusCode: undefined,
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
          email: "7a51ffefebfe35684b2c979e658e84b9",
          password:
            "$2b$10$blH5Z.HfuBC301g6wV.3deGG4a5PqUzjV2D5rMBSJ3xjG4MwhyBIu",
          name: "Test",
          activeReservations: [],
          pastReservations: [],
          canceledReservations: [],
          favorites: [],
          _id: "613b097e3b4f1bd1586b573a",
          isVerified: false,
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
      })
      .catch(done);
  });

  // it("should check xss email", function (done) {
  //   sandbox.spy(res, "json");
  //   sandbox.stub().returns(Promise.resolve());
  //   SendVerify.sendVerify(req, res)
  //     .then(() => {
  //       console.log("res ");
  //       console.log(res);
  //       done();
  //     })
  //     .catch(done);
  // });

  it("should check if user exists but does not verified", function (done) {
    sandbox.spy(res, "json");
    SendVerify.sendVerify(req, res)
      .then(() => {
        expect(res.message).to.be.undefined;
        expect(res.user).to.exist;
        expect(res.json.callCount).equals(1);
        done();
      })
      .catch(done);
  });

  it("should show message 'User does not exist' if 'isVerified:false'", function (done) {
    sandbox.spy(res, "json");

    sandbox.stub(User, "findOne").returns(Promise.resolve(false));

    SendVerify.sendVerify(req, res)
      .then(() => {
        expect(res.message).equals("User does not exist");
        expect(res.user).equals(false);
        expect(res.json.callCount).equals(1);
        done();
      })
      .catch(done);
  });

  it("should show message 'User is already verified' if 'isVerified:true'", function (done) {
    sandbox.spy(res, "json");
    sandbox
      .stub(User, "findOne")
      .returns(Promise.resolve({ isVerified: true }));
    SendVerify.sendVerify(req, res)
      .then(() => {
        expect(res.message).equals("User is already verified");
        expect(res.json.callCount).equals(1);
        done();
      })
      .catch(done);
  });

  it("should throw an error message, if accessing fails", function (done) {
    sandbox.stub(User, "findOne").throws();
    SendVerify.sendVerify(req, res)
      .then(() => {
        expect(res.message).to.be.equal("Error");
        expect(res.token, res.user).to.be.undefined;
        expect(res.statusCode).to.be.equal(400);
        done();
      })
      .catch(done);
  });
});
