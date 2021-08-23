export interface FilterDataInterface {
  priceSlider: {
    [key: string]: number;
  };
  roomsAndBeds: {
    [key: string]: { value: number; text: string };
  };
  propertType: {
    [key: string]: { value: boolean; type: string; text: string };
  };
  houseRules: {
    [key: string]: { value: boolean; type: string; text: string };
  };
  amenities: {
    [key: string]: { value: boolean; type: string; text: string };
  };
  facilities: {
    [key: string]: { value: boolean; type: string; text: string };
  };
  areas: {
    [key: string]: { value: boolean; type: string; text: string };
  };
}