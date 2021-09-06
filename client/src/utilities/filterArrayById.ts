import { PropertyInterface } from "../store/types/propertyInterfaces";

export const filterArrayById = (properties:PropertyInterface[], arr: Array<string>) => {
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