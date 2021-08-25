import classes from './SideFilter.module.scss';
import close from '../../assets/images/close.png';
import Button from '../Button/button';
import MultiRangeSlider from './MultiRangeSlider/MultiRangeSlider';
import CounterButton from './CounterButton/CounterButton';
import minus from '../../assets/images/minus.png';
import plus from '../../assets/images/plus.png';
import React, { useCallback, ChangeEvent } from 'react';
import Input from '../Input/Input';
import ToggleClass from './ToggleClasses/ToggleClasses';
import { toArray } from '../../utilities/objectToArr';
import { cloneDeep, debounce, filter } from 'lodash';
import { useDispatch, useSelector } from 'react-redux';
import { StoreState } from '../../store/configureStore';
import {
  changeFilterBedsRoomsAction,
  changeFilterPriceAction,
  changeFilterHouseRulesAction,
  changeFilterAreasAction,
  changeFilterFacilitiesAction,
  changeFilterAmenitiesAction,
  changeFilterPropertyTypeAction,
  clearFilterAction,
  toggleAreasAction,
  toggleFacilitiesAction,
  toggleAmenitiesAction,
  toggleHouseRulesAction,
  togglePropertyTypeAction,
} from '../../store/actions/filterActions';
import { FilterState } from '../../store/reducers/filterReducer';

interface SideFilterProps {
  toggleHandler: () => void;
}

const SideFilter: React.FC<SideFilterProps> = ({ toggleHandler }) => {
  // const [clearFilter, setClearFilter] = useState<boolean>(false);

  const dispatch = useDispatch();
  const filterSide: FilterState = useSelector(
    (state: StoreState) => state.filter
  );
  const { filterData, toggleFilterBoxes } = filterSide;

  const priceHandler = useCallback(
    debounce(({ min, max }: { min: number; max: number }) => {
      const newData = cloneDeep(filterData.priceSlider);
      newData.min = min;
      newData.max = max;
      newData.clear = false;
      dispatch(changeFilterPriceAction(newData));
    }, 300),
    [filterData]
  );

  const counterHandler = (id: string, diff: number) => {
    const newData = cloneDeep(filterData.roomsAndBeds);
    newData[id].value = newData[id].value + diff;
    dispatch(changeFilterBedsRoomsAction(newData));
  };

  const bedAndRoomsArray: {
    id: string;
    config: { value: number; text: string };
  }[] = toArray(filterData.roomsAndBeds);
  let bedsAndRooms = (
    <React.Fragment>
      {bedAndRoomsArray &&
        bedAndRoomsArray.map(({ id, config }) => {
          return (
            <div key={id} className={classes.RoomsBedsContainerRow}>
              <p>{config.text}</p>
              <div className={classes.CounterBtnsCounter}>
                <CounterButton
                  clicked={() => counterHandler(id, -1)}
                  isDisabled={config.value === 0}
                >
                  <img src={minus} />
                </CounterButton>
                <p>{config.value}</p>
                <CounterButton
                  clicked={() => counterHandler(id, 1)}
                  isDisabled={false}
                >
                  <img src={plus} />
                </CounterButton>
              </div>
            </div>
          );
        })}
    </React.Fragment>
  );

  const changePropertyTypeHandler = (
    ev: ChangeEvent<HTMLInputElement>,
    id: string
  ) => {
    const newData = cloneDeep(filterData.propertType);
    newData[id].value = ev.target.checked;
    dispatch(changeFilterPropertyTypeAction(newData));
  };
  const propertTypeArray: {
    id: string;
    config: { value: boolean; type: string; text: string };
  }[] = toArray(filterData.propertType);
  let propertyType = (
    <div className={classes.CheckboxList}>
      {propertTypeArray &&
        propertTypeArray.map(({ id, config }, index) => {
          return (
            <Input
              class={
                !toggleFilterBoxes.propertyType && index >= 6 ? 'Hide' : ''
              }
              key={id}
              type={config.type}
              value={config.value}
              label={config.text}
              changed={(ev) => changePropertyTypeHandler(ev, id)}
            />
          );
        })}
    </div>
  );

  const changeHouseRulesHandler = (
    ev: ChangeEvent<HTMLInputElement>,
    id: string
  ) => {
    const newData = cloneDeep(filterData.houseRules);
    newData[id].value = ev.target.checked;
    dispatch(changeFilterHouseRulesAction(newData));
  };
  const houseRulesArray: {
    id: string;
    config: { value: boolean; type: string; text: string };
  }[] = toArray(filterData.houseRules);
  let houseRules = (
    <div className={classes.CheckboxList}>
      {houseRulesArray &&
        houseRulesArray.map(({ id, config }, index) => {
          return (
            <Input
              class={!toggleFilterBoxes.houseRules && index >= 6 ? 'Hide' : ''}
              key={id}
              type={config.type}
              value={config.value}
              label={config.text}
              changed={(ev) => changeHouseRulesHandler(ev, id)}
            />
          );
        })}
    </div>
  );

  const changeAmenitiesHandler = (
    ev: ChangeEvent<HTMLInputElement>,
    id: string
  ) => {
    const newData = cloneDeep(filterData.amenities);
    newData[id].value = ev.target.checked;
    dispatch(changeFilterAmenitiesAction(newData));
  };
  const amenitiesArray: {
    id: string;
    config: { value: boolean; type: string; text: string };
  }[] = toArray(filterData.amenities);
  let amenities = (
    <div className={classes.CheckboxList}>
      {amenitiesArray &&
        amenitiesArray.map(({ id, config }, index) => {
          return (
            <Input
              class={!toggleFilterBoxes.amenities && index >= 6 ? 'Hide' : ''}
              key={id}
              type={config.type}
              value={config.value}
              label={config.text}
              changed={(ev) => changeAmenitiesHandler(ev, id)}
            />
          );
        })}
    </div>
  );

  const changeFacilitiesHandler = (
    ev: ChangeEvent<HTMLInputElement>,
    id: string
  ) => {
    const newData = cloneDeep(filterData.facilities);
    newData[id].value = ev.target.checked;
    dispatch(changeFilterFacilitiesAction(newData));
  };
  const facilitiesArray: {
    id: string;
    config: { value: boolean; type: string; text: string };
  }[] = toArray(filterData.facilities);
  let facilities = (
    <div className={classes.CheckboxList}>
      {facilitiesArray &&
        facilitiesArray.map(({ id, config }, index) => {
          return (
            <Input
              class={!toggleFilterBoxes.facilities && index >= 6 ? 'Hide' : ''}
              key={id}
              type={config.type}
              value={config.value}
              label={config.text}
              changed={(ev) => changeFacilitiesHandler(ev, id)}
            />
          );
        })}
    </div>
  );

  const changeAreasHandler = (
    ev: ChangeEvent<HTMLInputElement>,
    id: string
  ) => {
    const newData = cloneDeep(filterData.areas);
    newData[id].value = ev.target.checked;
    dispatch(changeFilterAreasAction(newData));
  };
  const areasArray: {
    id: string;
    config: { value: boolean; type: string; text: string };
  }[] = toArray(filterData.areas);
  let areas = (
    <div className={classes.CheckboxList}>
      {areasArray &&
        areasArray.map(({ id, config }, index) => {
          return (
            <Input
              class={!toggleFilterBoxes.areas && index >= 6 ? 'Hide' : ''}
              key={id}
              type={config.type}
              value={config.value}
              label={config.text}
              changed={(ev) => changeAreasHandler(ev, id)}
            />
          );
        })}
    </div>
  );
  const Clear = () => {
    dispatch(clearFilterAction());
  };
  const Save = () => {
    alert('Save');
  };
  return (
    <div className={classes.SideFilterContainer}>
      <div className={classes.SideFilterNav}>
        <Button clicked={toggleHandler} btnType="CloseFilter">
          <img src={close} />
          <span>Close</span>
        </Button>
        <div className={classes.ButtonsContainer}>
          <Button clicked={Clear} btnType="ClearFilter">
            Clear
          </Button>
          <Button clicked={Save} btnType="SaveFilter">
            Save
          </Button>
        </div>
      </div>
      <div className={classes.FilterSliderContainer}>
        <h2>Price</h2>
        <MultiRangeSlider
          min={filterData.priceSlider.min}
          max={filterData.priceSlider.max}
          initialMin={filterData.priceSlider.initialMin}
          initialMax={filterData.priceSlider.initialMax}
          clear={filterData.priceSlider.clear}
          onChange={priceHandler}
        />
      </div>
      <div className={classes.FilterBtnAndCheckboxContainer}>
        <div className={classes.FilterBoxes}>
          <h2>Rooms and beds</h2>
          {bedsAndRooms}
        </div>
        <div className={classes.FilterBoxes}>
          <h2>Property type</h2>
          {propertyType}
          <ToggleClass
            inputCount={propertTypeArray.length}
            show={toggleFilterBoxes.propertyType}
            text={'property types'}
            toggle={() =>
              dispatch(
                togglePropertyTypeAction(!toggleFilterBoxes.propertyType)
              )
            }
          />
        </div>
        <div className={classes.FilterBoxes}>
          <h2>House Rules</h2>
          {houseRules}
          <ToggleClass
            inputCount={houseRulesArray.length}
            show={toggleFilterBoxes.houseRules}
            text={'house rules'}
            toggle={() =>
              dispatch(toggleHouseRulesAction(!toggleFilterBoxes.houseRules))
            }
          />
        </div>
        <div className={classes.FilterBoxes}>
          <h2>Amenities</h2>
          {amenities}
          <ToggleClass
            inputCount={amenitiesArray.length}
            show={toggleFilterBoxes.amenities}
            text={'amenities'}
            toggle={() =>
              dispatch(toggleAmenitiesAction(!toggleFilterBoxes.amenities))
            }
          />
        </div>
        <div className={classes.FilterBoxes}>
          <h2>Facilities</h2>
          {facilities}
          <ToggleClass
            inputCount={facilitiesArray.length}
            show={toggleFilterBoxes.facilities}
            text={'facilities'}
            toggle={() =>
              dispatch(toggleFacilitiesAction(!toggleFilterBoxes.facilities))
            }
          />
        </div>
        <div className={classes.FilterBoxes}>
          <h2>Areas</h2>
          {areas}
          <ToggleClass
            inputCount={areasArray.length}
            show={toggleFilterBoxes.areas}
            text={'areas'}
            toggle={() => dispatch(toggleAreasAction(!toggleFilterBoxes.areas))}
          />
        </div>
      </div>
    </div>
  );
};
export default SideFilter;
