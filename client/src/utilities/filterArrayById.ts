import { PropertyInterface } from "../store/types/propertyInterfaces";

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
    
