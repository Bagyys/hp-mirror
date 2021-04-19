const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const propertySchema = new Schema(
  {
    //property title to be displayed on page
    title: { type: String, required: true },
    //property description to be displayed on page
    description: { type: String, required: true },
    // property owner ID
    //   ownerId: {
    //     type: Schema.Types.ObjectId,
    //     ref: "User",
    //     required: true,
    //   },
    // property type
    type: {
      type: String,
      enum: [
        "studio",
        "apartment",
        "house",
        "guest-house",
        "hostel",
        "bed-and-breakfast",
        "camping",
      ], // TODO: which possible types??  -----------------------
      required: true,
    },
    // what is this for? oneMonthFree: true -----------------------

    // maximum number of people allowed to stay in property
    maxOccupants: { type: Number, required: true },
    // property location object
    location: {
      // property country
      country: { type: String, required: true },
      // property city/town
      city: { type: String, required: true },
      // property district, if it is located in a big city
      district: { type: String, required: false },
      // property address string
      zipcode: { type: String, required: true },
      // property address string
      addressString1: { type: String, required: true },
      // property address string
      addressString2: { type: String, required: false },
      // not sure if needed?? property distance form city center, if it is located in a big city
      distanceFromCenter: { type: Number, required: false },
      // property time zone in TZ database name
      timeZone: { type: String, required: true },
      // TODO: property coordinates, probably using mongoose-geojson-schema  -----------------------
    },
    // property type
    rentType: {
      type: String,
      enum: ["hourly", "daily", "weekly"], // TODO: which possible types?? -----------------------
      required: true,
    },
    images: [
      // do we need separate field for mainImage?  -----------------------
      // new Schema(
      {
        type: String,
        required: true,
      },
      //   { _id: false }
      // ),
    ],
    // property rent price object
    price: {
      // TODO: maybe add type: hourly/daily/weekly

      // default property hourly rent price
      hourly: { type: Number, required: false },
      // default property daily rent price
      daily: { type: Number, required: false },
      // default property weekly rent price
      weekly: { type: Number, required: false }, // what if not full week rented?  -----------------------
      // is property rental price seasonal?
      isSeasonal: { type: Boolean, required: true },
      //seasonal property prices array
      seasonalPrices: [
        new Schema(
          {
            // season start date
            startDate: {
              // start date's month number
              month: { type: Number, required: true },
              // start date's day number
              day: { type: Number, required: true },
            },
            // season end date
            endDate: {
              // end date's month number
              month: { type: Number, required: true },
              // end date's day number
              day: { type: Number, required: true },
            },
            // seasonal property hourly rent price
            hourly: { type: Number, required: false },
            // seasonal property daily rent price
            daily: { type: Number, required: false },
            // seasonal property weekly rent price
            weekly: { type: Number, required: false }, // what if not full week rented?  -----------------------
          },
          { _id: false }
        ),
      ],
    },
    facilities: {
      wifi: { type: Boolean, required: true },
      parking: { type: Boolean, required: true },
      petFriendly: { type: Boolean, required: true },
      disabilityAccess: { type: Boolean, required: true },
      kitchen: { type: Boolean, required: true },
      airConditioning: { type: Boolean, required: true },
      bathtub: { type: Boolean, required: true },
      washingMachine: { type: Boolean, required: true },
      balcony: { type: Boolean, required: true },
      breakfast: { type: Boolean, required: true },
      crib: { type: Boolean, required: true },
      nonSmoking: { type: Boolean, required: true },
      bathroomType: {
        type: String,
        enum: ["private", "shared"], // TODO: which possible types?? -----------------------
        required: true,
      },
      bathrooms: { type: Number, required: true },
      bedType: {
        type: String,
        enum: ["twin", "double"], // TODO: which possible types?? -----------------------
        required: true,
      },
      beds: { type: Number, required: true },
      bedrooms: { type: Number, required: true },
      // TODO: what about children??? -----------------------
    },
    //   locks: {
    //     outside: {
    //       type: Schema.Types.ObjectId,
    //       ref: "Lock",
    //       required: true,
    //     },
    //     inside: {
    //       type: Schema.Types.ObjectId,
    //       ref: "Lock",
    //       required: true,
    //     },
    //   },
    services: {
      // TODO: how do we handle this info?  -----------------------
    },
    // array of times when property is occupied
    occupiedTime: [
      new Schema(
        {
          // date - day at starting point: midnight
          date: { type: Date, required: true },
          // date - day at starting point: midnight
          dateString: { type: String, required: true },
          // has the day any occupied time slots
          reservationId: {
            type: Schema.Types.ObjectId,
            ref: "Reservation",
            required: true,
          },
          isRented: { type: Boolean, required: true },
          // is the whole day occupied
          isWholeDayRented: { type: Boolean, required: true },
          // time slots when the property is occupied on the given day
          rentedHours: [
            new Schema(
              {
                // hour - at starting point
                hour: { type: Date, required: true },
                hourNumber: { type: Number, required: true },
                // is the whole day occupied
                isWholeHourRented: { type: Boolean, required: true },
                // minute objects
                minutes: {
                  // boolean values for each minute whether occupied or not
                  0: { type: Boolean, required: false },
                  1: { type: Boolean, required: false },
                  2: { type: Boolean, required: false },
                  3: { type: Boolean, required: false },
                  4: { type: Boolean, required: false },
                  5: { type: Boolean, required: false },
                  6: { type: Boolean, required: false },
                  7: { type: Boolean, required: false },
                  8: { type: Boolean, required: false },
                  9: { type: Boolean, required: false },
                  10: { type: Boolean, required: false },
                  11: { type: Boolean, required: false },
                  12: { type: Boolean, required: false },
                  13: { type: Boolean, required: false },
                  14: { type: Boolean, required: false },
                  15: { type: Boolean, required: false },
                  16: { type: Boolean, required: false },
                  17: { type: Boolean, required: false },
                  18: { type: Boolean, required: false },
                  19: { type: Boolean, required: false },
                  20: { type: Boolean, required: false },
                  21: { type: Boolean, required: false },
                  22: { type: Boolean, required: false },
                  23: { type: Boolean, required: false },
                  24: { type: Boolean, required: false },
                  25: { type: Boolean, required: false },
                  26: { type: Boolean, required: false },
                  27: { type: Boolean, required: false },
                  28: { type: Boolean, required: false },
                  29: { type: Boolean, required: false },
                  30: { type: Boolean, required: false },
                  31: { type: Boolean, required: false },
                  32: { type: Boolean, required: false },
                  33: { type: Boolean, required: false },
                  34: { type: Boolean, required: false },
                  35: { type: Boolean, required: false },
                  36: { type: Boolean, required: false },
                  37: { type: Boolean, required: false },
                  38: { type: Boolean, required: false },
                  39: { type: Boolean, required: false },
                  40: { type: Boolean, required: false },
                  41: { type: Boolean, required: false },
                  42: { type: Boolean, required: false },
                  43: { type: Boolean, required: false },
                  44: { type: Boolean, required: false },
                  45: { type: Boolean, required: false },
                  46: { type: Boolean, required: false },
                  47: { type: Boolean, required: false },
                  48: { type: Boolean, required: false },
                  49: { type: Boolean, required: false },
                  50: { type: Boolean, required: false },
                  51: { type: Boolean, required: false },
                  52: { type: Boolean, required: false },
                  53: { type: Boolean, required: false },
                  54: { type: Boolean, required: false },
                  55: { type: Boolean, required: false },
                  56: { type: Boolean, required: false },
                  57: { type: Boolean, required: false },
                  58: { type: Boolean, required: false },
                  59: { type: Boolean, required: false },
                },
              },
              { _id: false }
            ),
          ],
          // what about cancelations? do we keep them in DB?   -----------------------
        },
        { _id: false }
      ),
    ],
    // property ratings array
    ratings: [
      new Schema(
        {
          // rater user id
          user: { type: Schema.Types.ObjectId, ref: "User", required: true },
          // // order id
          // order: { type: Schema.Types.ObjectId, ref: "Order", required: false },
          // rating time
          ratingTime: { type: Date, required: true },
          // rating
          givenRating: {
            type: Number,
            required: true,
            min: 0,
            max: 10,
          },
        },
        { _id: false }
      ),
    ],
    // overall property rating
    overallRating: {
      type: Number,
      required: true,
      min: 0,
      max: 10,
    },
    // number of received ratings
    ratingsCount: { type: Number, required: true, default: 0 },
    //   currency TODO: how to handle this part?
  },
  { timestamps: true }
);

module.exports = {
  Property: mongoose.model("Property", propertySchema),
  propertySchema: propertySchema,
};
