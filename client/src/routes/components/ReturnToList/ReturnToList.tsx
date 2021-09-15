import classes from './ReturnToList.module.scss';
import arrow from '../../../assets/images/arrow2.png';
interface ReturnToListProps {
  goBack: () => void;
}
const ReturnToList: React.FC<ReturnToListProps> = (props) => (
  <div onClick={props.goBack} className={classes.Return}>
    <img src={arrow} />
    Return to list
  </div>
);
export default ReturnToList;
