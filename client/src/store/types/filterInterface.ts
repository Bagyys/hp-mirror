
export interface FilterDataInterface {
  price: PriceSliderInterface;
  roomsAndBeds: RoomsBedsInterface;
  propertyTypes: ApartamentInfoInterface;
  houseRules: ApartamentInfoInterface;
  amenities: ApartamentInfoInterface;
  facilities: ApartamentInfoInterface;
  areas: ApartamentInfoInterface;
}
export type ApartamentInfoId='propertyTypes'|'houseRules'|'amenities'|'facilities'|'areas';

export interface FormDataInterface {
  price: {min:number,max:number};
  roomsAndBeds: {[key: string]:number};
  propertyTypes: {[key: string]:boolean};
  houseRules: {[key: string]:boolean};
  amenities: {[key: string]:boolean};
  facilities: {[key: string]:boolean};
  areas: {[key: string]:boolean};
}

export interface PriceSliderInterface{
  [key:string]: {[key:string]:number};
}
export interface RoomsBedsInterface {
   [key: string]: { value: number; text: string };
}
export interface ApartamentInfoInterface {
  [key: string]: { value: boolean; type: string; text: string };
}

export interface MultiRangeSliderProps{
    clear:boolean;
    initialMin:number;
    initialMax:number;
}