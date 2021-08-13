import React, { ReactNode } from 'react';
import classes from './Backdrop.module.scss';

interface Props {
  isVisible: boolean;
  children?: ReactNode;
  toggleHandler: () => void | Function;
}
const Backdrop: React.FC<Props> = ({ isVisible, children, toggleHandler }) =>
  isVisible ? (
    <div
      className={classes.Backdrop}
      style={{ height: `${document.documentElement.scrollHeight / 10}rem` }}
      onClick={() => {
        console.log('clicked on Backdrop');
        toggleHandler();
      }}
    >
      {children}
    </div>
  ) : null;

export default Backdrop;
