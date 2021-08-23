import filterTypes from "../types/filterTypes";
import { FilterActions } from "../actions/filterActions";
import { FilterDataInterface } from "../types/filterInterface";

export interface FilterState {
  filterData:FilterDataInterface;
  isOpen:boolean;
}

const initialState:FilterState= {
  filterData :{
    priceSlider: {
      min: 0,
      max: 200,
    },
    roomsAndBeds: {
      beds: { value: 0, text: 'Beds' },
      bedrooms: { value: 0, text: 'Bedrooms' },
      bathrooms: { value: 0, text: 'Bathrooms' },
    },
    propertType: {
      house: { value: false, type: 'checkbox', text: 'House' },
      loft: { value: false, type: 'checkbox', text: 'Loft' },
      appartament: { value: false, type: 'checkbox', text: 'Apartament' },
      singleRoom: { value: false, type: 'checkbox', text: 'Single room' },
      studioFlat: { value: false, type: 'checkbox', text: 'Studio flat' },
      boat: { value: false, type: 'checkbox', text: 'Boat' },
    },
    houseRules: {
      petAllowed: { value: false, type: 'checkbox', text: 'Pet allowed' },
      smoking: { value: false, type: 'checkbox', text: 'Smoking' },
    },
    amenities: {
      airConditioning: {
        value: false,
        type: 'checkbox',
        text: 'Air conditioning',
      },
      healing: { value: false, type: 'checkbox', text: 'Healing' },
      kitchen: { value: false, type: 'checkbox', text: 'Kitchen' },
      washer: { value: false, type: 'checkbox', text: 'Washer' },
      balcon: { value: false, type: 'checkbox', text: 'Balcon' },
      carPark: { value: false, type: 'checkbox', text: 'Car park' },
    },
    facilities: {
      freeParkin: { value: false, type: 'checkbox', text: 'Free parking' },
      pool: { value: false, type: 'checkbox', text: 'Pool' },
      gym: { value: false, type: 'checkbox', text: 'Gym' },
      terrace: { value: false, type: 'checkbox', text: 'Terrace' },
      balcony: { value: false, type: 'checkbox', text: 'Balcony' },
    },
    areas: {
      hamburg: { value: false, type: 'checkbox', text: 'Hamburg' },
      altona: { value: false, type: 'checkbox', text: 'Altona' },
      mitte: { value: false, type: 'checkbox', text: 'Mitte' },
      nort: { value: false, type: 'checkbox', text: 'Nort' },
      bergedorf: { value: false, type: 'checkbox', text: 'Bergedorf' },
      wendsbeck: { value: false, type: 'checkbox', text: 'Wendsbeck' },
      test: { value: false, type: 'checkbox', text: 'Test' },
    }
  },
  isOpen:false
};

const filterReducer = (
  state = initialState,
  action: FilterActions
) => {
  switch (action.type) {
    case filterTypes.CHANGE_FILTER_BEDS_ROOMS:
    return {
      ...state,
      filterData:{...state.filterData, roomsAndBeds:action.payload}
    };
    case filterTypes.CHANGE_FILTER_PRICE:
    return {
      ...state,
      filterData:{...state.filterData,priceSlider:action.payload}
    };
    case filterTypes.TOGGLE_FILTER_BUTTON:
      return {
        ...state,
        isOpen: action.payload,
      };
    default:
      return state;
  }
};

export default filterReducer;