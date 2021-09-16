import React from 'react';
import Button from '../../../routes/components/Button/button';
import classes from './BedsAndRoomsList.module.scss';
import minus from '../../../assets/images/minus.png';
import plus from '../../../assets/images/plus.png';
interface BedsAndRoomsListProps {
  bedsAndRoomsList: {
    id: string;
    config: { value: number; text: string };
  }[];
  counterHandler: (id: string, diff: number) => void;
}
const BedsAndRoomsList: React.FC<BedsAndRoomsListProps> = (props) => (
  <React.Fragment>
    {props.bedsAndRoomsList &&
      props.bedsAndRoomsList.map(({ id, config }) => {
        return (
          <div key={id} className={classes.RoomsBedsContainerRow}>
            <p>{config.text}</p>
            <div className={classes.CounterBtnsCounter}>
              <Button
                btnType="FilterRoomsAndBedsCounter"
                clicked={() => props.counterHandler(id, -1)}
                isDisabled={config.value === 0}
              >
                <img src={minus} />
              </Button>
              <p>{config.value}</p>
              <Button
                btnType="FilterRoomsAndBedsCounter"
                clicked={() => props.counterHandler(id, 1)}
                isDisabled={false}
              >
                <img src={plus} />
              </Button>
            </div>
          </div>
        );
      })}
  </React.Fragment>
);
export default BedsAndRoomsList;
