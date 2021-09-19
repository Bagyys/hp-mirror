import React from 'react';
import Flat from '../../../routes/components/Flat/Flat';
import QuickViewFlat from '../../../routes/components/QuickViewFlat/QuickViewFlat';
import QuickViewFlatFavoritePc from '../../../routes/components/QuickViewFlatFavoritePc/QuickViewFlatFavoritePc';
import { PropertyInterface } from '../../../store/types/propertyInterfaces';
import { isStringInArray } from '../../../utilities/flatsFunctions';
import { cn } from '../../../utilities/joinClasses';
import classes from './FlatsList.module.scss';
interface FlatListProps {
  properties: PropertyInterface[];
  isMain: boolean;
  favorites: Array<string>;
  isMobile: boolean;
  quickViewPropertyId: string;
  favoritesHandler: (id: string) => void;
  closeQuickViewHandler: () => void;
  quickViewHandler: (id: string, cord: { lat: number; lng: number }) => void;
}
const FlatsList = React.forwardRef<HTMLDivElement, FlatListProps>(
  (props, ref) => {
    const quickViewData = props.properties?.find(
      (item) => item._id === props.quickViewPropertyId
    );

    return props.properties?.length > 0 ? (
      <div className={classes.FlatsContainer}>
        {/* Title for Favorite page PC */}
        {!props.isMain && <h2 ref={ref}>Your Favorites</h2>}
        {/* QuickView for filter page mobile and pc, and favorite page mobile */}
        {quickViewData && (props.isMain || props.isMobile) && (
          <QuickViewFlat
            clickedLike={() => props.favoritesHandler(quickViewData._id)}
            liked={isStringInArray(quickViewData._id, props.favorites)}
            close={props.closeQuickViewHandler}
            property={quickViewData}
            isMain={props.isMain}
          />
        )}
        <ul
          className={cn(
            classes.FlatsListConatiner,
            props.isMain
              ? classes.FlatsListConatinerMain
              : classes.FlatsListConatinerFavorite
          )}
        >
          {/* QuickView for favorite page pc */}
          {quickViewData && !props.isMain && !props.isMobile && (
            <QuickViewFlatFavoritePc
              clickedLike={() => props.favoritesHandler(quickViewData._id)}
              liked={isStringInArray(quickViewData._id, props.favorites)}
              close={props.closeQuickViewHandler}
              property={quickViewData}
              isMain={props.isMain}
            />
          )}
          {props.properties
            .filter((item) => item._id !== props.quickViewPropertyId)
            .map((property: PropertyInterface) => (
              <Flat
                quickViewClicked={() =>
                  props.quickViewHandler(property._id, property.location.cord)
                }
                isMain={props.isMain}
                key={property._id}
                property={property}
                clickedLike={() => props.favoritesHandler(property._id)}
                liked={isStringInArray(property._id, props.favorites)}
              />
            ))}
        </ul>
      </div>
    ) : (
      <React.Fragment></React.Fragment>
    );
  }
);
export default FlatsList;
