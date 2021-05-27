import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Slider from "../Slider/imageSlider";
import { StoreState } from "../../store/configureStore";
import { PropertyProps } from "../../store/reducers/propertyReducer";
import { getAllPropertiesAction } from "../../store/actions/propertyActions";

import newImg from "../../assets/images/flash.png";
import phoneImg from "../../assets/images/phone.png";
import LikeImg from "../../assets/images/like.png";

import classes from "./flats.module.scss";

const Flats: React.FC = () => {
  const dispatch = useDispatch();
  const properties = useSelector((state: StoreState) => state.properties);

  useEffect(() => {
    dispatch(getAllPropertiesAction());
  }, []);

  const boxNew = (
    <div className={classes.NEW}>
      <img src={newImg} alt="New!" />
      <p>New</p>
    </div>
  );

  const like = () => {
    alert("Successfully added to favorites");
  };

  let propertiesRender = <></>;
  if (properties) {
    propertiesRender = (
      <ul>
        {properties.map((property: PropertyProps, index: number) => {
          return (
            <li className={classes.flat} key={index}>
              <div className={classes.aboutFlat}>
                <div className={classes.TitleAndAddress}>
                  <h1>{property.title}</h1>
                  <p>
                    {property.location.addressString1}, {property.location.city}
                    , {property.location.zipcode} {property.location.country}
                  </p>
                </div>

                <div className={classes.LogoSide}>
                  <a
                    href="https://booking.com"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <img src="" alt="Flat-Logo" />
                  </a>
                  <div className={classes.toFavorites}>
                    <img src={LikeImg} alt="Favorites" onClick={() => like()} />
                  </div>
                </div>
              </div>
              <div className={classes.flatContent}>
                <div className={classes.flatImg}>
                  <Slider slides={property.images} />
                </div>
                <div className={classes.rightSide}>
                  <div className={classes.top}>
                    {boxNew}
                    <p>1 Month Free Rent</p>
                  </div>
                  <div className={classes.SpecInfo}>
                    <h2 className={classes.price}>{property.price.daily}€</h2>
                    <h2 className={classes.beds}>
                      {property.type} - {property.facilities.beds} Beds
                    </h2>
                    <h2>Avail. Now</h2>
                    <p className={classes.AdditionalInfo}>
                      {property.facilities.airConditioning
                        ? "Air Conditioning, "
                        : null}
                      {property.facilities.washingMachine
                        ? "Washer/Dryer - In Unit, "
                        : null}
                      {property.facilities.disabilityAccess
                        ? "Wheelchair Access, "
                        : null}
                      {property.facilities.parking ? "Parking, " : null}
                      {property.facilities.petFriendly
                        ? "Pet Friendly, "
                        : null}
                    </p>
                    <a className={classes.Phone} href="tel:847-440-3110">
                      <img src={phoneImg} alt="Flat-Phone-Number" />
                      {/* {property.phone} */}
                      +370 655 12345
                    </a>
                    <button>
                      <Link
                        to={{
                          pathname: `/flat/${property._id}`,
                          state: { property: property },
                        }}
                      >
                        Check Availability
                      </Link>
                    </button>
                  </div>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    );
  }
  return <div className={classes.Flats}>{propertiesRender}</div>;
};

export default Flats;
