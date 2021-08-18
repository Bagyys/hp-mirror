import classes from './Ratings.module.scss';
import ratingStar from '../../../../assets/images/rating_star.png';
interface RatingsProps {
  overallRating: number;
  ratingsCount: number;
}
const Ratings: React.FC<RatingsProps> = (props) => (
  <div className={classes.RatingsContainer}>
    <div className={classes.Ratings}>
      <img src={ratingStar} />
      <span>{props.overallRating}</span>
    </div>
    <div className={classes.Reviews}>
      ( {props.ratingsCount}
      <span> reviews</span> )
    </div>
  </div>
);
export default Ratings;
