import { BsStarFill } from "react-icons/bs";
//Styles
import classes from "./commentsSection.module.scss";
import profile from "../../../../assets/images/profile.png";

const CommentsSection = () => {
  return (
    <>
      <div className={classes.BorderLine}></div>
      <div className={classes.ReviewsLayer}>
        <h4 className={classes.Reviews}>Reviews</h4>
        <div className={classes.StarRating}>
          <BsStarFill size="2.6em" color="#4886ff" />
          <span className={classes.RatingNumber}>4.75 </span>
          <span className={classes.Reviews}>(7 Reviews) </span>
        </div>
      </div>
      <div className={classes.CommnetLayer}>
        <div className={classes.Collumn}>
          <div className={classes.CommentBox}>
            <img src={profile} alt="profile" />
            <div className={classes.CommentInfo}>
              <span>Lilia Swnson</span>
              <span className={classes.date}>October 2020</span>
              <p>
                Very clean appartment, comfortable and big bed, large bathroom.
                Close to bus and train station. Clean appartment, comfortable
                and big bed, large bathroom. Close to bus and train station
              </p>
            </div>
          </div>
          <div className={classes.CommentBox}>
            <img src={profile} alt="profile" />
            <div className={classes.CommentInfo}>
              <span>Lilia Swnson</span>
              <span className={classes.date}>October 2020</span>
              <p>
                Very clean appartment, comfortable and big bed, large bathroom.
                Close to bus and train station. Clean appartment, comfortable
                and big bed, large bathroom. Close to bus and train station
              </p>
            </div>
          </div>
          <div className={classes.CommentBox}>
            <img src={profile} alt="profile" />
            <div className={classes.CommentInfo}>
              <span>Lilia Swnson</span>
              <span className={classes.date}>October 2020</span>
              <p>
                Very clean appartment, comfortable and big bed, large bathroom.
                Close to bus and train station. Clean appartment, comfortable
                and big bed, large bathroom. Close to bus and train station
              </p>
            </div>
          </div>
          <div className={classes.CommentBox}>
            <img src={profile} alt="profile" />
            <div className={classes.CommentInfo}>
              <span>Lilia Swnson</span>
              <span className={classes.date}>October 2020</span>
              <p>
                Very clean appartment, comfortable and big bed, large bathroom.
                Close to bus and train station. Clean appartment, comfortable
                and big bed, large bathroom. Close to bus and train station
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className={classes.BorderLine}></div>
    </>
  );
};
export default CommentsSection;
