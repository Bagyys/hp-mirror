import React from 'react';
import classes from './AboutPlace.module.scss';
interface AboutPlaceProps {
  description: string;
}
const AboutPlace: React.FC<AboutPlaceProps> = (props) => (
  <React.Fragment>
    <h3 className={classes.Title}>About the place</h3>
    <p className={classes.Description}>{props.description}</p>
  </React.Fragment>
);
export default AboutPlace;
