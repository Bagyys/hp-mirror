import classes from './LongBadge.module.scss';
import { cn } from '../../../../utilities/joinClasses';
interface LongBadgeProps {
  badge: string;
}
const LongBadge: React.FC<LongBadgeProps> = (props) => (
  <div className={cn(classes.Badge, classes[props.badge])}>
    {props.children}
  </div>
);
export default LongBadge;
