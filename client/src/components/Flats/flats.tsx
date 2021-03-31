import classes from "./flats.module.scss";
import { Link } from "react-router-dom";
import newImg from "../../assets/images/flash.png";
import phoneImg from "../../assets/images/phone.png";
import LikeImg from "../../assets/images/like.png";
import updateArrow from "../../assets/images/loading.png";
import Slider from "../Slider/imageSlider";
export interface FlatInterface {
  id: number;
  price: number;
  rooms: number;
  beds: number;
  type: string;
  title: string;
  isAvailable: boolean;
  oneMonthFree: boolean;
  description: string;
  mainImage: string;
  mostRecent: boolean;
  address: string;
  phone: string;
  logoImage: string;
  isAirConditioning: boolean;
  isWasherDryerInUnit: boolean;
  isWasherDryerHookups: boolean;
  isDishwasher: boolean;
  isWheelchairAccess: boolean;
  isParking: boolean;
  isLaundryFacilities: boolean;
  isFitnessCenter: boolean;
  isPool: boolean;
  isElevator: boolean;
  isDogFriendly: boolean;
  isCatFriendly: boolean;
  isFurnished: boolean;
  isLofts: boolean;
  isUtilitiesIncluded: boolean;
  isCreatedAt: string;
  images?: any;
  occupiedTime: any;
  occupiedByHour?: any;
}

function Flats() {
  const boxNew = (
    <div className={classes.NEW}>
      <img src={newImg} alt="New!" />
      <p>New</p>
    </div>
  );

  const like = () => {
    alert("Successfully added to favorites");
  };

  const fictionalFlats = [
    {
      id: 1,
      price: 110,
      rooms: 2,
      beds: 2,
      type: "Studio",
      title: "Pleasure At Germany",
      isAvailable: true,
      oneMonthFree: true,
      description:
        "Bacon ipsum dolor amet tongue buffalo alcatra salami fatback t-bone, shankle chicken pork belly rump. Meatloaf salami boudin beef ribs brisket, jowl pork chop tenderloin landjaeger. Corned beef cupim salami hamburger beef. Pork chop flank ham chuck, shoulder prosciutto turkey pastrami ball tip shankle ground round tail chislic. Shoulder landjaeger sausage kevin buffalo. Bresaola boudin alcatra ball tip.",
      mainImage: "/flat2.jpg",
      images: [
        "/flat.jpg",
        "/flat2.jpg",
        "/flat3.jpg",
        "/flat4.jpg",
        "/flat5.jpg",
        "/flat6.jpg",
        "/flat7.jpg",
        "/flat8.jpg",
        "/flat8.jpg",
        "/flat8.jpg",
        "/flat8.jpg",
        "/flat8.jpg",
        "/flat8.jpg",
        "/flat8.jpg",
        "/flat8.jpg",
        "/flat8.jpg",
      ],
      logoImage: "/flatLogo.png",
      mostRecent: true,
      address: "930 W Altgeld St, Chicago, IL 60614",
      phone: "847-440-3110",
      isAirConditioning: true,
      isWasherDryerInUnit: false,
      isWasherDryerHookups: false,
      isDishwasher: true,
      isWheelchairAccess: true,
      isParking: true,
      isLaundryFacilities: false,
      isFitnessCenter: true,
      isPool: true,
      isElevator: true,
      isDogFriendly: true,
      isCatFriendly: true,
      isFurnished: true,
      isLofts: true,
      isUtilitiesIncluded: true,
      isCreatedAt: "2/26/2021 2:28",
      occupiedTime: [
        {
          date: new Date("April 2, 2021 00:00"),
          isRented: false,
          isWholeDayRented: false,
          rentedHours: [
            new Date("April 2, 2021 00:00"),
            new Date("April 2, 2021 01:00"),
            new Date("April 2, 2021 02:00"),
          ],
        },
        {
          date: new Date("April 3, 2021 00:00"),
          isRented: true,
          isWholeDayRented: true,
          rentedHours: [],
        },
        {
          date: new Date("April 4, 2021 00:00"),
          isRented: true,
          isWholeDayRented: false,
          rentedHours: [
            new Date("April 4, 2021 00:00"),
            new Date("April 4, 2021 01:00"),
            new Date("April 4, 2021 02:00"),
            new Date("April 4, 2021 03:00"),
          ],
        },
      ],
      occupiedByHour: [
        new Date("March 29, 2021 18:00"),
        new Date("March 29, 2021 12:00"),
        new Date("March 29, 2021 14:00"),
        new Date("March 29, 2021 15:00"),
        new Date("March 30, 2021 00:00"),
        new Date("March 30, 2021 02:00"),
        new Date("March 30, 2021 04:00"),
      ],
    },
    {
      id: 2,
      price: 210,
      rooms: 4,
      beds: 3,
      type: "Apartment",
      title: "Frankfrut Apartments",
      isAvailable: false,
      oneMonthFree: false,
      description:
        "Bacon ipsum dolor amet tongue buffalo alcatra salami fatback t-bone, shankle chicken pork belly rump. Meatloaf salami boudin beef ribs brisket, jowl pork chop tenderloin landjaeger. Corned beef cupim salami hamburger beef. Pork chop flank ham chuck, shoulder prosciutto turkey pastrami ball tip shankle ground round tail chislic. Shoulder landjaeger sausage kevin buffalo. Bresaola boudin alcatra ball tip.",
      mainImage: "/flat.jpg",
      images: ["/flat2.jpg", "/flat.jpg", "/flat2.jpg"],
      logoImage: "/flatLogo.png",
      mostRecent: false,
      address: "930 W Altgeld St, Chicago, IL 60614",
      phone: "847-440-3110",
      isAirConditioning: true,
      isWasherDryerInUnit: true,
      isWasherDryerHookups: true,
      isDishwasher: true,
      isWheelchairAccess: true,
      isParking: true,
      isLaundryFacilities: true,
      isFitnessCenter: true,
      isPool: true,
      isElevator: true,
      isDogFriendly: true,
      isCatFriendly: true,
      isFurnished: true,
      isLofts: true,
      isUtilitiesIncluded: true,
      isCreatedAt: "9/26/2020 2:28",
      occupiedTime: [
        new Date("March 29, 2021"),
        new Date("March 30, 2021"),
        new Date("April 12, 2021"),
      ],
      occupiedByHour: [
        new Date("March 27, 2021 19:00"),
        new Date("March 29, 2021 12:00"),
        new Date("March 29, 2021 14:00"),
        new Date("March 29, 2021 15:00"),
        new Date("March 30, 2021 00:00"),
        new Date("March 30, 2021 02:00"),
        new Date("March 30, 2021 04:00"),
      ],
    },
    {
      id: 3,
      price: 50,
      rooms: 1,
      beds: 1,
      type: "Apartment",
      title: "Guest House Frankfrut",
      isAvailable: true,
      oneMonthFree: true,
      description:
        "Bacon ipsum dolor amet tongue buffalo alcatra salami fatback t-bone, shankle chicken pork belly rump. Meatloaf salami boudin beef ribs brisket, jowl pork chop tenderloin landjaeger. Corned beef cupim salami hamburger beef. Pork chop flank ham chuck, shoulder prosciutto turkey pastrami ball tip shankle ground round tail chislic. Shoulder landjaeger sausage kevin buffalo. Bresaola boudin alcatra ball tip.",
      mainImage: "./flat2.jpg",
      images: ["/flat2.jpg", "/flat.jpg", "/flat2.jpg"],
      logoImage: "/flatLogo.png",
      mostRecent: false,
      address: "930 W Altgeld St, Chicago, IL 60614",
      phone: "847-440-3110",
      isAirConditioning: true,
      isWasherDryerInUnit: true,
      isWasherDryerHookups: true,
      isDishwasher: true,
      isWheelchairAccess: true,
      isParking: true,
      isLaundryFacilities: true,
      isFitnessCenter: true,
      isPool: true,
      isElevator: true,
      isDogFriendly: true,
      isCatFriendly: true,
      isFurnished: true,
      isLofts: true,
      isUtilitiesIncluded: true,
      isCreatedAt: "3/16/2021 2:28",
      occupiedTime: [
        new Date("March 29, 2021"),
        new Date("March 30, 2021"),
        new Date("April 12, 2021"),
      ],
      occupiedByHour: [
        new Date("March 27, 2021 18:00"),
        new Date("March 29, 2021 12:00"),
        new Date("March 29, 2021 14:00"),
        new Date("March 29, 2021 15:00"),
        new Date("March 30, 2021 00:00"),
        new Date("March 30, 2021 02:00"),
        new Date("March 30, 2021 04:00"),
      ],
    },
    {
      id: 4,
      price: 75,
      rooms: 5,
      beds: 2,
      type: "Studio",
      title: "Hostel Frankfrut",
      isAvailable: true,
      oneMonthFree: false,
      description:
        "Bacon ipsum dolor amet tongue buffalo alcatra salami fatback t-bone, shankle chicken pork belly rump. Meatloaf salami boudin beef ribs brisket, jowl pork chop tenderloin landjaeger. Corned beef cupim salami hamburger beef. Pork chop flank ham chuck, shoulder prosciutto turkey pastrami ball tip shankle ground round tail chislic. Shoulder landjaeger sausage kevin buffalo. Bresaola boudin alcatra ball tip.",
      mainImage: "./flat.jpg",
      images: ["/flat2.jpg", "/flat.jpg", "/flat2.jpg"],
      logoImage: "/flatLogo.png",
      mostRecent: true,
      address: "930 W Altgeld St, Chicago, IL 60614",
      phone: "847-440-3110",
      isAirConditioning: true,
      isWasherDryerInUnit: true,
      isWasherDryerHookups: true,
      isDishwasher: true,
      isWheelchairAccess: true,
      isParking: true,
      isLaundryFacilities: true,
      isFitnessCenter: true,
      isPool: true,
      isElevator: true,
      isDogFriendly: true,
      isCatFriendly: true,
      isFurnished: true,
      isLofts: true,
      isUtilitiesIncluded: true,
      isCreatedAt: "2/16/2021 2:28",
      occupiedTime: [
        new Date("March 29, 2021"),
        new Date("March 30, 2021"),
        new Date("April 4, 2021"),
      ],
      occupiedByHour: [
        new Date("March 27, 2021 18:00"),
        new Date("March 29, 2021 12:00"),
        new Date("March 29, 2021 14:00"),
        new Date("March 29, 2021 15:00"),
        new Date("March 30, 2021 00:00"),
        new Date("March 30, 2021 02:00"),
        new Date("March 30, 2021 04:00"),
      ],
    },
  ];
  return (
    <div className={classes.Flats}>
      <ul>
        {fictionalFlats.map((flat: FlatInterface, index: number) => {
          let today = new Date();
          let createdOn = new Date(flat.isCreatedAt);
          let msInDay = 24 * 60 * 60 * 1000;
          createdOn.setHours(0, 0, 0, 0);
          today.setHours(0, 0, 0, 0);
          let diff = (+today - +createdOn) / msInDay;
          let daysDiff = Math.floor(diff);
          let publishedAt = (
            <div className={classes.PublishedAt}>
              <img src={updateArrow} alt="Days-Ago" />
              <p>{daysDiff} Days Ago</p>
            </div>
          );
          return (
            <li className={classes.flat} key={index}>
              <div className={classes.aboutFlat}>
                <div className={classes.TitleAndAddress}>
                  <h1>{flat.title}</h1>
                  <p>{flat.address}</p>
                </div>

                <div className={classes.LogoSide}>
                  <a
                    href="https://booking.com"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <img src={flat.logoImage} alt="Flat-Logo" />
                  </a>
                  <div className={classes.toFavorites}>
                    <img src={LikeImg} alt="Favorites" onClick={() => like()} />
                  </div>
                </div>
              </div>
              <div className={classes.flatContent}>
                <div className={classes.flatImg}>
                  <Slider slides={flat.images} />
                </div>
                <div className={classes.rightSide}>
                  <div className={classes.top}>
                    {flat.mostRecent ? boxNew : publishedAt}
                    {flat.oneMonthFree ? <p>1 Month Free Rent</p> : null}
                  </div>
                  <div className={classes.SpecInfo}>
                    <h2 className={classes.price}>{flat.price}€</h2>
                    {/* <h2>Rooms {flat.rooms}</h2> */}
                    <h2 className={classes.beds}>
                      {flat.type} - {flat.beds} Beds
                    </h2>
                    {flat.isAvailable ? (
                      <h2>Avail. Now</h2>
                    ) : (
                      <h2>Not Avail.</h2>
                    )}

                    <p className={classes.AdditionalInfo}>
                      {flat.isAirConditioning ? "Air Conditioning, " : null}
                      {flat.isWasherDryerInUnit
                        ? "Washer/Dryer - In Unit, "
                        : flat.isWasherDryerHookups
                        ? "Washer/Dryer - In Unit, "
                        : flat.isLaundryFacilities
                        ? "Washer/Dryer - In Unit, "
                        : null}
                      {flat.isWheelchairAccess ? "Wheelchair Access, " : null}
                      {flat.isParking ? "Parking, " : null}
                      {flat.isFitnessCenter ? "Fitness Center, " : null}
                      {flat.isPool ? "Pool, " : null}
                      {flat.isElevator ? "Elevator, " : null}
                      {flat.isDogFriendly ? "Dog Friendly, " : null}
                      {flat.isCatFriendly ? "Cat Friendly, " : null}
                      {flat.isFurnished ? "Furnished, " : null}
                      {flat.isLofts ? "Lofts, " : null}
                      {flat.isUtilitiesIncluded ? "Utilities Included, " : null}
                    </p>
                    <a className={classes.Phone} href="tel:847-440-3110">
                      <img src={phoneImg} alt="Flat-Phone-Number" />
                      {flat.phone}
                    </a>
                    <button>
                      <Link
                        to={{
                          pathname: `/flat/${flat.id}`,
                          state: { flat: flat },
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
    </div>
  );
}

export default Flats;
