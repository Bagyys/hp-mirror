import React, { ChangeEvent, FC, useCallback, useEffect, useState, useRef } from 'react';
import { useMediaPredicate } from 'react-media-hook';
import classes from './MultiRangeSlider.module.scss';
import { cn } from '../../../utilities/joinClasses';

interface MultiRangeSliderProps {
  min: number;
  max: number;
  initialMin: number;
  initialMax: number;
  onChange: Function;
  clear: boolean;
}

const MultiRangeSlider: FC<MultiRangeSliderProps> = ({
  min,
  max,
  initialMin,
  initialMax,
  onChange,
  clear,
}) => {
  const [minVal, setMinVal] = useState(min);
  const [maxVal, setMaxVal] = useState(max);
  const minValRef = useRef(min);
  const maxValRef = useRef(max);
  const range = useRef<HTMLDivElement>(null);
  const isMobile = useMediaPredicate('(max-width: 675px)');

  // Convert to percentage
  const getPercent = useCallback(
    (value: number) => ((value - initialMin) / (initialMax - initialMin)) * (isMobile ? 100 : 94.25),
    [initialMin, initialMax]
  );
  // Set width of the range to decrease from the left side
  useEffect(() => {
    const minPercent = getPercent(minVal);
    const maxPercent = getPercent(maxValRef.current);
    if (range.current) {
      range.current.style.left = `${minPercent}%`;
      range.current.style.width = `${maxPercent - minPercent}%`;
    }
  }, [minVal, getPercent]);
  // Set width of the range to decrease from the right side
  useEffect(() => {
    const minPercent = getPercent(minValRef.current);
    const maxPercent = getPercent(maxVal);
    if (range.current) {
      range.current.style.width = `${maxPercent - minPercent}%`;
    }
  }, [maxVal, getPercent]);
  const clearRangeSlider = useCallback(() => {
    if (clear) {
      setMinVal(initialMin);
      setMaxVal(initialMax);
      minValRef.current = initialMin;
      maxValRef.current = initialMax;
    }
  }, [clear, initialMax, initialMin]);
  useEffect(() => {
    clearRangeSlider();
  }, [clear, clearRangeSlider]);
  // Get min and max values when their state changes
  useEffect(() => {
    onChange({ min: minVal, max: maxVal });
  }, [minVal, maxVal]);
  return (
    <div className={classes.Container}>
      <input
        type="range"
        min={initialMin}
        max={initialMax}
        value={clear ? initialMin : minVal}
        onChange={(event: ChangeEvent<HTMLInputElement>) => {
          const value = Math.min(Number(event.target.value), maxVal - 1);
          setMinVal(value);
          minValRef.current = value;
        }}
        className={cn(classes.Thumb, classes.ThumbLeft)}
        style={{ zIndex: minVal > max - 100 ? 5 : undefined }}
      />
      <input
        type="range"
        min={initialMin}
        max={initialMax}
        value={clear ? initialMax : maxVal}
        onChange={(event: ChangeEvent<HTMLInputElement>) => {
          const value = Math.max(Number(event.target.value), minVal + 1);
          setMaxVal(value);
          maxValRef.current = value;
        }}
        className={cn(classes.Thumb, classes.ThumbRight)}
      />

      <div className={classes.Slider}>
        <div className={classes.SliderTrack}></div>
        <div
          ref={range}
          className={classes.SliderRange}
          data-price-right={maxVal + '€'}
          data-price-left={minVal + '€'}></div>
        {maxVal < initialMax - 30 && <div className={classes.RightValue}>+{initialMax}€</div>}
      </div>
    </div>
  );
};

export default MultiRangeSlider;
