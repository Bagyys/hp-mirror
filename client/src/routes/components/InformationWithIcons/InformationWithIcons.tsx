import classes from "./InformationWithIcons.module.scss";
import single from "../../../assets/images/single.png";
import double from "../../../assets/images/double.png";
import wifi from "../../../assets/images/wifi.png";
import bath from "../../../assets/images/bath.png";
import parking from "../../../assets/images/parking.png";
import workspace from "../../../assets/images/work_space.png";
import { FacilitiesInterface } from "../../../store/types/propertyInterfaces";
import React from "react";
interface InformationWithIconsProps {
  facilities: FacilitiesInterface;
}
const InformationWithIcons: React.FC<InformationWithIconsProps> = (props) => {
  let info = <React.Fragment></React.Fragment>;
  info = (
    <React.Fragment>
      {props.facilities.bedsInTotal.double > 0 && (
        <div className={classes.Items}>
          <div className={classes.ImgContainer}>
            <img src={double} />
          </div>
          <p className={classes.Beds}>
            {`${props.facilities.bedsInTotal.double} ${
              Object.keys(props.facilities.bedsInTotal)[1]
            }`}
            <span>
              {props.facilities.bedsInTotal.double > 1 ? " beds" : " bed"}
            </span>
          </p>
        </div>
      )}
      {props.facilities.wifi && (
        <div className={classes.Items}>
          <div className={classes.ImgContainer}>
            <img src={wifi} />
          </div>
          <p>Wifi</p>
        </div>
      )}
      {props.facilities.bedsInTotal.single > 0 && (
        <div className={classes.Items}>
          <div className={classes.ImgContainer}>
            <img className={classes.Single} src={single} />
          </div>
          <p className={classes.Beds}>
            {`${props.facilities.bedsInTotal.single} ${
              Object.keys(props.facilities.bedsInTotal)[0]
            }`}
            <span>
              {props.facilities.bedsInTotal.single > 1 ? " beds" : " bed"}
            </span>
          </p>
        </div>
      )}
      {props.facilities.workspace && (
        <div className={classes.Items}>
          <div className={classes.ImgContainer}>
            <img src={workspace} />
          </div>
          <p>Workspace</p>
        </div>
      )}
      {props.facilities.parking && (
        <div className={classes.Items}>
          <div className={classes.ImgContainer}>
            <img src={parking} />
          </div>
          <p>Parking</p>
        </div>
      )}
      {props.facilities.bathrooms > 0 && (
        <div className={classes.Items}>
          <div className={classes.ImgContainer}>
            <img src={bath} />
          </div>
          <p>
            {`${props.facilities.bathrooms} ${
              props.facilities.bathrooms > 1 ? " Bathrooms" : " Bathroom"
            }`}
          </p>
        </div>
      )}
    </React.Fragment>
  );
  return <div className={classes.Container}>{info}</div>;
};
export default InformationWithIcons;
