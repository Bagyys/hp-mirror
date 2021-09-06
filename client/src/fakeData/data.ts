
import FlatImg from '../assets/images/flat_img.png'; 
import { PropertyInterface } from '../store/types/propertyInterfaces';
export const fakeData:PropertyInterface[] = [
  {
    _id: 'a',
    title: 'Testinis',
    description: 'Studio appartment with a prival bathroom with a heart of Hamburg equipped with all the amenities. An appartment is bright with a large windown, a newly renovated bathroom and two panoramic terrace with sunbeds',
    type: 'Studio appartament',
    maxOccupants: 3,
    location: {
      cord:{lat:54.6838794,lng:25.2671324},
      country: 'Country',
      city: 'City',
      district: 'Rothenburg',
      zipcode: 'Zip code',
      addressString1: 'Latosha S Johnson St. 43-6',
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
      workspace:true,
      parking: true,
      petFriendly: false,
      disabilityAccess: true,
      kitchen: true,
      airConditioning: true,
      bathtub: true,
      terrace:false,
      washingMachine: true,
      balcony: true,
      breakfast: true,
      crib: true,
      nonSmoking: true,
      bathroomType: '',
      bathrooms: 1,
      // bedType: 'Single',
      beds: 2,
      bedrooms: 1,
      bedsTest:{single:1,double:1} //pakeiciau, kad gauti kieki ir kokios lovos yra
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
    },
    createdAt: new Date(),
  },
  {
    _id: 'ab',
    title: 'Testinis',
    description: 'Studio appartment with a prival bathroom with a heart of Hamburg equipped with all the amenities. An appartment is bright with a large windown, a newly renovated bathroom and two panoramic terrace with sunbeds',
    type: 'One bedroom appartament',
    maxOccupants: 3,
    location: {
      cord:{lat:54.8833306 ,lng:25.2833322},
      country: 'Country',
      city: 'City',
      district: 'District',
      zipcode: 'Zip code',
      addressString1: 'Address 1 addres 2 addres 3 address 4',
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
      workspace:true,
      parking: false,
      petFriendly: false,
      disabilityAccess: true,
      kitchen: false,
      airConditioning: true,
      bathtub: true,
      terrace:false,
      washingMachine: true,
      balcony: true,
      breakfast: true,
      crib: true,
      nonSmoking: true,
      bathroomType: '',
      bathrooms: 1,
      // bedType: 'Double',
      beds: 1,
      bedrooms: 1,
      bedsTest:{single:1,double:0}
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
    overallRating: 4.75,
    ratingsCount: 55,
    discount:{
      more1Week:true,
      more1Month:true
    },
    createdAt: new Date(),
  },
  {
    _id: 'abc',
    title: 'Testinis',
    description: 'Studio appartment with a prival bathroom with a heart of Hamburg equipped with all the amenities. An appartment is bright with a large windown, a newly renovated bathroom and two panoramic terrace with sunbeds',
    type: 'Loft appartment in city center',
    maxOccupants: 3,
    location: {
      cord:{lat:54.6833306 ,lng:25.4833322},
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
      workspace:true,
      parking: false,
      petFriendly: false,
      disabilityAccess: true,
      kitchen: true,
      airConditioning: true,
      bathtub: true,
      terrace:true,
      washingMachine: true,
      balcony: true,
      breakfast: true,
      crib: true,
      nonSmoking: true,
      bathroomType: 'shared',
      bathrooms: 1,
      // bedType: 'Bad type',
      beds: 3,
      bedrooms: 1,
      bedsTest:{single:2,double:1}
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
    },
    createdAt: new Date(),
  },
  {
    _id: 'abcd',
    title: 'Testinis',
    description: 'Studio appartment with a prival bathroom with a heart of Hamburg equipped with all the amenities. An appartment is bright with a large windown, a newly renovated bathroom and two panoramic terrace with sunbeds',
    type: 'Small appartment close to park',
    maxOccupants: 3,
    location: {
      cord:{lat:54.6633306 ,lng:25.2633322},
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
      workspace:true,
      parking: true,
      petFriendly: true,
      disabilityAccess: true,
      kitchen: true,
      airConditioning: true,
      bathtub: true,
      terrace:false,
      washingMachine: true,
      balcony: true,
      breakfast: true,
      crib: true,
      nonSmoking: true,
      bathroomType: 'private',
      bathrooms: 1,
      // bedType: 'Bad type',
      beds: 2,
      bedrooms: 1,
      bedsTest:{single:1,double:1}
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
      more1Month:true
    },
    createdAt: new Date(),
  },
  {
    _id: 'abcde',
    title: 'Testinis',
    description: 'Studio appartment with a prival bathroom with a heart of Hamburg equipped with all the amenities. An appartment is bright with a large windown, a newly renovated bathroom and two panoramic terrace with sunbeds',
    type: 'Studio appartment',
    maxOccupants: 3,
    location: {
      cord:{lat:54.6233306 ,lng:25.2233322},
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
      workspace:true,
      parking: true,
      petFriendly: true,
      disabilityAccess: true,
      kitchen: true,
      airConditioning: true,
      bathtub: true,
      terrace:false,
      washingMachine: true,
      balcony: true,
      breakfast: true,
      crib: true,
      nonSmoking: true,
      bathroomType: 'private',
      bathrooms: 1,
      // bedType: 'Bad type',
      beds: 2,
      bedrooms: 1,
      bedsTest:{single:2,double:0}
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
      more1Month:true
    },
    createdAt: new Date(),
  },
  {
    _id: 'abcdejaasd',
    title: 'Testinis',
    description: 'Studio appartment with a prival bathroom with a heart of Hamburg equipped with all the amenities. An appartment is bright with a large windown, a newly renovated bathroom and two panoramic terrace with sunbeds',
    type: 'Studio appartment',
    maxOccupants: 3,
    location: {
      cord:{lat:54.6533306 ,lng:25.2533322},
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
      workspace:true,
      parking: true,
      petFriendly: true,
      disabilityAccess: true,
      kitchen: true,
      airConditioning: true,
      bathtub: true,
      terrace:false,
      washingMachine: true,
      balcony: true,
      breakfast: true,
      crib: true,
      nonSmoking: true,
      bathroomType: '',
      bathrooms: 1,
      // bedType: 'Bad type',
      beds: 2,
      bedrooms: 1,
      bedsTest:{single:1,double:1}
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
      more1Month:false
    },
    createdAt: new Date(),
  },
  {
    _id: 'abcdersaaasd',
    title: 'Testinis',
    description: 'Studio appartment with a prival bathroom with a heart of Hamburg equipped with all the amenities. An appartment is bright with a large windown, a newly renovated bathroom and two panoramic terrace with sunbeds',
    type: 'Studio appartment',
    maxOccupants: 3,
    location: {
      cord:{lat:54.6653306 ,lng:25.2443322},
      country: 'Country',
      city: 'City',
      district: 'District',
      zipcode: 'Zip code',
      addressString1: 'Latosha S Johnson St. 43-6',
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
      workspace:true,
      parking: true,
      petFriendly: true,
      disabilityAccess: true,
      kitchen: true,
      airConditioning: true,
      bathtub: true,
      terrace:false,
      washingMachine: true,
      balcony: true,
      breakfast: true,
      crib: true,
      nonSmoking: true,
      bathroomType: '',
      bathrooms: 1,
      // bedType: 'Bad type',
      beds: 3,
      bedrooms: 1,
      bedsTest:{single:3,double:0}
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
      more1Month:false
    },
    createdAt: new Date(),
  },
];