import classes from './map.module.scss';
import GoogleMapReact from 'google-map-react';
import Marker from './Marker/Marker';
import { useState } from 'react';
import { PropertyState } from '../../store/reducers/propertyReducer';
import { StoreState } from '../../store/configureStore';
import { useSelector, useDispatch } from 'react-redux';
import {
  quickViewAction,
  activePropertyCordsAction,
} from '../../store/actions/propertyActions';



function Map() {
  const propertyStore: PropertyState = useSelector(
    (state: StoreState) => state.property
  );
  const dispatch = useDispatch();
  const { properties, quickViewPropertyId, activePropertyCord } = propertyStore;
  // const [bounds, setBounds] = useState<any>(null); if will need
  const markerClickedHandler = (id: string) => {
    const clickedProperty = properties?.find((_, i) => i === Number(id));
    if (clickedProperty) {
      dispatch(quickViewAction(clickedProperty._id));
      dispatch(activePropertyCordsAction(clickedProperty.location.cord));
    }
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  return (
    // <div className={{ props.style ? classes.Map}}>
    <div className={classes.Map}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: 'AIzaSyAtsfsGZOACHp7n2sYJZ7Z06Ku2uTasjM0' }}
        // defaultCenter={activePropertyCord}
        center={activePropertyCord}
        defaultZoom={12}
        zoom={quickViewPropertyId === '' ? 11 : 12}
        margin={[50, 50, 50, 50]}
        options={{
          scrollwheel: false,
          fullscreenControl: false,
          zoomControlOptions: { position: 7 },
          clickableIcons: false,
        }}
        onChange={(e) => {
          dispatch(
            activePropertyCordsAction({ lat: e.center.lat, lng: e.center.lng })
          );
          // setBounds({ ne: e.bounds.ne, sw: e.bounds.sw }); if will need
        }}
        onChildClick={(child) => markerClickedHandler(child)}
      >
        {properties?.map((property, i) => (
          <Marker
            overlayViewDivStyle={{ pointerEvents: 'none' }}
            lat={property.location.cord.lat}
            lng={property.location.cord.lng}
            key={i}
            price={property.price.daily}
            // clicked={() =>
            //   markerClickedHandler(property._id, property.location.cord)
            // }
            active={quickViewPropertyId === property._id}
          />
        ))}
      </GoogleMapReact>
    </div>
  );
}

export default Map;
