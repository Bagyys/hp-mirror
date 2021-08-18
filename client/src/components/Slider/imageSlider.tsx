import { MdKeyboardArrowRight, MdKeyboardArrowLeft } from 'react-icons/md';
import Carousel from 'nuka-carousel';
import { cn } from '../../utilities/joinClasses';
import classes from './ImageSlider.module.scss';

interface SliderProps {
  slides: Array<string>;
  borders: string;
}

const ImageSlider: React.FC<SliderProps> = ({ slides, borders }) => {
  return (
    <section className={classes.Slider}>
      <Carousel
        slideWidth={1.005}
        dragging={true}
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
        wrapAround={true}
      >
        {slides.map((slide, index) => (
          <img className={classes[borders]} key={index} src={slide} />
        ))}
      </Carousel>
    </section>
  );
};

export default ImageSlider;
