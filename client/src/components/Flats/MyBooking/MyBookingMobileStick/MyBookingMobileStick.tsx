import { PropertyInterface } from '../../../../store/types/propertyInterfaces';
import Button from '../../../Button/button';
import classes from './MyBookingMobileStick.module.scss';
import eye from '../../../../assets/images/eye.png';
import door from '../../../../assets/images/door.png';
import call from '../../../../assets/images/call.png';
interface MybookingMobileProps {
  BookedProperty: PropertyInterface;
}
const MyBookingMobile: React.FC<MybookingMobileProps> = (props) => {
  return (
    <div className={classes.MyBookingMobileContainer}>
      <div className={classes.LeftSide}>
        <img src={props.BookedProperty.images[0]} alt="Apartament image" />
        <div className={classes.MyBookingInfoContainer}>
          <p className={classes.Title}>{props.BookedProperty.title}</p>
          <p className={classes.BookingDate}>2021.06.05-2021.06.16</p>
        </div>
      </div>
      <div className={classes.MyBookingBtnsContainer}>
        <Button
          clicked={() => console.log('labas')}
          btnType="MyBookingMobile"
          bgColor="Blue"
        >
          <img src={eye} alt="eye" />
        </Button>
        <Button
          clicked={() => console.log('labas')}
          btnType="MyBookingMobile"
          bgColor="Orange"
        >
          <img src={door} alt="door" />
        </Button>
        <Button
          clicked={() => console.log('labas')}
          btnType="MyBookingMobile"
          bgColor="Red"
        >
          <img src={call} alt="call" />
        </Button>
      </div>
    </div>
  );
};
export default MyBookingMobile;
