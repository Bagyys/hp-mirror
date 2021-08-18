import classes from './DiscountBadge.module.scss';
import { cn } from '../../../../utilities/joinClasses';
interface BadgeProps {
  title?: string;
  badgeHover: string;
}
const DiscountBadge: React.FC<BadgeProps> = (props) => {
  return (
    <div
      data-title={props.title}
      className={cn(classes.Badge, classes[props.badgeHover])}
    >
      {props.children}
    </div>
  );
};
export default DiscountBadge;
