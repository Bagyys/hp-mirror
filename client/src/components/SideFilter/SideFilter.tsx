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
import { FormDataInterface } from '../../store/types/filterInterface';
import CheckboxList from './CheckboxList/CheckboxList';
import BedsAndRoomsList from './BedsAndRoomsList/BedsAndRoomsList';
import FilterNav from './FilterNav/FilterNav';
const SideFilter: React.FC = () => {
  const dispatch = useDispatch();
  const filterSide: FilterState = useSelector(
    (state: StoreState) => state.filter
  );
  const { filterData, showHideInputs, multiRangeSlider, isFilterOpen } =
    filterSide;
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

  const changeInputHandler = (
    ev: ChangeEvent<HTMLInputElement>,
    id: string,
    mainId: string
  ) => {
    const newData = cloneDeep(filterData[mainId]);
    newData[id].value = ev.target.checked;
    dispatch(changeFilterInputsAction(newData, mainId));
  };

  const Clear = () => {
    dispatch(clearFilterAction());
  };

  const Save = () => {
    let formData: FormDataInterface = {} as FormDataInterface;
    const filterDataArray = objecToArray(filterData);
    filterDataArray.map(({ id, config }) => {
      let objHelper = {};
      objecToArray(config).map(({ id, config }) => {
        objHelper = { ...objHelper, [id]: config.value };
      });
      formData = { ...formData, [id]: objHelper };
    });
    dispatch(addFormDataAction(formData));
    dispatch(toggleFilterButtonAction(false));
  };
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
            clear={multiRangeSlider.clear}
            onChange={priceHandler}
          />
        </div>
        <div className={classes.FilterBtnAndCheckboxContainer}>
          {objecToArray(filterData)
            .filter((_, i) => i !== 0)
            .map((item, i) => {
              let title = item.id.split(/(?=[A-Z])/).join(' ');
              return (
                <div key={i} className={classes.FilterBoxes}>
                  <h2>{title}</h2>
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
                        toggle={() =>
                          dispatch(
                            toggleCheckboxesListAction(
                              !showHideInputs[item.id],
                              item.id
                            )
                          )
                        }
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
        toggleHandler={() => dispatch(toggleFilterButtonAction(!isFilterOpen))}
      ></Backdrop>
    </React.Fragment>
  );
};
export default SideFilter;
