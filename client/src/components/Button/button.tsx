import classes from './button.module.scss';
import { cn } from '../../utilities/joinClasses';
interface ButtonProps {
  btnType: string;
  show?: boolean;
  clicked?: () => void;
}
const Button: React.FC<ButtonProps> = (props) => {
  return (
    <button
      onClick={props.clicked}
      className={cn(
        classes.Btn,
        classes[props?.btnType],
        props.show ? classes.Show : ''
      )}
    >
      {props.children}
    </button>
  );
};
export default Button;
