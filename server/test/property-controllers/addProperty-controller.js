const expect = require("chai").expect;
const mongoose = require("mongoose");
const sinon = require("sinon");

const { Property } = require("../../models/propertyModel");
const AddPropertyController = require("../../controllers/property/addProperty");

let sandbox=null

describe("should add property", function () {
  let req = {
    body: {
      title: "PAVYKO",
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
      },
      occupiedTime: [],
      ratings: [],
      overallRating: 8,
      ratingsCount: 0,
    },
  };

  const res = {
    createdProperty: undefined,
    error: undefined,
    statusCode: undefined,
    json: function (data) {
      this.error = data.error;
    },
    send: function (property) {
      this.createdProperty = property;
      return this;
    },
    status: function (code) {
      this.statusCode = code;
      return this;
    },
  };

  beforeEach(function (done) {
    sandbox=sinon.createSandbox()
    mongoose.connect(
      "mongodb+srv://user1:l3kJif2TwBYcfwUE@test-cluster.5gddu.mongodb.net/test-project?retryWrites=true&w=majority"
    );
    done();
    // .catch(done);
  });

  afterEach(function (done) {
    sandbox.restore();
    Property.deleteMany({})
      .then(() => {
        return mongoose.disconnect();
      })
      .then(() => {
        done();
      })
    .catch(done);
  });

  it("should send a response with valid user and without error message", function (done) {
    sandbox.stub(Property.prototype, "save").returns(Promise.resolve(true))
    AddPropertyController.addProperty(req, res)
      .then(() => {
        expect(res.createdProperty).to.have.property("title", "PAVYKO");
        expect(res).to.have.property("statusCode", 200);
        done();
      })
      .catch(done);
  });

  it("should send error message with code 500, if access db fails", function (done) {
    sandbox.stub(Property.prototype, "save").throws();
    AddPropertyController.addProperty(req, res).then(() => {
      expect(res.statusCode).to.be.equal(500);
      expect(res.error).to.be.equal("Error");
      done();
    });
  });
});
