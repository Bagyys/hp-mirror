import React from 'react';
import classes from './AboutPlace.module.scss';

const AboutPlace: React.FC = ({ children }) => (
  <React.Fragment>
    <h3 className={classes.Title}>About the place</h3>
    <p className={classes.Description}>{children}</p>
  </React.Fragment>
);
export default AboutPlace;
