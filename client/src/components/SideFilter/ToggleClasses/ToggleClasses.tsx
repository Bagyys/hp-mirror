import React from 'react';
import classes from './ToggleClasses.module.scss';
import arrow from '../../../assets/images/arrow.png';
interface ToggleClassProps {
  toggle: () => void;
  inputCount: number;
  show: boolean;
  text: string;
}
const ToggleClass: React.FC<ToggleClassProps> = (props) => {
  return (
    <React.Fragment>
      {props.inputCount > 6 && (
        <div className={classes.ToggleBtnContainer}>
          <div
            onClick={props.toggle}
            className={props.show ? classes.Hide : classes.Show}
          >
            Show all {props.text}
            <img src={arrow} className={classes.arrow} />
          </div>
          <div
            onClick={props.toggle}
            className={props.show ? classes.Show : classes.Hide}
          >
            Show less
            <img src={arrow} className={classes.arrow} />
          </div>
        </div>
      )}
    </React.Fragment>
  );
};
export default ToggleClass;
