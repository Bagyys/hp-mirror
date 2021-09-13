export interface FilterDataInterface {
  priceSlider: PriceInterface;
  roomsAndBeds: RoomsBedsInterface;
  propertType: ApartamentInfoInterface;
  houseRules: ApartamentInfoInterface;
  amenities: ApartamentInfoInterface;
  facilities: ApartamentInfoInterface;
  areas: ApartamentInfoInterface;
}
export interface FormDataInterface {
  priceSlider: {min:number,max:number};
  roomsAndBeds: {[key: string]:number};
  propertType: {[key: string]:boolean};
  houseRules: {[key: string]:boolean};
  amenities: {[key: string]:boolean};
  facilities: {[key: string]:boolean};
  areas: {[key: string]:boolean};
}

export interface PriceInterface {
  min: {[key:string]:number};
  max:{[key:string]:number};
}
export interface RoomsBedsInterface {
   [key: string]: { value: number; text: string };
}
export interface ApartamentInfoInterface {
  [key: string]: { value: boolean; type: string; text: string };
}