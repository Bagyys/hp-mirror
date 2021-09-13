import classes from './Badge.module.scss';
import { cn } from '../../../utilities/joinClasses';
interface BadgeProps {
  title?: string;
  badge: string;
}
const Badge: React.FC<BadgeProps> = (props) => {
  return (
    <div
      data-title={props.title}
      className={cn(classes.Badge, classes[props.badge])}
    >
      {props.children}
    </div>
  );
};
export default Badge;
