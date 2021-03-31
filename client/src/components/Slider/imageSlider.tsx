import { useState } from "react";

import { MdKeyboardArrowRight, MdKeyboardArrowLeft } from "react-icons/md";
import "./imageSlider.scss";

interface sliderInterface {
  slides: any;
}

const ImageSlider = ({ slides }: sliderInterface) => {
  const [current, setCurrent] = useState(0);
  const length = slides.length;

  const nextSlide = () => {
    setCurrent(current === length - 1 ? 0 : current + 1);
  };

  const prevSlide = () => {
    setCurrent(current === 0 ? length - 1 : current - 1);
  };

  if (!Array.isArray(slides) || slides.length <= 0) {
    return null;
  }

  return (
    <section className="slider">
      <MdKeyboardArrowLeft
        className="left-arrow"
        onClick={prevSlide}
        color="white"
        size="4em"
      />
      <MdKeyboardArrowRight
        className="right-arrow"
        onClick={nextSlide}
        color="white"
        size="4em"
      />
      {slides.map((slide, index) => {
        return (
          <div
            className={index === current ? "slide active" : "slide"}
            key={index}
          >
            {index === current && (
              <img src={slide} alt="Images" className="image" />
            )}
          </div>
        );
      })}
    </section>
  );
};

export default ImageSlider;
