import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleIsCalendar } from '../../../../store/actions/mainPageActions';
import { StoreState } from '../../../../store/configureStore';
import classes from './searchType.module.scss';

function SearchType() {
  const mainPage = useSelector((state: StoreState) => state.mainPage);
  const [numberToMove, setNumberToMove] = useState<number>(1);
  const dispatch = useDispatch();
  const switcher = (number: number) => {
    setNumberToMove(number);
    if (mainPage.isCalendar) {
      dispatch(toggleIsCalendar(false));
    } else {
      dispatch(toggleIsCalendar(true));
    }
  };
  useEffect(() => {
    if (mainPage.anytimeOrCalendar === 'anytime') {
      setNumberToMove(61);
    }
  }, [mainPage.anytimeOrCalendar]);

  return (
    <div className={classes.DataPicker}>
      <div onClick={() => switcher(64)} className={classes.Anytime}>
        Anytime
      </div>
      <div onClick={() => switcher(1)} className={classes.active}>
        Calendar
      </div>
      <span style={{ right: `${numberToMove}%`, top: '84%' }}></span>
    </div>
  );
}

export default SearchType;
