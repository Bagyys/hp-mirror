import classes from './CounterButton.module.scss';
interface CounterButtonProps {
  isDisabled: boolean;
  clicked?: () => void;
}
const CounterButton: React.FC<CounterButtonProps> = (props) => {
  return (
    <button
      disabled={props.isDisabled}
      className={classes.Button}
      onClick={props.clicked}
    >
      {props.children}
    </button>
  );
};
export default CounterButton;
