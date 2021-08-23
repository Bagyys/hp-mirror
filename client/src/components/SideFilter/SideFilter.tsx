import classes from './SideFilter.module.scss';
import close from '../../assets/images/close.png';
import Button from '../Button/button';
import MultiRangeSlider from './MultiRangeSlider/MultiRangeSlider';
import CounterButton from './CounterButton/CounterButton';
import minus from '../../assets/images/minus.png';
import plus from '../../assets/images/plus.png';
import React, { useCallback, useState, ChangeEvent } from 'react';
import Input from '../Input/Input';
import ToggleClass from './ToggleClasses/ToggleClasses';
import { toArray } from '../../utilities/objectToArr';
import { cloneDeep, debounce } from 'lodash';
import { useDispatch, useSelector } from 'react-redux';
import { StoreState } from '../../store/configureStore';
import {
  changeFilterBedsRoomsAction,
  changeFilterPriceAction,
} from '../../store/actions/filterActions';
import { FilterState } from '../../store/reducers/filterReducer';

interface SideFilterProps {
  toggleHandler: () => void;
}

const SideFilter: React.FC<SideFilterProps> = ({ toggleHandler }) => {
  // const [filter, setFilter] = useState<FilterDataProps>(filterDatas);
  const [showPropertyType, setShowPropertyType] = useState<boolean>(false);
  const [showHouseRules, setShowHouseRules] = useState<boolean>(false);
  const [showAmenities, setShowAmenities] = useState<boolean>(false);
  const [showFacilities, setShowFacilities] = useState<boolean>(false);
  const [showAreas, setShowAreas] = useState<boolean>(false);
  const [clearFilter, setClearFilter] = useState<boolean>(false);

  const dispatch = useDispatch();
  const filterSide: FilterState = useSelector(
    (state: StoreState) => state.filter
  );
  const { filterData } = filterSide;
  const priceHandler = debounce(
    useCallback(
      ({ min, max }: { min: number; max: number }) => {
        const newData = { min, max };
        dispatch(changeFilterPriceAction(newData));
      },
      [filterData]
    ),
    300
  );
  console.log(filterData.priceSlider);
  const counterHandler = (key: string, diff: number) => {
    const newData = cloneDeep(filterData.roomsAndBeds);
    newData[key].value = newData[key].value + diff;
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
  const Clear = () => {
    alert('Clear');
    setClearFilter(true);
  };
  const Save = () => {
    alert('Save');
  };

  const changePropertyTypeHandler = (
    ev: ChangeEvent<HTMLInputElement>,
    id: string
  ) => {
    const newData = cloneDeep(filterData);
    const newDataProperties = { ...newData.propertType[id] };
    newDataProperties.value = ev.target.checked;
    newData.propertType[id] = newDataProperties;
    // dispatch(changeFilterDataAction(newData));
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
              class={!showPropertyType && index >= 6 ? 'Hide' : ''}
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
    const newData = cloneDeep(filterData);
    const newDataProperties = { ...newData.houseRules[id] };
    newDataProperties.value = ev.target.checked;
    newData.houseRules[id] = newDataProperties;
    // dispatch(changeFilterDataAction(newData));
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
              class={!showHouseRules && index >= 6 ? 'Hide' : ''}
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
    const newData = cloneDeep(filterData);
    const newDataProperties = { ...newData.amenities[id] };
    newDataProperties.value = ev.target.checked;
    newData.amenities[id] = newDataProperties;
    // dispatch(changeFilterDataAction(newData));
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
              class={!showAmenities && index >= 6 ? 'Hide' : ''}
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
    const newData = cloneDeep(filterData);
    const newDataProperties = { ...newData.facilities[id] };
    newDataProperties.value = ev.target.checked;
    newData.facilities[id] = newDataProperties;
    // dispatch(changeFilterDataAction(newData));
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
              class={!showFacilities && index >= 6 ? 'Hide' : ''}
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
    const newData = cloneDeep(filterData);
    const newDataProperties = { ...newData.areas[id] };
    newDataProperties.value = ev.target.checked;
    newData.areas[id] = newDataProperties;
    // dispatch(changeFilterDataAction(newData));
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
              class={!showAreas && index >= 6 ? 'Hide' : ''}
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
          initialMin={0}
          initialMax={200}
          clear={clearFilter}
          onChange={priceHandler}
          clearHandler={() => setClearFilter(false)}
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
            show={showPropertyType}
            text={'property types'}
            toggle={() => setShowPropertyType(!showPropertyType)}
          />
        </div>
        <div className={classes.FilterBoxes}>
          <h2>House Rules</h2>
          {houseRules}
          <ToggleClass
            inputCount={houseRulesArray.length}
            show={showHouseRules}
            text={'house rules'}
            toggle={() => setShowHouseRules(!showHouseRules)}
          />
        </div>
        <div className={classes.FilterBoxes}>
          <h2>Amenities</h2>
          {amenities}
          <ToggleClass
            inputCount={amenitiesArray.length}
            show={showAmenities}
            text={'amenities'}
            toggle={() => setShowAmenities(!showAmenities)}
          />
        </div>
        <div className={classes.FilterBoxes}>
          <h2>Facilities</h2>
          {facilities}
          <ToggleClass
            inputCount={facilitiesArray.length}
            show={showFacilities}
            text={'facilities'}
            toggle={() => setShowFacilities(!showFacilities)}
          />
        </div>
        <div className={classes.FilterBoxes}>
          <h2>Areas</h2>
          {areas}
          <ToggleClass
            inputCount={areasArray.length}
            show={showAreas}
            text={'areas'}
            toggle={() => setShowAreas(!showAreas)}
          />
        </div>
      </div>
    </div>
  );
};
export default SideFilter;
