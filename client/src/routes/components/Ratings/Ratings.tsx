import classes from './Ratings.module.scss';
import { BsStarFill } from 'react-icons/bs';
interface RatingsProps {
  overallRating: number;
  ratingsCount: number;
}
const Ratings: React.FC<RatingsProps> = (props) => (
  <div className={classes.RatingsContainer}>
    <div className={classes.Ratings}>
      <BsStarFill size="1.16em" color="#4d94e8" />
      <span>{props.overallRating}</span>
    </div>
    <div className={classes.Reviews}>
      ( {props.ratingsCount}
      <span> reviews</span> )
    </div>
  </div>
);
export default Ratings;
