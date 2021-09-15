interface ObjectIndexer<T> {
  [id: string]: T;
}
export interface FilterDataInterface extends ObjectIndexer<PriceInterface|RoomsBedsInterface|ApartamentInfoInterface> {
  price: PriceInterface;
  roomsAndBeds: RoomsBedsInterface;
  propertyTypes: ApartamentInfoInterface;
  houseRules: ApartamentInfoInterface;
  amenities: ApartamentInfoInterface;
  facilities: ApartamentInfoInterface;
  areas: ApartamentInfoInterface;
}
export interface FormDataInterface {
  price: {min:number,max:number};
  roomsAndBeds: {[key: string]:number};
  propertyTypes: {[key: string]:boolean};
  houseRules: {[key: string]:boolean};
  amenities: {[key: string]:boolean};
  facilities: {[key: string]:boolean};
  areas: {[key: string]:boolean};
}

export interface PriceInterface{
  [key:string]: {[key:string]:number};
}
export interface RoomsBedsInterface {
   [key: string]: { value: number; text: string };
}
export interface ApartamentInfoInterface {
  [key: string]: { value: boolean; type: string; text: string };
}