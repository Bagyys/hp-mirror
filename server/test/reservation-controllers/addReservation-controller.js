// const expect = require("chai").expect;
// const mongoose = require("mongoose");
// const sinon = require("sinon");
// const { newReservation } = require("../../controllers/mail/newReservation");

// const { User } = require("../../models/userModel");
// const { Property } = require("../../models/propertyModel");
// const { Reservation } = require("../../models/reservationModel");

// const AddReservationController = require("../../controllers/reservation/addReservation");

// let sandbox = null;
// let property;

// // PROBLEMATISKAS
// describe("Reservation controller - addReservation", function () {
//   const req = {
//     body: {
//       email: "test@test.com",
//       userId: "614c3b567d3a993b545ccff7",
//       propertyId: "613b097e3b4f1bd1586b573a",
//       residents: 1,
//       price: 50,
//       startDate: "2021-09-30T01:00:00.000Z",
//       endDate: "2021-09-30T21:00:00.000Z",
//       timeZone: "Europe/Berlin",
//       occupiedTime: [
//         {
//           date: "2021-09-30",
//           isRented: true,
//           hours: {
//             0: false,
//             1: false,
//             2: false,
//             3: false,
//             4: false,
//             5: false,
//             6: false,
//             7: true,
//             8: true,
//             9: true,
//             10: true,
//             11: true,
//             12: true,
//             13: true,
//             14: true,
//             15: true,
//             16: true,
//             17: true,
//             18: true,
//             19: true,
//             20: false,
//             21: false,
//             22: false,
//             23: false,
//           },
//         },
//       ],
//     },
//   };

//   const res = {
//     reservation: undefined,
//     message: undefined,
//     send: function (data) {
//       this.reservation = data.reservation;
//       this.message = data.message;
//       return this;
//     },
//   };

//   beforeEach(function (done) {
//     sandbox = sinon.createSandbox();
//     mongoose
//       .connect(
//         "mongodb+srv://user1:l3kJif2TwBYcfwUE@test-cluster.5gddu.mongodb.net/test-project?retryWrites=true&w=majority"
//       )
//       .then(() => {
//         const user = new User({
//           email: "7a51ffefebfe35684b2c979e658e84b9",
//           password:
//             "$2b$10$b.m34zPkIYMalJ2Rdu6PsexFdgyIdXEaFE6kCDesxAy3A2GoICZwW",
//           name: "Test",
//           activeReservations: [],
//           pastReservations: [],
//           canceledReservations: [],
//           favorites: [],
//           _id: "614c3b567d3a993b545ccff7",
//         });
//         return user.save();
//       })
//       .then(() => {
//         property = new Property({
//           _id: "613b097e3b4f1bd1586b573a",
//           title: "test",
//           description: "lorem ipsum",
//           type: "apartment",
//           maxOccupants: 6,
//           location: {
//             country: "Lithuania",
//             city: "Klaipeda",
//             district: "NordEast",
//             zipcode: "91272",
//             addressString1: "K",
//             timeZone: "Europe/Vilnius",
//           },
//           rentType: "daily",
//           images: [],
//           price: {
//             isSeasonal: true,
//             seasonalPrices: [],
//           },
//           facilities: {
//             size: 70,
//             wifi: true,
//             parking: true,
//             petFriendly: true,
//             disabilityAccess: true,
//             kitchen: true,
//             airConditioning: true,
//             bathtub: true,
//             washingMachine: true,
//             balcony: true,
//             breakfast: true,
//             crib: true,
//             nonSmoking: true,
//             bathroomType: "private",
//             bathrooms: 2,
//             bedType: "twin",
//             beds: 2,
//             bedrooms: 1,
//           },
//           occupiedTime: [
//             {
//               dateString: "2021-06-01",
//               hours: {
//                 0: false,
//                 1: false,
//                 2: false,
//                 3: false,
//                 4: false,
//                 5: false,
//                 6: false,
//                 7: false,
//                 8: false,
//                 9: false,
//                 10: true,
//                 11: true,
//                 12: true,
//                 13: true,
//                 14: true,
//                 15: true,
//                 16: true,
//                 17: true,
//                 18: true,
//                 19: true,
//                 20: false,
//                 21: false,
//                 22: false,
//                 23: false,
//               },
//               isRented: true,
//               isWholeDayRented: false,
//             },
//           ],
//           ratings: [],
//           overallRating: 8,
//           ratingsCount: 0,
//         });
//         return property.save();
//       })
//       .then(() => {
//         done();
//       })
//       .catch(done);
//   });

//   afterEach(function (done) {
//     sandbox.restore();
//     Property.deleteMany({}).then(() => {
//       return mongoose.disconnect();
//     });
//     Reservation.deleteMany({}).then(() => {
//       return mongoose.disconnect();
//     });
//     User.deleteMany({})
//       .then(() => {
//         return mongoose.disconnect();
//       })
//       .then(() => {
//         done();
//       })
//       .catch(done);
//   });

//   // it("should create reservation", function (done) {
//   //   sandbox.spy(res, "send");
//   //   sandbox.stub(Reservation.prototype, "save").returns(Promise.resolve(false));
//   //   AddReservationController.addReservation(req, res)
//   //     .then(() => {
//   //       console.log("res");
//   //       console.log(res);
//   //       expect(res.send.callCount).equal(1);
//   //       done();
//   //     })
//   //     .catch(done);
//   // });

//   // need to check if user active resrvation array was updated (with added propertyId)...
//   it("should update user with active reservation", function (done) {
//     sandbox.spy(res, "send");
//     AddReservationController.addReservation(req, res)
//       .then(() => {
//         expect(res.reservation).to.exist;
//         expect(res.reservation.userId.toString()).equal(req.body.userId);
//         expect(res.send.callCount).equal(1);
//         expect(res.message).to.be.undefined;
//         done();
//       })
//       .catch(done);
//   });

//   it("should check if user wasn't updated", function (done) {
//     sandbox.spy(res, "send");
//     sandbox.stub(User, "findByIdAndUpdate").returns(Promise.resolve(false));
//     AddReservationController.addReservation(req, res)
//       .then(() => {
//         // console.log(res);
//         expect(res.send.callCount).equal(1);
//         expect(res.message).equals("User wasn't updated");
//         done();
//       })
//       .catch(done);
//   });

//   it("should catch an error when updating user", function (done) {
//     sandbox.spy(res, "send");
//     sandbox.stub(User, "findByIdAndUpdate").throws();
//     AddReservationController.addReservation(req, res).then(() => {
//       expect(res.reservation).to.be.undefined;
//       expect(res.message).equal("Error");
//       expect(res.send.callCount).equal(1);
//       done();
//     });
//   });

//   it("should send message 'no property was found', if property does not exists", function (done) {
//     sandbox.spy(res, "send");
//     sandbox.stub(Property, "findById").returns(Promise.resolve(false));
//     AddReservationController.addReservation(req, res).then(() => {
//       expect(res.message).equal("No property was found");
//       done()
//     });
//   });

//   it("should catch an error, when finding property by id", function (done) {
//     sandbox.spy(res, "send");
//     sandbox.stub(Property, "findById").throws();
//     AddReservationController.addReservation(req, res)
//       .then(() => {
//         expect(res.reservation).to.be.undefined;
//         expect(res.message).equal("Error");
//         expect(res.send.callCount).equal(1);
//         done();
//       })
//       .catch(done);
//   });

//   it("should catch an error, when finding and updating property by id", function (done) {
//     sandbox.spy(res, "send");
//     sandbox.stub(Property, "findByIdAndUpdate").throws();
//     AddReservationController.addReservation(req, res)
//       .then(() => {
//         expect(res.reservation).to.be.undefined;
//         expect(res.message).equal("Error");
//         expect(res.send.callCount).equal(1);
//         done();
//       })
//       .catch(done);
//   });

//   it("should send a message 'Property wasn't updated', when finding and updating property by id fails", function (done) {
//     sandbox.spy(res, "send");
//     sandbox.stub(Property, "findByIdAndUpdate").returns(Promise.resolve(false));
//     AddReservationController.addReservation(req, res)
//       .then(() => {
//         // expect(res.reservation).to.be.undefined;
//         expect(res.message).equal("Property wasn't updated");
//         expect(res.send.callCount).equal(1);
//         done();
//       })
//       .catch(done);
//   });





//   it("should throw an error", function (done) {
//     sandbox.spy(res, "send");
//     sandbox.stub(Reservation.prototype, "save").throws();
//     AddReservationController.addReservation(req, res)
//       .then(() => {
//         expect(res.reservation).to.be.undefined;
//         expect(res.message).equals("Error");
//         expect(res.send.calledOnce);
//         done();
//       })
//       .catch(done);
//   });
// });
