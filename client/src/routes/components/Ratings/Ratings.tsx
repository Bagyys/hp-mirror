//Style
import classes from "./Ratings.module.scss";
//Icons
import { BsStarFill } from "react-icons/bs";
//Utilities
import { cn } from "../../../utilities/joinClasses";
interface RatingsProps {
  overallRating: number;
  ratingsCount: number;
  
  active: boolean;
}
const Ratings: React.FC<RatingsProps> = (props) => (
  <div
    className={cn(
      props.active ? classes.ContainerRating : classes.RatingsContainer
    )}
  >
    <div className={cn(props.active ? classes.RatingNumber : classes.Ratings)}>
      <BsStarFill size={"1.16em"} color="#4d94e8" />
      <span>{props.overallRating}</span>
    </div>
    <div className={cn(props.active ? classes.ActiveReviews : classes.Reviews)}>
      ( {props.ratingsCount}
      <span> reviews</span> )
    </div>
  </div>
);
export default Ratings;
