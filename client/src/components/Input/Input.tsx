import { ChangeEvent } from 'react';
import classes from './Input.module.scss';
import { cn } from '../../utilities/joinClasses';
type Props = {
  changed?(ev: ChangeEvent<HTMLInputElement>): void;
  value: boolean;
  label: string;
  type: string;
  class: string;
};

const Input: React.FC<Props> = (props) => {
  let inputElement: null | JSX.Element = null;
  switch (props.type) {
    case 'input':
      inputElement = (
        <input
          checked={props.value}
          type={props.type}
          onChange={props.changed}
        />
      );
      break;
    default:
      inputElement = (
        <input
          className={classes.InputCheck}
          type={props.type}
          checked={props.value}
          onChange={props.changed}
        />
      );
  }
  return (
    <div className={cn(classes.Input, classes[props.class])}>
      {inputElement}
      <label className={classes.Label}>{props.label}</label>
    </div>
  );
};
export default Input;
