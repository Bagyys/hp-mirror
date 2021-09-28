const expect = require("chai").expect;
const mongoose = require("mongoose");
const sinon = require("sinon");

const { Property } = require("../../models/propertyModel");
const GetOnePropertyController = require("../../controllers/property/getOneProperty");

let sandbox = null;

describe("getOneProperty", function () {
  const req = {
    params: {
      id: "613b097e3b4f1bd1586b573a",
    },
  };

  const res = {
    property: undefined,
    message: undefined,
    send: function (data) {
      this.property = data.property;
      this.message = data.message;
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
        const property = new Property({
          _id: "613b097e3b4f1bd1586b573a",
          title: "test",
          description: "lorem ipsum",
          type: "apartment",
          maxOccupants: 6,
          location: {
            country: "Lithuania",
            city: "Klaipeda",
            district: "NordEast",
            zipcode: "91272",
            addressString1: "K",
            timeZone: "Europe/Vilnius",
            cord: {
              lat: 123,
              lng: 123,
            },
          },
          rentType: "daily",
          images: [],
          price: {
            isSeasonal: true,
            seasonalPrices: [],
          },
          facilities: {
            size: 70,
            wifi: true,
            parking: true,
            petFriendly: true,
            disabilityAccess: true,
            kitchen: true,
            airConditioning: true,
            bathtub: true,
            washingMachine: true,
            balcony: true,
            breakfast: true,
            crib: true,
            nonSmoking: true,
            bathroomType: "private",
            bathrooms: 2,
            bedType: "twin",
            beds: 2,
            bedrooms: 1,
            terrace: true,
            healing: true,
            workspace: true,
          },
          occupiedTime: [],
          ratings: [],
          overallRating: 8,
          ratingsCount: 0,
          discount: {
            more1Week: true,
            more1Month: true,
          },
        });

        return property.save();
      })
      .then(() => {
        done();
      });
  });

  afterEach(function (done) {
    sandbox.restore();
    Property.deleteMany({})
      .then(() => {
        return mongoose.disconnect();
      })
      .then(() => {
        done();
      });
    // .catch(done);
  });

  it("should send a message 'property wasn't found' if property does not exists", function (done) {
    sandbox.spy(res, "send");
    sandbox.stub(Property, "findById").returns(Promise.resolve(false));
    GetOnePropertyController.getOneProperty(req, res)
      .then(() => {
        expect(res.message).equal("property wasn't found");
        expect(res.property).equal(false);
        expect(res.send.callCount).equal(1);
        done();
      })
      .catch(done);
  });

  it("should send a response with 1 property", function (done) {
    sandbox.spy(res, "send");
    GetOnePropertyController.getOneProperty(req, res)
      .then(() => {
        expect(res.property.id).equal(req.params.id);
        expect(res.message).to.be.equal(undefined);
        expect(res.send.callCount).equal(1);
        done();
      })
      .catch(done);
  });

  it("should send error message, if access fails", function (done) {
    sandbox.spy(res, "send");
    sandbox.stub(Property, "findById").throws();
    GetOnePropertyController.getOneProperty(req, res)
      .then(() => {
        expect(res.message).to.be.equal("Error");
        expect(res.property).to.be.equal(undefined);
        expect(res.send.callCount).equal(1);
        done();
      })
      .catch(done);
  });
});
