import classes from './DiscountBadge.module.scss';
import { cn } from '../../utilities/joinClasses';
interface BadgeProps {
  badge: string;
  title: string;
  badgeHover: string;
  inContent: boolean;
}
const DiscountBadge: React.FC<BadgeProps> = (props) => {
  return (
    <div
      data-title={props.title}
      className={cn(
        classes.badge,
        classes[props.inContent ? props.badgeHover : ''],
        classes[props.badge]
      )}
    >
      -{props.children}%
    </div>
  );
};
export default DiscountBadge;
