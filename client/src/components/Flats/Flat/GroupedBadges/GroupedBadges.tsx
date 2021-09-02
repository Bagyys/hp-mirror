import Badge from '../../../Badge/Badge';
import classes from './GroupedBadges.module.scss';
interface GroupedBadgeProps {
  more1Week: boolean;
  more1Month: boolean;
}
const GroupedBadges: React.FC<GroupedBadgeProps> = (props) => (
  <div className={classes.BadgeInContent}>
    {props.more1Week && (
      <Badge badge="Badge5" title="When book one week">
        -5%
      </Badge>
    )}
    {props.more1Month && (
      <Badge badge="Badge20" title="When book one month or more">
        -20%
      </Badge>
    )}
  </div>
);
export default GroupedBadges;
