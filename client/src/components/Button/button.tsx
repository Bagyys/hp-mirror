import classes from './button.module.scss';
import { cn } from '../../utilities/joinClasses';
interface ButtonProps {
  btnType: string;
  clicked?: () => void;
}
const Button: React.FC<ButtonProps> = (props) => {
  return (
    <button
      type="submit"
      onClick={props.clicked}
      className={cn(classes.Btn, classes[props.btnType])}
    >
      {props.children}
    </button>
  );
};
export default Button;
