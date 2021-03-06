import { MdKeyboardArrowRight, MdKeyboardArrowLeft } from 'react-icons/md';
import Carousel from 'nuka-carousel';
import { cn } from '../../utilities/joinClasses';
import classes from './ImageSlider.module.scss';

interface SliderProps {
  slides: Array<string>;
  sliderClass: string;
  height?: number;
}

const ImageSlider: React.FC<SliderProps> = ({
  slides,
  sliderClass,
  height,
}) => {
  return (
    <section className={classes.Slider}>
      <Carousel
        slideWidth={1.005}
        heightMode="max"
        dragging={true}
        swiping={true}
        transitionMode={'scroll3d'}
        renderCenterRightControls={({ nextSlide }) => (
          <MdKeyboardArrowRight
            onClick={nextSlide}
            color="#202124"
            size="4em"
            className={cn(classes.Arrow, classes.Right)}
          />
        )}
        renderCenterLeftControls={({ previousSlide }) => (
          <MdKeyboardArrowLeft
            onClick={previousSlide}
            color="#202124"
            size="4em"
            className={cn(classes.Arrow, classes.Left)}
          />
        )}
        defaultControlsConfig={{
          pagingDotsContainerClassName: classes['Dots'],
          pagingDotsStyle: {
            fill: 'white',
            opacity: 1,
          },
        }}
      >
        {slides.map((slide, index) => (
          <img
            style={height ? { height: height } : {}}
            className={classes[sliderClass]}
            key={index}
            src={slide}
          />
        ))}
      </Carousel>
    </section>
  );
};

export default ImageSlider;
