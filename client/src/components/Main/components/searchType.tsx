import classes from "../main.module.scss";

interface SearchTypeProps {
  choose: () => void;
}

function SearchType(props: SearchTypeProps) {
  return (
    <div className={classes.DataPicker}>
      <div onClick={() => props.choose()} className={classes.Anytime}>
        Anytime
      </div>
      <div onClick={() => props.choose()} className={classes.active}>
        Calendar
      </div>
    </div>
  );
}

export default SearchType;
