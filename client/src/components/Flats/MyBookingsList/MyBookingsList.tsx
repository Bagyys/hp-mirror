import React from 'react';
import { useDispatch } from 'react-redux';
import MyBooking from '../../../routes/components/MyBooking/MyBooking';
import MyBookingMobile from '../../../routes/components/MyBookingMobileStick/MyBookingMobileStick';
import { myBookingQuickViewAction } from '../../../store/actions/propertyActions';
import { PropertyInterface } from '../../../store/types/propertyInterfaces';
import classes from './MyBookingsList.module.scss';
interface MyBookingListProps {
  properties: PropertyInterface[];
  isMobile: boolean;
  myBookingQuickViewId: string;
}
//Fake data, veliau sutvarkyti kai bus galimi uzsakymai
const MyBookingList: React.FC<MyBookingListProps> = (props) => {
  const dispatch = useDispatch();
  const myBookingQuickViewHandler = (id: string) => {
    dispatch(myBookingQuickViewAction(id));
  };
  const closeMyBookingQuickViewHandler = () => {
    dispatch(myBookingQuickViewAction(''));
  };
  return props.properties?.length > 0 ? (
    <div className={classes.MyBookingsContainer}>
      <h2>Your Bookings</h2>
      <ul className={classes.MyBookingsList}>
        {props.properties.map((property) => (
          <MyBooking
            key={property._id}
            close={closeMyBookingQuickViewHandler}
            myBookingQuickViewClicked={() =>
              myBookingQuickViewHandler(property._id)
            }
            isQuickViewed={
              props.myBookingQuickViewId !== '' &&
              props.myBookingQuickViewId === property._id
            }
            bookedProperty={property}
          />
        ))}
      </ul>
      {/* Veliau padaryti pagal artimiausia data */}
      {props.isMobile && (
        <MyBookingMobile
          key={props.properties[0]._id}
          BookedProperty={props.properties[0]}
        />
      )}
    </div>
  ) : (
    <React.Fragment></React.Fragment>
  );
};
export default MyBookingList;
