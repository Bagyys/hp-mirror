import React from "react";
//Styles
import classes from "./DefaultSlide.module.scss";
//Components
import BtnShowAllPhotos from "../DefaultSlide/BtnShowAllPhotos/BtnShowAllPhotos";

interface ImagesInterface {
  images: Array<string>;
}

const DefaultSlide = ({ images }: ImagesInterface) => {
  console.log(images[0], "Default Slides Photos");
  return (
    <React.Fragment>
      <div className={classes.MainImage}>
        {images[0] === undefined ? (
          <img src={`"/no-photo.png`} alt="Default" />
        ) : (
          <img src={`/${images[0]}`} alt="Flat-other" />
        )}
      </div>
      <div className={classes.OtherImages}>
        <div className={classes.firstColumn}>
          {images[0] === undefined ? (
            <img src="/no-photo.png" alt="Default" />
          ) : (
            <img src={`/${images[0]}`} alt="Flat-other" />
          )}
          {images[0] === undefined ? (
            <img src="/no-photo.png" alt="Default" />
          ) : (
            <img src={`/${images[0]}`} alt="Flat-other" />
          )}
        </div>
        <div className={classes.secondColumn}>
          {images[0] === undefined ? (
            <img src="/no-photo.png" alt="Default" />
          ) : (
            <img src={`/${images[0]}`} alt="Flat-other" />
          )}
          {images[0] === undefined ? (
            <img src="/no-photo.png" alt="Default" />
          ) : (
            <img src={`/${images[0]}`} alt="Flat-other" />
          )}
        </div>
        <BtnShowAllPhotos />
      </div>
    </React.Fragment>
  );
};

export default DefaultSlide;
