import { PropertyInterface } from "../store/types/propertyInterfaces";
import moment from "moment";
import { FormDataInterface } from "../store/types/filterInterface";

export const filterArrayById = (properties:PropertyInterface[], arr: Array<string>) => 
 { 
  //ideda apartamentus i favorite list ir recently viewed ,kad rikiuotu juos pagal paspaudima
  const Arr:PropertyInterface[]=[];
  for(let el of arr){
    for(let el2 of properties){
      if(el===el2._id){
        Arr.push(el2);
      }
    }
  }
  return Arr;
}

export const checkingInputs = (formData:{id:string,config:boolean}[], ...arr: boolean[]) => {
    //Tikrina ar inputai pazymeti sideFilter
  return formData.every(
        (item, i) => !item.config || arr[i] === item.config
      );
};

export const availableProperties = (properties:PropertyInterface[],days:Array<string>,guests:{[key:string]:number},formData:FormDataInterface) => 
 { 
   //is karto filtruoja ar butai laisvi ir atitinka gyventoju skaiciu paemus duomenis is API, taip pat cia filtruojami sideFilter duomenys, nezinau ar tinka?
   let propertyTypeStrings = objecToArray(formData.propertType).filter(
      (item) => item.config
    );
  return properties.filter((item) => {
        return !item.occupiedTime.some((occupiedDay) => {
          return days.some((item) => {
            let selectedDay = moment(new Date(item)).format('YYYY-MM-DD');
            return occupiedDay.dateString === selectedDay;
          });
        })&&item.maxOccupants>=guests.adults&&item.price.daily <= formData.priceSlider.max &&
        item.price.daily >= formData.priceSlider.min &&
        item.facilities.beds >= formData.roomsAndBeds.beds &&
        item.facilities.bedrooms >= formData.roomsAndBeds.bedrooms &&
        item.facilities.bathrooms >= formData.roomsAndBeds.bathrooms &&
        (propertyTypeStrings.length === 0 ||
          propertyTypeStrings.some((it) => item.type === it.id)) &&
        checkingInputs(
          objecToArray(formData.houseRules),
          item.facilities.petFriendly,
          item.facilities.nonSmoking
        ) &&
        checkingInputs(
          objecToArray(formData.amenities),
          item.facilities.airConditioning,
          item.facilities.healing,
          item.facilities.kitchen,
          item.facilities.washingMachine,
          item.facilities.balcony,
          item.facilities.parking
        ) &&
        checkingInputs(
          objecToArray(formData.facilities),
          item.facilities.wifi,
          item.facilities.terrace
        );
      })
}

export const isStringInArray = (id: string, arr: Array<string>) => {
  return arr.some((item) => item === id);
};

export const objecToArray = (object: object) => {
  let newArr = [];
  for (let [key, value] of Object.entries(object)) {
    newArr.push({
      id: key,
      config: value,
    });
  }
  return newArr;
};