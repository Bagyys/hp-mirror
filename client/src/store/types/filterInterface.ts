export interface FilterDataInterface {
  priceSlider: PriceInterface;
  roomsAndBeds: RoomsBedsInterface;
  propertType: ApartamentInfoInterface;
  houseRules: ApartamentInfoInterface;
  amenities: ApartamentInfoInterface;
  facilities: ApartamentInfoInterface;
  areas: ApartamentInfoInterface;
}

export interface PriceInterface {
  min: number;
  max:number
  clear:boolean;
  initialMin:number;
  initialMax:number;
}
export interface RoomsBedsInterface {
   [key: string]: { value: number; text: string };
}
export interface ApartamentInfoInterface {
  [key: string]: { value: boolean; type: string; text: string };
}