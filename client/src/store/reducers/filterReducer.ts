import filterTypes from "../types/filterTypes";
import { FilterActions } from "../actions/filterActions";
import { FilterDataInterface, FormDataInterface, MultiRangeSliderProps } from "../types/filterInterface";

export interface FilterState {
  filterData:FilterDataInterface;
  formData:FormDataInterface;
  isFilterOpen:boolean;
  showHideInputs:{[key:string]:boolean};
  multiRangeSlider:MultiRangeSliderProps
}

const initialState:FilterState= {
  filterData :{
    price: {
      min:{value:0},
      max:{value:200}
    },
    roomsAndBeds: {
      beds: { value: 0, text: 'Beds' },
      bedrooms: { value: 0, text: 'Bedrooms' },
      bathrooms: { value: 0, text: 'Bathrooms' },
    },
    propertyTypes: {
      house: { value: false, type: 'checkbox', text: 'House' },
      loft: { value: false, type: 'checkbox', text: 'Loft' },
      apartment: { value: false, type: 'checkbox', text: 'Apartment' },
      single: { value: false, type: 'checkbox', text: 'Single room' },
      studio: { value: false, type: 'checkbox', text: 'Studio flat' },
      boat: { value: false, type: 'checkbox', text: 'Boat' },
    },
    houseRules: {
      petAllowed: { value: false, type: 'checkbox', text: 'Pet allowed' },
      nonSmoking: { value: false, type: 'checkbox', text: 'Non-smoking' },
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
      carPark: { value: false, type: 'checkbox', text: 'Parking' },
    },
    facilities: {
      wifi: { value: false, type: 'checkbox', text: 'Wifi' },
      terrace: { value: false, type: 'checkbox', text: 'Terrace' },
      pool: { value: false, type: 'checkbox', text: 'Pool' },
      gym: { value: false, type: 'checkbox', text: 'Gym' }
      
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
  formData:{
    price: {
      min:0,
      max:200
    },
    roomsAndBeds: {
      beds: 0,
      bedrooms: 0,
      bathrooms:0,
    },
    propertyTypes: {
      house: false,
      loft: false,
      apartment: false,
      single: false,
      studio: false,
      boat: false,
    },
    houseRules: {
      petAllowed: false,
      nonSmoking: false,
    },
    amenities: {
      airConditioning: false,
      healing: false,
      kitchen:false,
      washer:false,
      balcon: false,
      carPark: false,
    },
    facilities: {
      wifi: false,
      terrace: false,
      pool: false,
      gym: false
      
    },
    areas: {
      hamburg:false, 
      altona:  false,
      mitte:  false, 
      nort:  false,
      bergedorf:  false, 
      wendsbeck:  false,
      test:  false
    }
  },
  isFilterOpen:false,
  showHideInputs:{
    propertyType:false,
    houseRules:false,
    amenities:false,
    facilities:false,
    areas:false
  },
  multiRangeSlider:{
    initialMin:0,
    initialMax:200,
    clear:false
  }
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
        filterData:{...state.filterData,price:action.payload},
        multiRangeSlider:{...state.multiRangeSlider,clear:false}
      };
    case filterTypes.CHANGE_FILTER_INPUT_VALUES:
      return {
        ...state,
        filterData:{...state.filterData,...action.payload}
      };
    case filterTypes.TOGGLE_FILTER_BUTTON:
      return {
        ...state,
        isFilterOpen: action.payload,
      };
    case filterTypes.CLEAR_FILTER:
      return {
        ...state,
        filterData:initialState.filterData,
        multiRangeSlider:{...state.multiRangeSlider,clear:true}
      };
    case filterTypes.TOGGLE_CHECKBOXES_LIST:
      return {
        ...state,
        showHideInputs:{...state.showHideInputs,...action.payload},
      };  
    case filterTypes.ADD_FORM_DATA:
      return {
        ...state,
        formData:action.payload,
      };  
    default:
      return state;
  }
};

export default filterReducer;