export interface PropertyInterface {
  _id: string;
  title: string;
  description: string;
  type: string;
  maxOccupants: number;
  location: LocationInterface;
  rentType: string;
  images: Array<string>;
  price: PriceInterface;
  facilities: FacilitiesInterface;
  services: Object;
  occupiedTime: Array<OccupiedDayInterface>;
  ratings: Array<RatingInterface>;
  overallRating: number;
  ratingsCount: number;
  createdAt: Date;
}

export interface RatingInterface {
  user: string;
  ratingTime: Date;
  givenRating: number;
}

export interface OccupiedDayInterface {
  dateString: string;
  isRented: boolean;
  isWholeDayRented: boolean;
  hours: {
    [key: number]: boolean;
  };
}

export interface FacilitiesInterface {
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

export interface PriceInterface {
  hourly?: number;
  daily?: number;
  weekly?: number;
  isSeasonal: boolean;
  seasonalPrices?: Array<SeasonalPriceInterface>;
}

export interface SeasonalPriceInterface {
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

export interface LocationInterface {
  country: string;
  city: string;
  district: string;
  zipcode: string;
  addressString1: string;
  addressString2?: string;
  distanceFromCenter?: number;
  timeZone: string;
}