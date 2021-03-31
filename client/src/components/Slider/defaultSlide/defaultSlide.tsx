import React from "react";
import classes from "./defaultSlide.module.scss";

interface ImagesInterface {
  images: Array<string>;
}

const DefaultSlide = ({ images }: ImagesInterface) => {
  return (
    <React.Fragment>
      <div className={classes.MainImage}>
        {images[0] === undefined ? (
          <img src="/no-photo.png" alt="Default" />
        ) : (
          <img src={images[0]} alt="Flat-other" />
        )}
      </div>
      <div className={classes.OtherImages}>
        <div className={classes.firstColumn}>
          {images[1] === undefined ? (
            <img src="/no-photo.png" alt="Default" />
          ) : (
            <img src={images[1]} alt="Flat-other" />
          )}
          {images[2] === undefined ? (
            <img src="/no-photo.png" alt="Default" />
          ) : (
            <img src={images[2]} alt="Flat-other" />
          )}
        </div>
        <div className={classes.secondColumn}>
          {images[3] === undefined ? (
            <img src="/no-photo.png" alt="Default" />
          ) : (
            <img src={images[3]} alt="Flat-other" />
          )}
          {images[4] === undefined ? (
            <img src="/no-photo.png" alt="Default" />
          ) : (
            <img src={images[4]} alt="Flat-other" />
          )}
        </div>
      </div>
    </React.Fragment>
  );
};

export default DefaultSlide;
