const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const propertySchema = new Schema({
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
            new Schema({
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
            }, { _id: false }),
        ],
    },
    facilities: {
        // property size in square meters
        size: { type: Number, required: true },
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
    lock: {
        type: Schema.Types.ObjectId,
        ref: "Lock",
        required: false,
    },
    services: {
        // TODO: how do we handle this info?  -----------------------
    },
    // array of times when property is occupied
    occupiedTime: [
        new Schema({
            // date - YYYY-MM-DD
            dateString: { type: String, required: true },
            // has the day any occupied time slots
            isRented: { type: Boolean, required: true },
            // is the whole day occupied
            isWholeDayRented: { type: Boolean, required: true },
            // time slots when the property is occupied on the given day
            // true if occupied
            hours: {
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
            },
            // what about cancelations? do we keep them in DB?   -----------------------
        }, { _id: false }),
    ],
    // property ratings array
    ratings: [
        new Schema({
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
        }, { _id: false }),
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
}, { timestamps: true });

module.exports = {
    Property: mongoose.model("Property", propertySchema),
    propertySchema: propertySchema,
};