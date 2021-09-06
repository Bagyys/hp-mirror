import { PropertyInterface } from "../store/types/propertyInterfaces";

export const filterArrayById = (properties:PropertyInterface[], arr: Array<string>) => 
  properties.filter((item) => {
        return arr.includes(item._id);
      })
    
