import filterTypes from "../types/filterTypes";
import { FilterActions } from "../actions/filterActions";
import { FilterDataInterface } from "../types/filterInterface";

export interface FilterState {
  filterData:FilterDataInterface;
  isFilterOpen:boolean;
  toggleFilterBoxes:{[key:string]:boolean};
  multiRangeSlider:{
    clear:boolean;
    initialMin:number;
    initialMax:number;
  }
}

const initialState:FilterState= {
  filterData :{
    priceSlider: {
      min:{value:0},
      max:{value:200}
    },
    roomsAndBeds: {
      beds: { value: 0, text: 'Beds' },
      bedrooms: { value: 0, text: 'Bedrooms' },
      bathrooms: { value: 0, text: 'Bathrooms' },
    },
    propertType: {
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
  isFilterOpen:false,
  toggleFilterBoxes:{
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
        filterData:{...state.filterData,priceSlider:action.payload},
        multiRangeSlider:{...state.multiRangeSlider,clear:false}
      };
    case filterTypes.CHANGE_FILTER_PROPERTY_TYPE:
      return {
        ...state,
        filterData:{...state.filterData,propertType:action.payload}
      };
    case filterTypes.CHANGE_FILTER_HOUSE_RULES:
      return {
        ...state,
        filterData:{...state.filterData,houseRules:action.payload}
      };
    case filterTypes.CHANGE_FILTER_AMENITIES:
      return {
        ...state,
        filterData:{...state.filterData,amenities:action.payload}
      };
    case filterTypes.CHANGE_FILTER_FACILITIES:
      return {
        ...state,
        filterData:{...state.filterData,facilities:action.payload}
      };
    case filterTypes.CHANGE_FILTER_AREAS:
      return {
        ...state,
        filterData:{...state.filterData,areas:action.payload}
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
    case filterTypes.TOGGLE_PROPERT_TYPE_INPUTS:
      return {
        ...state,
        toggleFilterBoxes:{...state.toggleFilterBoxes,propertyType:action.payload},
      };
    case filterTypes.TOGGLE_HOUSE_RULES_INPUTS:
      return {
        ...state,
        toggleFilterBoxes:{...state.toggleFilterBoxes,houseRules:action.payload},
      };  
    case filterTypes.TOGGLE_AMENITIES_INPUTS:
      return {
        ...state,
        toggleFilterBoxes:{...state.toggleFilterBoxes,amenities:action.payload},
      };
    case filterTypes.TOGGLE_FACILITIES_INPUTS:
      return {
        ...state,
        toggleFilterBoxes:{...state.toggleFilterBoxes,facilities:action.payload},
      };    
    case filterTypes.TOGGLE_AREAS_INPUTS:
      return {
        ...state,
        toggleFilterBoxes:{...state.toggleFilterBoxes,areas:action.payload},
      };  
    default:
      return state;
  }
};

export default filterReducer;