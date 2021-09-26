import classes from './SideFilter.module.scss';
import MultiRangeSlider from './MultiRangeSlider/MultiRangeSlider';
import React, { useCallback, ChangeEvent } from 'react';
import ToggleClass from './ToggleClasses/ToggleClasses';
import { objecToArray } from '../../utilities/flatsFunctions';
import { cloneDeep, debounce } from 'lodash';
import { useDispatch, useSelector } from 'react-redux';
import { StoreState } from '../../store/configureStore';
import {
  changeFilterBedsRoomsAction,
  changeFilterPriceAction,
  clearFilterAction,
  toggleFilterButtonAction,
  addFormDataAction,
  toggleCheckboxesListAction,
  changeFilterInputsAction,
} from '../../store/actions/filterActions';
import { FilterState } from '../../store/reducers/filterReducer';
import Backdrop from '../../routes/components/Backdrop/Backdrop';
import {
  ApartamentInfoInterface,
  ApartamentInfoId,
  FormDataInterface,
  PriceSliderInterface,
  RoomsBedsInterface,
} from '../../store/types/filterInterface';
import CheckboxList from './CheckboxList/CheckboxList';
import BedsAndRoomsList from './BedsAndRoomsList/BedsAndRoomsList';
import FilterNav from './FilterNav/FilterNav';
const SideFilter: React.FC = () => {
  const dispatch = useDispatch();
  const filterSide: FilterState = useSelector((state: StoreState) => state.filter);
  const { filterData, showHideInputs, multiRangeSlider, isFilterOpen } = filterSide;
  const priceHandler = useCallback(
    debounce(({ min, max }: { min: number; max: number }) => {
      const newData = cloneDeep(filterData.price);
      newData.min.value = min;
      newData.max.value = max;
      dispatch(changeFilterPriceAction(newData));
    }, 300),
    [filterData.price]
  );
  const counterHandler = (id: string, diff: number) => {
    const newData = cloneDeep(filterData.roomsAndBeds);
    newData[id].value = newData[id].value + diff;
    dispatch(changeFilterBedsRoomsAction(newData));
  };

  const changeInputHandler = (ev: ChangeEvent<HTMLInputElement>, id: string, mainId: ApartamentInfoId) => {
    const newData = cloneDeep(filterData[mainId]);
    newData[id].value = ev.target.checked;
    dispatch(changeFilterInputsAction({ [mainId]: newData }));
  };

  const Clear = () => {
    dispatch(clearFilterAction());
  };
  const Save = () => {
    let formData: FormDataInterface = {} as FormDataInterface;
    const filterDataArray: {
      id: string;
      config: PriceSliderInterface | RoomsBedsInterface | ApartamentInfoInterface;
    }[] = objecToArray(filterData);
    filterDataArray.forEach(({ id, config }) => {
      let objHelper: FormDataInterface = {} as FormDataInterface;
      objecToArray(config).forEach(({ id, config }: { id: string; config: { value: string } }) => {
        objHelper = { ...objHelper, [id]: config.value };
      });
      formData = { ...formData, [id]: objHelper };
    });
    dispatch(addFormDataAction(formData));
    dispatch(toggleFilterButtonAction(false));
  };
  if (!isFilterOpen) return null;

  return (
    <React.Fragment>
      <div className={classes.SideFilterContainer}>
        <FilterNav
          save={Save}
          clear={Clear}
          close={() => dispatch(toggleFilterButtonAction(!isFilterOpen))}
        />
        <div className={classes.FilterSliderContainer}>
          <h2>Price</h2>
          <MultiRangeSlider
            min={filterData.price.min.value}
            max={filterData.price.max.value}
            initialMin={multiRangeSlider.initialMin}
            initialMax={multiRangeSlider.initialMax}
            onChange={priceHandler}
            clear={multiRangeSlider.clear}
          />
        </div>
        <div className={classes.FilterBtnAndCheckboxContainer}>
          {objecToArray(filterData)
            .filter((_, i) => i !== 0)
            .map((item, i) => {
              let title: string = item.id.split(/(?=[A-Z])/).join(' ');
              return (
                <div key={i} className={classes.FilterBoxes}>
                  <h2>{title.charAt(0).toUpperCase() + title.slice(1).toLowerCase()}</h2>
                  {i === 0 ? (
                    <BedsAndRoomsList
                      bedsAndRoomsList={objecToArray(item.config)}
                      counterHandler={counterHandler}
                    />
                  ) : (
                    <React.Fragment>
                      <CheckboxList
                        mainId={item.id}
                        checkboxList={objecToArray(item.config)}
                        changeInputHandler={changeInputHandler}
                        showHideInputs={showHideInputs[item.id]}
                      />
                      <ToggleClass
                        inputCount={objecToArray(item.config).length}
                        show={showHideInputs[item.id]}
                        text={title}
                        toggle={() => dispatch(toggleCheckboxesListAction(!showHideInputs[item.id], item.id))}
                      />
                    </React.Fragment>
                  )}
                </div>
              );
            })}
        </div>
      </div>
      <Backdrop
        isVisible={isFilterOpen}
        toggleHandler={() => dispatch(toggleFilterButtonAction(!isFilterOpen))}></Backdrop>
    </React.Fragment>
  );
};
export default SideFilter;
