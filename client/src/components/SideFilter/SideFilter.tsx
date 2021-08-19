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
import { cloneDeep } from 'lodash';
const filterData = {
  priceSlider: {
    min: 0,
    max: 200,
  },
  roomsAndBeds: {
    beds: { value: 0, text: 'Beds' },
    bedrooms: { value: 0, text: 'Bedrooms' },
    bathrooms: { value: 0, text: 'Bathrooms' },
  },
  propertType: {
    house: { value: false, type: 'checkbox', text: 'House' },
    loft: { value: false, type: 'checkbox', text: 'Loft' },
    appartament: { value: false, type: 'checkbox', text: 'Apartament' },
    singleRoom: { value: false, type: 'checkbox', text: 'Single room' },
    studioFlat: { value: false, type: 'checkbox', text: 'Studio flat' },
    boat: { value: false, type: 'checkbox', text: 'Boat' },
  },
  houseRules: {
    petAllowed: { value: false, type: 'checkbox', text: 'Pet allowed' },
    smoking: { value: false, type: 'checkbox', text: 'Smoking' },
  },
  amenities: {
    airConditioning: {
      value: false,
      type: 'checkbox',
      text: 'Air conditioning',
    },
    healing: { value: false, type: 'checkbox', text: 'Healing' },
    kitchen: { value: false, type: 'checkbox', text: 'Kitchen' },
    washer: { value: false, type: 'checkbox', text: 'Washer' },
    balcon: { value: false, type: 'checkbox', text: 'Balcon' },
    carPark: { value: false, type: 'checkbox', text: 'Car park' },
  },
  facilities: {
    freeParkin: { value: false, type: 'checkbox', text: 'Free parking' },
    pool: { value: false, type: 'checkbox', text: 'Pool' },
    gym: { value: false, type: 'checkbox', text: 'Gym' },
    terrace: { value: false, type: 'checkbox', text: 'Terrace' },
    balcony: { value: false, type: 'checkbox', text: 'Balcony' },
  },
  areas: {
    hamburg: { value: false, type: 'checkbox', text: 'Hamburg' },
    altona: { value: false, type: 'checkbox', text: 'Altona' },
    mitte: { value: false, type: 'checkbox', text: 'Mitte' },
    nort: { value: false, type: 'checkbox', text: 'Nort' },
    bergedorf: { value: false, type: 'checkbox', text: 'Bergedorf' },
    wendsbeck: { value: false, type: 'checkbox', text: 'Wendsbeck' },
    test: { value: false, type: 'checkbox', text: 'Test' },
  },
};
interface SideFilterProps {
  toggleHandler: () => void;
}
interface FilterDataProps {
  priceSlider: {
    [key: string]: number;
  };
  roomsAndBeds: {
    [key: string]: { value: number; text: string };
  };
  propertType: {
    [key: string]: { value: boolean; type: string; text: string };
  };
  houseRules: {
    [key: string]: { value: boolean; type: string; text: string };
  };
  amenities: {
    [key: string]: { value: boolean; type: string; text: string };
  };
  facilities: {
    [key: string]: { value: boolean; type: string; text: string };
  };
  areas: {
    [key: string]: { value: boolean; type: string; text: string };
  };
}
const SideFilter: React.FC<SideFilterProps> = ({ toggleHandler }) => {
  const [filter, setFilter] = useState<FilterDataProps>(filterData);
  const [showPropertyType, setShowPropertyType] = useState<boolean>(false);
  const [showHouseRules, setShowHouseRules] = useState<boolean>(false);
  const [showAmenities, setShowAmenities] = useState<boolean>(false);
  const [showFacilities, setShowFacilities] = useState<boolean>(false);
  const [showAreas, setShowAreas] = useState<boolean>(false);
  const [clearFilter, setClearFilter] = useState<boolean>(false);
  const priceHandler = useCallback(
    ({ min, max }: { min: number; max: number }) => {
      const newArr = cloneDeep(filter);
      newArr['priceSlider'] = { min, max };
      setFilter(newArr);
    },
    [filter]
  );
  const counterHandler = (key: string, diff: number) => {
    const newArr = cloneDeep(filter);
    const newArrRoomsAndBeds = { ...newArr.roomsAndBeds[key] };
    newArrRoomsAndBeds.value = newArrRoomsAndBeds.value + diff;
    newArr.roomsAndBeds[key] = newArrRoomsAndBeds;
    setFilter(newArr);
  };

  const bedAndRoomsArray: {
    id: string;
    config: { value: number; text: string };
  }[] = toArray(filter.roomsAndBeds);
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
    setFilter(filterData);
    setClearFilter(true);
  };
  const Save = () => {
    alert('Save');
  };

  const changePropertyTypeHandler = (
    ev: ChangeEvent<HTMLInputElement>,
    id: string
  ) => {
    const newArr = cloneDeep(filter);
    const newArrProperties = { ...newArr.propertType[id] };
    newArrProperties.value = ev.target.checked;
    newArr.propertType[id] = newArrProperties;
    setFilter(newArr);
  };
  const propertTypeArray: {
    id: string;
    config: { value: boolean; type: string; text: string };
  }[] = toArray(filter.propertType);
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
    const newArr = cloneDeep(filter);
    const newArrProperties = { ...newArr.houseRules[id] };
    newArrProperties.value = ev.target.checked;
    newArr.houseRules[id] = newArrProperties;
    setFilter(newArr);
  };
  const houseRulesArray: {
    id: string;
    config: { value: boolean; type: string; text: string };
  }[] = toArray(filter.houseRules);
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
    const newArr = cloneDeep(filter);
    const newArrProperties = { ...newArr.amenities[id] };
    newArrProperties.value = ev.target.checked;
    newArr.amenities[id] = newArrProperties;
    setFilter(newArr);
  };
  const amenitiesArray: {
    id: string;
    config: { value: boolean; type: string; text: string };
  }[] = toArray(filter.amenities);
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
    const newArr = cloneDeep(filter);
    const newArrProperties = { ...newArr.facilities[id] };
    newArrProperties.value = ev.target.checked;
    newArr.facilities[id] = newArrProperties;
    setFilter(newArr);
  };
  const facilitiesArray: {
    id: string;
    config: { value: boolean; type: string; text: string };
  }[] = toArray(filter.facilities);
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
    const newArr = cloneDeep(filter);
    const newArrProperties = { ...newArr.areas[id] };
    newArrProperties.value = ev.target.checked;
    newArr.areas[id] = newArrProperties;
    setFilter(newArr);
  };
  const areasArray: {
    id: string;
    config: { value: boolean; type: string; text: string };
  }[] = toArray(filter.areas);
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
        <MultiRangeSlider
          min={filter.priceSlider.min}
          max={filter.priceSlider.max}
          initialMin={filterData.priceSlider.min}
          initialMax={filterData.priceSlider.max}
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
