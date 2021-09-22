import React from "react";
//Styles
import classes from "./DefaultSlide.module.scss";
//Components
import BtnShowAllPhotos from "../DefaultSlide/BtnShowAllPhotos/BtnShowAllPhotos";

interface ImagesInterface {
  images: Array<string>;
}

const DefaultSlide = ( {images} : ImagesInterface) => {
  console.log(images[0], "Default Slides Photos");
  console.log(DefaultSlide, "DefaultSlide Component");
  console.log({images}, "DefaulteSlide Images");

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
          {images[1] === undefined ? (
            <img src="/no-photo.png" alt="Default" />
          ) : (
            <img src={`/${images[1]}`} alt="Flat-other" />
          )}
          {images[2] === undefined ? (
            <img src="/no-photo.png" alt="Default" />
          ) : (
            <img src={`/${images[2]}`} alt="Flat-other" />
          )}
        </div>
        <div className={classes.secondColumn}>
          {images[3] === undefined ? (
            <img src="/no-photo.png" alt="Default" />
          ) : (
            <img src={`/${images[3]}`} alt="Flat-other" />
          )}
          {images[4] === undefined ? (
            <img src="/no-photo.png" alt="Default" />
          ) : (
            <img src={`/${images[4]}`} alt="Flat-other" />
          )}
        </div>
        <BtnShowAllPhotos />
      </div>
    </React.Fragment>
  );
};

export default DefaultSlide;
