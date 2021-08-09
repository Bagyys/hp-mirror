import classes from './button.module.scss';
interface ButtonProps {
  btnType: string;
  show: boolean;
}
const Button: React.FC<ButtonProps> = (props) => {
  return (
    <button
      className={
        props.show
          ? [classes[props.btnType], classes.Show].join(' ')
          : classes[props.btnType]
      }
    >
      {props.children}
    </button>
  );
};
export default Button;
