const expect = require("chai").expect;
const mongoose = require("mongoose");
const sinon = require("sinon");

const { Property } = require("../../models/propertyModel");
const GetAllPropertiesController = require("../../controllers/property/getAllProperties");

let sandbox = null;

describe("getAllProperties", function () {
  const res = {
    properties: undefined,
    message: undefined,
    json: function (data) {
      this.message = data.message;
      this.properties = data.properties;
    },
    send: function (data) {
      this.properties = data.properties;
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
      })
      .catch(done);
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

  it("should send a message 'no properties found' is properties array is empty", function (done) {
    sandbox.spy(res, "send");
    sandbox.stub(Property, "find").returns(Promise.resolve(false || []));
    GetAllPropertiesController.getAllProperties({}, res)
      .then(() => {
        expect(res.properties).to.have.lengthOf(0);
        expect(res.message).to.be.equal("no properties found");
        expect(res.send.callCount).equal(1);
        done();
      })
      .catch(done);
  });

  it("should send a response with array of existing properties", function (done) {
    sandbox.spy(res, "send");
    GetAllPropertiesController.getAllProperties({}, res)
      .then(() => {
        expect(res.properties).to.be.an("array");
        expect(res.properties.length).equal(1);
        expect(res.message).to.be.equal(undefined);
        expect(res.send.callCount).equal(1);
        done();
      })
      .catch(done);
  });

  it("should send error message, if access fails", function (done) {
    sandbox.spy(res, "json");
    sandbox.stub(Property, "find").throws();
    GetAllPropertiesController.getAllProperties({}, res)
      .then(() => {
        expect(res.message).to.be.equal("Error");
        expect(res.properties).to.be.equal(undefined);
        expect(res.json.callCount).equal(1);
        done();
      })
      .catch(done);
  });
});
