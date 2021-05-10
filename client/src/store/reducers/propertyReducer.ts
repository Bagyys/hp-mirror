// import update from "react-addons-update";

import propertyTypes from "../types/propertyTypes";
import { Actions } from "../actions/propertyActions";

export interface Location {
  country: string;
  city: string;
  district: string;
  zipcode: string;
  addressString1: string;
  addressString2?: string;
  distanceFromCenter?: number;
  timeZone: string;
}

export interface SeasonalPrice {
  startDate: {
    month: number;
    day: number;
  };
  endDate: {
    month: number;
    day: number;
  };
  hourly?: number;
  daily?: number;
  weekly?: number;
}
export interface Price {
  hourly?: number;
  daily?: number;
  weekly?: number;
  isSeasonal: boolean;
  seasonalPrices?: Array<SeasonalPrice>;
}

export interface Facilities {
  size: number;
  wifi: boolean;
  parking: boolean;
  petFriendly: boolean;
  disabilityAccess: boolean;
  kitchen: boolean;
  airConditioning: boolean;
  bathtub: boolean;
  washingMachine: boolean;
  balcony: boolean;
  breakfast: boolean;
  crib: boolean;
  nonSmoking: boolean;
  bathroomType: string;
  bathrooms: number;
  bedType: string;
  beds: number;
  bedrooms: number;
}

export interface OccupiedDay {
  dateString: string;
  isRented: boolean;
  isWholeDayRented: boolean;
  hours: {
    [key: number]: boolean;
  };
}
export interface Rating {
  user: string;
  ratingTime: Date;
  givenRating: number;
}

export interface PropertyProps {
  _id: string;
  title: string;
  description: string;
  type: string;
  maxOccupants: number;
  location: Location;
  rentType: string;
  images: Array<string>;
  price: Price;
  facilities: Facilities;
  services: Object;
  occupiedTime: Array<OccupiedDay>;
  ratings: Array<Rating>;
  overallRating: number;
  ratingsCount: number;
  createdAt: Date;
}
// export interface PropertyState {
//   Array<PropertyProps>
// }

const initialState: Array<PropertyProps> = [];

const propertyReducer = (state = initialState, action: Actions) => {
  switch (action.type) {
    case propertyTypes.GET_ALL_PROPERTIES_SUCCESS:
      return action.payload;
    case propertyTypes.GET_PROPERTY_SUCCESS:
      return [action.payload];
    default:
      return state;
  }
};

export default propertyReducer;
