import { PropertyInterface } from "../store/types/propertyInterfaces";
import moment from "moment";

export const filterArrayById = (properties:PropertyInterface[], arr: Array<string>) => 
 { 
  //ideda apartamentus i favorite list ir recently viewed ir rikiuoja juos pagal paspaudima
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

export const availableProperties = (properties:PropertyInterface[],days:Array<string>,guests:{[key:string]:number}) => 
 { 
  return properties.filter((item) => {
        return !item.occupiedTime.some((occupiedDay) => {
          return days.some((item) => {
            let selectedDay = moment(new Date(item)).format('YYYY-MM-DD');
            return occupiedDay.dateString === selectedDay;
          });
        })&&item.maxOccupants>=guests.adults;
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