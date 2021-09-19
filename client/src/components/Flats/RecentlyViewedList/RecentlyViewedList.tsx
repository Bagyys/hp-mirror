import React from 'react';
import Flat from '../../../routes/components/Flat/Flat';
import { PropertyInterface } from '../../../store/types/propertyInterfaces';
import { isStringInArray } from '../../../utilities/flatsFunctions';
import classes from './RecentlyViewedList.module.scss';
interface RecentlyViewedListProps {
  properties: PropertyInterface[];
  isMain: boolean;
  favorites: Array<string>;
  favoritesHandler: (id: string) => void;
  quickViewHandler: (id: string, cord: { lat: number; lng: number }) => void;
}
const RecentlyViewedList: React.FC<RecentlyViewedListProps> = (props) => {
  return props.properties.length > 0 ? (
    <div className={classes.RecentlyViewContainer}>
      <h2>Recently viewed</h2>
      <ul className={classes.FlatsListConatiner}>
        {props.properties.map((property: PropertyInterface) => (
          <Flat
            clickedLike={() => props.favoritesHandler(property._id)}
            liked={isStringInArray(property._id, props.favorites)}
            key={property._id}
            property={property}
            isMain={props.isMain}
            quickViewClicked={() =>
              props.quickViewHandler(property._id, property.location.cord)
            }
          />
        ))}
      </ul>
    </div>
  ) : (
    <React.Fragment></React.Fragment>
  );
};
export default RecentlyViewedList;
