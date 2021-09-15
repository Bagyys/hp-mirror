import React, { ReactNode, useEffect, useRef } from 'react';
import classes from './Backdrop.module.scss';

interface BackdropProps {
  isVisible: boolean;
  toggleHandler: () => void | Function;
  children?: React.ReactNode;
}
const Backdrop: React.FC<BackdropProps> = (props) => {
  let screenHeight: number = document.documentElement.scrollHeight / 10;
  return (
    <div
      className={classes.Backdrop}
      style={{ height: `${screenHeight}rem` }}
      onClick={() => {
        console.log('clicked on Backdrop');
        props.toggleHandler();
      }}
    >
      {props.children}
    </div>
  );
};

export default Backdrop;
