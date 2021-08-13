import { isWhiteSpaceLike } from 'typescript';
import FlatImg from '../assets/images/flat_img.png'; 

export const fakeData = [
  {
    _id: 'abcdehdgf',
    title: 'Testinis',
    description: 'Testinis aprasymas',
    type: 'Studio appartament',
    maxOccupants: 3,
    location: {
      country: 'Country',
      city: 'City',
      district: 'District',
      zipcode: 'Zip code',
      addressString1: 'Address 1',
      addressString2: 'Address 2',
      distanceFromCenter: 50,
      timeZone: 'Time zone',
    },
    rentType: 'Rent type',
    images: [FlatImg, FlatImg, FlatImg, FlatImg, FlatImg],
    price: {
      daily: 50,
      isSeasonal: false,
    },
    facilities: {
      size: 50,
      wifi: true,
      parking: false,
      petFriendly: false,
      disabilityAccess: true,
      kitchen: true,
      airConditioning: true,
      bathtub: true,
      washingMachine: true,
      balcony: true,
      breakfast: true,
      crib: true,
      nonSmoking: true,
      bathroomType: '',
      bathrooms: 1,
      bedType: 'Single',
      beds: 2,
      bedrooms: 1,
    },
    lock: 'Lock',
    services: {},
    occupiedTime: [
      {
        dateString: '',
        isRented: false,
        isWholeDayRented: false,
        hours: {
          0: false,
          1: false,
          2: false,
          3: false,
          4: false,
          5: false,
          6: false,
          7: false,
          8: false,
          9: false,
          10: false,
          11: false,
          12: false,
          13: false,
          14: false,
          15: false,
          16: false,
          17: false,
          18: false,
          19: false,
          20: false,
          21: false,
          22: false,
          23: false,
        },
      },
    ],
    ratings: [
      {
        user: 'user',
        ratingTime: new Date(),
        givenRating: 5,
      },
      {
        user: 'user1',
        ratingTime: new Date(),
        givenRating: 4,
      },
      {
        user: 'user2',
        ratingTime: new Date(),
        givenRating: 3,
      },
    ],
    overallRating: 4.75,
    ratingsCount: 153,
    discount:{
      more1Week:true,
      more1Month:false,
      badgeColor:'White',
      inContent:false
    },
    createdAt: new Date(),
  },
  {
    _id: 'abcdeaasfg',
    title: 'Testinis',
    description: 'Testinis aprasymas',
    type: 'One bedroom appartament',
    maxOccupants: 3,
    location: {
      country: 'Country',
      city: 'City',
      district: 'District',
      zipcode: 'Zip code',
      addressString1: 'Address 1',
      addressString2: 'Address 2',
      distanceFromCenter: 50,
      timeZone: 'Time zone',
    },
    rentType: 'Rent type',
    images: [FlatImg, FlatImg, FlatImg, FlatImg, FlatImg],
    price: {
      daily: 50,
      isSeasonal: false,
    },
    facilities: {
      size: 50,
      wifi: true,
      parking: false,
      petFriendly: false,
      disabilityAccess: true,
      kitchen: false,
      airConditioning: true,
      bathtub: true,
      washingMachine: true,
      balcony: true,
      breakfast: true,
      crib: true,
      nonSmoking: true,
      bathroomType: '',
      bathrooms: 1,
      bedType: 'Bad type',
      beds: 1,
      bedrooms: 1,
    },
    lock: 'Lock',
    services: {},
    occupiedTime: [
      {
        dateString: '',
        isRented: false,
        isWholeDayRented: false,
        hours: {
          0: false,
          1: false,
          2: false,
          3: false,
          4: false,
          5: false,
          6: false,
          7: false,
          8: false,
          9: false,
          10: false,
          11: false,
          12: false,
          13: false,
          14: false,
          15: false,
          16: false,
          17: false,
          18: false,
          19: false,
          20: false,
          21: false,
          22: false,
          23: false,
        },
      },
    ],
    ratings: [
      {
        user: 'user',
        ratingTime: new Date(),
        givenRating: 5,
      },
    ],
    overallRating: 5,
    ratingsCount: 5,
    discount:{
      more1Week:true,
      more1Month:true,
      badgeColor:'Orange',
      inContent:true
    },
    createdAt: new Date(),
  },
  {
    _id: 'abcdeadfghd',
    title: 'Testinis',
    description: 'Testinis aprasymas',
    type: 'Loft appartment in city center',
    maxOccupants: 3,
    location: {
      country: 'Country',
      city: 'City',
      district: 'District',
      zipcode: 'Zip code',
      addressString1: 'Address 1',
      addressString2: 'Address 2',
      distanceFromCenter: 50,
      timeZone: 'Time zone',
    },
    rentType: 'Rent type',
    images: [FlatImg, FlatImg, FlatImg, FlatImg, FlatImg],
    price: {
      daily: 50,
      isSeasonal: false,
    },
    facilities: {
      size: 50,
      wifi: true,
      parking: false,
      petFriendly: false,
      disabilityAccess: true,
      kitchen: true,
      airConditioning: true,
      bathtub: true,
      washingMachine: true,
      balcony: true,
      breakfast: true,
      crib: true,
      nonSmoking: true,
      bathroomType: 'shared',
      bathrooms: 1,
      bedType: 'Bad type',
      beds: 3,
      bedrooms: 1,
    },
    lock: 'Lock',
    services: {},
    occupiedTime: [
      {
        dateString: '',
        isRented: false,
        isWholeDayRented: false,
        hours: {
          0: false,
          1: false,
          2: false,
          3: false,
          4: false,
          5: false,
          6: false,
          7: false,
          8: false,
          9: false,
          10: false,
          11: false,
          12: false,
          13: false,
          14: false,
          15: false,
          16: false,
          17: false,
          18: false,
          19: false,
          20: false,
          21: false,
          22: false,
          23: false,
        },
      },
    ],
    ratings: [
      {
        user: 'user',
        ratingTime: new Date(),
        givenRating: 5,
      },
    ],
    overallRating: 5,
    ratingsCount: 5,
    discount:{
      more1Week:true,
      more1Month:false,
      badgeColor:'Blue',
      inContent:true
    },
    createdAt: new Date(),
  },
  {
    _id: 'abcdeasdfgsg',
    title: 'Testinis',
    description: 'Testinis aprasymas',
    type: 'Small appartment close to park',
    maxOccupants: 3,
    location: {
      country: 'Country',
      city: 'City',
      district: 'District',
      zipcode: 'Zip code',
      addressString1: 'Address 1',
      addressString2: 'Address 2',
      distanceFromCenter: 50,
      timeZone: 'Time zone',
    },
    rentType: 'Rent type',
    images: [FlatImg, FlatImg, FlatImg, FlatImg, FlatImg],
    price: {
      daily: 50,
      isSeasonal: false,
    },
    facilities: {
      size: 50,
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
      bathroomType: 'private',
      bathrooms: 1,
      bedType: 'Bad type',
      beds: 2,
      bedrooms: 1,
    },
    lock: 'Lock',
    services: {},
    occupiedTime: [
      {
        dateString: '',
        isRented: false,
        isWholeDayRented: false,
        hours: {
          0: false,
          1: false,
          2: false,
          3: false,
          4: false,
          5: false,
          6: false,
          7: false,
          8: false,
          9: false,
          10: false,
          11: false,
          12: false,
          13: false,
          14: false,
          15: false,
          16: false,
          17: false,
          18: false,
          19: false,
          20: false,
          21: false,
          22: false,
          23: false,
        },
      },
    ],
    ratings: [
      {
        user: 'user',
        ratingTime: new Date(),
        givenRating: 5,
      },
    ],
    overallRating: 5,
    ratingsCount: 5,
    discount:{
      more1Week:false,
      more1Month:true,
      badgeColor:'Orange',
      inContent:false
    },
    createdAt: new Date(),
  },
  {
    _id: 'abcdeadgfg',
    title: 'Testinis',
    description: 'Testinis aprasymas',
    type: 'Studio appartment',
    maxOccupants: 3,
    location: {
      country: 'Country',
      city: 'City',
      district: 'District',
      zipcode: 'Zip code',
      addressString1: 'Address 1',
      addressString2: 'Address 2',
      distanceFromCenter: 50,
      timeZone: 'Time zone',
    },
    rentType: 'Rent type',
    images: [FlatImg, FlatImg, FlatImg, FlatImg, FlatImg],
    price: {
      daily: 50,
      isSeasonal: false,
    },
    facilities: {
      size: 50,
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
      bathroomType: 'private',
      bathrooms: 1,
      bedType: 'Bad type',
      beds: 2,
      bedrooms: 1,
    },
    lock: 'Lock',
    services: {},
    occupiedTime: [
      {
        dateString: '',
        isRented: false,
        isWholeDayRented: false,
        hours: {
          0: false,
          1: false,
          2: false,
          3: false,
          4: false,
          5: false,
          6: false,
          7: false,
          8: false,
          9: false,
          10: false,
          11: false,
          12: false,
          13: false,
          14: false,
          15: false,
          16: false,
          17: false,
          18: false,
          19: false,
          20: false,
          21: false,
          22: false,
          23: false,
        },
      },
    ],
    ratings: [
      {
        user: 'user',
        ratingTime: new Date(),
        givenRating: 5,
      },
    ],
    overallRating: 5,
    ratingsCount: 5,
    discount:{
      more1Week:true,
      more1Month:true,
      badgeColor:'Red',
      inContent:false
    },
    createdAt: new Date(),
  },
  {
    _id: 'abcdeaasd',
    title: 'Testinis',
    description: 'Testinis aprasymas',
    type: 'Studio appartment',
    maxOccupants: 3,
    location: {
      country: 'Country',
      city: 'City',
      district: 'District',
      zipcode: 'Zip code',
      addressString1: 'Address 1',
      addressString2: 'Address 2',
      distanceFromCenter: 50,
      timeZone: 'Time zone',
    },
    rentType: 'Rent type',
    images: [FlatImg, FlatImg, FlatImg, FlatImg, FlatImg],
    price: {
      daily: 50,
      isSeasonal: false,
    },
    facilities: {
      size: 50,
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
      bathroomType: 'Bathroom type',
      bathrooms: 1,
      bedType: 'Bad type',
      beds: 2,
      bedrooms: 1,
    },
    lock: 'Lock',
    services: {},
    occupiedTime: [
      {
        dateString: '',
        isRented: false,
        isWholeDayRented: false,
        hours: {
          0: false,
          1: false,
          2: false,
          3: false,
          4: false,
          5: false,
          6: false,
          7: false,
          8: false,
          9: false,
          10: false,
          11: false,
          12: false,
          13: false,
          14: false,
          15: false,
          16: false,
          17: false,
          18: false,
          19: false,
          20: false,
          21: false,
          22: false,
          23: false,
        },
      },
    ],
    ratings: [
      {
        user: 'user',
        ratingTime: new Date(),
        givenRating: 5,
      },
    ],
    overallRating: 5,
    ratingsCount: 5,
    discount:{
      more1Week:true,
      more1Month:false,
      badgeColor:'Green',
      inContent:true
    },
    createdAt: new Date(),
  },
  {
    _id: 'abcdesaaasd',
    title: 'Testinis',
    description: 'Testinis aprasymas',
    type: 'Studio appartment',
    maxOccupants: 3,
    location: {
      country: 'Country',
      city: 'City',
      district: 'District',
      zipcode: 'Zip code',
      addressString1: 'Address 1',
      addressString2: 'Address 2',
      distanceFromCenter: 50,
      timeZone: 'Time zone',
    },
    rentType: 'Rent type',
    images: [FlatImg, FlatImg, FlatImg, FlatImg, FlatImg],
    price: {
      daily: 50,
      isSeasonal: false,
    },
    facilities: {
      size: 50,
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
      bathroomType: 'Bathroom type',
      bathrooms: 1,
      bedType: 'Bad type',
      beds: 2,
      bedrooms: 1,
    },
    lock: 'Lock',
    services: {},
    occupiedTime: [
      {
        dateString: '',
        isRented: false,
        isWholeDayRented: false,
        hours: {
          0: false,
          1: false,
          2: false,
          3: false,
          4: false,
          5: false,
          6: false,
          7: false,
          8: false,
          9: false,
          10: false,
          11: false,
          12: false,
          13: false,
          14: false,
          15: false,
          16: false,
          17: false,
          18: false,
          19: false,
          20: false,
          21: false,
          22: false,
          23: false,
        },
      },
    ],
    ratings: [
      {
        user: 'user',
        ratingTime: new Date(),
        givenRating: 5,
      },
    ],
    overallRating: 5,
    ratingsCount: 5,
    discount:{
      more1Week:true,
      more1Month:false,
      badgeColor:'Green',
      inContent:true
    },
    createdAt: new Date(),
  },
];