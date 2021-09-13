import React from 'react';
import classes from './AboutPlace.module.scss';
const AboutPlace: React.FC = ({ children }) => (
  <div className={classes.AboutPlaceContainer}>
    <h3 className={classes.Title}>About the place</h3>
    <p className={classes.Description}>{children}</p>
  </div>
);
export default AboutPlace;
