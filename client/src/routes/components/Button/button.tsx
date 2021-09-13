import classes from './button.module.scss';
import { cn } from '../../../utilities/joinClasses';
interface ButtonProps {
  isDisabled?: boolean;
  btnType: string;
  clicked?: () => void;
  bgColor?: string;
}
const Button: React.FC<ButtonProps> = (props) => {
  return (
    <button
      disabled={props.isDisabled}
      onClick={props.clicked}
      className={cn(
        classes.Btn,
        classes[props.btnType],
        classes[props.bgColor ? props.bgColor : '']
      )}
    >
      {props.children}
    </button>
  );
};
export default Button;
