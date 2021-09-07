import moment from "moment";
import { PropertyInterface } from "../store/types/propertyInterfaces";

export const availableProperties = (properties:PropertyInterface[],arr:Array<Date>) => 
 { 
  return properties.filter((item) => {
        return !item.occupiedTime.some((occupiedDay, index) => {
          return arr.some((item) => {
            let selectedDay = moment(item).format('YYYY-MM-DD');
            return occupiedDay.dateString === selectedDay;
          });
        });
      })
}
