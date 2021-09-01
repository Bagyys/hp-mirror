import classes from './CounterButton.module.scss';
import { cn } from '../../../utilities/joinClasses';
interface CounterButtonProps {
  isDisabled: boolean;
  btnType: string;
  clicked?: () => void;
}
const CounterButton: React.FC<CounterButtonProps> = (props) => {
  return (
    <button
      disabled={props.isDisabled}
      className={cn(classes.Button, classes[props.btnType])}
      onClick={props.clicked}
    >
      {props.children}
    </button>
  );
};
export default CounterButton;
