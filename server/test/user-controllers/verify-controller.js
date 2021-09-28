// const expect = require("chai").expect;
// const sinon = require("sinon");
// const mongoose = require("mongoose");

// const { User } = require("../../models/userModel");
// const VerifyController = require("../../controllers/user/verify");

// let sandbox=null;

// describe("it should verify user successfully", function(){
// req = {
//   // params: {
//   //   verifyToken:

//   // },
// };

// const res = {
//     message: undefined,
//     user: undefined,
//     statusCode: undefined,
//     json: function (data) {
//       this.user = data.user;
//       this.message = data.message
//     },
//     status: function (code) {
//       this.statusCode = code;
//       return this;
//     },
//   };

//   beforeEach(function (done) {
//     sandbox=sinon.createSandbox()
//     mongoose
//       .connect(
//         "mongodb+srv://user1:l3kJif2TwBYcfwUE@test-cluster.5gddu.mongodb.net/test-project?retryWrites=true&w=majority"
//       )
//       .then(() => {
//         const user = new User({
//           isVerified: true,
//           email: "test@test.com",
//           password:
//             "$2b$10$blH5Z.HfuBC301g6wV.3deGG4a5PqUzjV2D5rMBSJ3xjG4MwhyBIu",

//         });
//         return user.save();
//       });
//     done();
//     // .catch(done);
//   });

//   afterEach(function (done) {
//     sandbox.restore();
//     User.deleteMany({})
//       .then(() => {
//         return mongoose.disconnect();
//       })
//       .then(() => {
//         done();
//       })
//     .catch(done);
//   });

//   it("should verify user", function(done){
//     sandbox.spy(res, "json");
//     VerifyController.verify(req, res).then(()=>{
//       console.log(res);
//       done()
//     }).catch(done)
//   })

// })
