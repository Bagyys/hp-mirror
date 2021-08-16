import classes from './InformationWithIcons.module.scss';
import single from '../../../../assets/images/single.png';
import double from '../../../../assets/images/double.png';
import wifi from '../../../../assets/images/wifi.png';
import bath from '../../../../assets/images/bath.png';
import parking from '../../../../assets/images/parking.png';
import workspace from '../../../../assets/images/workspace.png';
import { FacilitiesInterface } from '../../../../store/types/propertyInterfaces';
import React from 'react';
interface InformationWithIconsProps {
  facilities: FacilitiesInterface;
}
const InformationWithIcons: React.FC<InformationWithIconsProps> = (props) => {
  let info = <React.Fragment></React.Fragment>;
  info = (
    <React.Fragment>
      {props.facilities.bedsTest.double > 0 && (
        <div className={classes.Items}>
          <div className={classes.ImgContainer}>
            <img src={double} />
          </div>
          <span className={classes.Beds}>
            {`${props.facilities.bedsTest.double} ${
              Object.keys(props.facilities.bedsTest)[1]
            }`}
          </span>
          <span>{props.facilities.bedsTest.double > 1 ? ' beds' : ' bed'}</span>
        </div>
      )}
      {props.facilities.wifi && (
        <div className={classes.Items}>
          <div className={classes.ImgContainer}>
            <img src={wifi} />
          </div>
          <span>Wifi</span>
        </div>
      )}
      {props.facilities.bedsTest.single > 0 && (
        <div className={classes.Items}>
          <div className={classes.ImgContainer}>
            <img src={single} />
          </div>
          <span className={classes.Beds}>
            {`${props.facilities.bedsTest.single} ${
              Object.keys(props.facilities.bedsTest)[0]
            }`}
          </span>
          <span>{props.facilities.bedsTest.single > 1 ? ' beds' : ' bed'}</span>
        </div>
      )}
      {props.facilities.workspace && (
        <div className={classes.Items}>
          <div className={classes.ImgContainer}>
            <img src={workspace} />
          </div>
          <span>Workspace</span>
        </div>
      )}
      {props.facilities.parking && (
        <div className={classes.Items}>
          <div className={classes.ImgContainer}>
            <img src={parking} />
          </div>
          <span>Parking</span>
        </div>
      )}
      {props.facilities.bathrooms > 0 && (
        <div className={classes.Items}>
          <div className={classes.ImgContainer}>
            <img src={bath} />
          </div>
          <span>
            {`${props.facilities.bathrooms} ${
              props.facilities.bathrooms > 1 ? ' Bathrooms' : ' Bathroom'
            }`}
          </span>
        </div>
      )}
    </React.Fragment>
  );
  return <div className={classes.Container}>{info}</div>;
};
export default InformationWithIcons;
