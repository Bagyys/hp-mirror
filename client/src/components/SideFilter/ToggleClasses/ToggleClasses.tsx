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
        <div onClick={props.toggle} className={classes.ToggleBtnContainer}>
          <div className={props.show ? classes.Hide : classes.Show}>
            Show all <span style={{ textTransform: 'lowercase' }}>{props.text}</span>
            <img src={arrow} className={classes.ArrowDown} alt="arrow" />
          </div>
          <div className={props.show ? classes.Show : classes.Hide}>
            Show less
            <img src={arrow} className={classes.ArrowUp} alt="arrow" />
          </div>
        </div>
      )}
    </React.Fragment>
  );
};
export default ToggleClass;
