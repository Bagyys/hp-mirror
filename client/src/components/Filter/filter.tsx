import classes from "./filter.module.scss";
import LoupeImg from "../../assets/images/loupe.png";
import Dropdown from "../DropDown/DropDown";
import CustomDropDown from "../DropDown/DropDownTypes/customDropDown";
import SortDropDown from "../DropDown/SortDropDown/SortDropDown";
import { BsArrowUpDown } from "react-icons/bs";
import { BsBell } from "react-icons/bs";

function Filter() {
  const priceData = [
    {
      id: 1,
      value: "100",
    },
    {
      id: 2,
      value: "200",
    },
    {
      id: 3,
      value: "300",
    },
  ];

  const typeData = [
    {
      id: 1,
      value: "Apartments",
    },
    {
      id: 2,
      value: "Houses",
    },
    {
      id: 3,
      value: "Condos",
    },
    {
      id: 4,
      value: "Townhomes",
    },
  ];

  const lifeStyleData = [
    {
      id: 1,
      value: "Student",
    },
    {
      id: 2,
      value: "Senior Housing",
    },
    {
      id: 3,
      value: "Short Term",
    },
    {
      id: 4,
      value: "Military Housing",
    },
    {
      id: 5,
      value: "Corporate Housing",
    },
  ];

  const saved = () => {
    alert("Successfully saved search");
  };

  return (
    <div className={classes.Filter}>
      <div className={classes.FilterWrapper}>
        <div className={classes.SearchInputs}>
          <div className={classes.input}>
            <img src={LoupeImg} alt="Search icon" />
            <input type="search" placeholder="Frankfrut, Germany"></input>
          </div>
          <div className={classes.optionButtons}>
            <Dropdown title="Price" items={priceData} type="mixed" />
            <Dropdown title="Type" items={typeData} type="list" />
            <Dropdown title="Beds" items={[]} type="beds" />
            <Dropdown title="Lifestyle" items={lifeStyleData} type="list" />
            <Dropdown title="Move-In Date" items={[]} type="calendar" />
            <Dropdown
              title="More"
              items={[]}
              type="custom"
              customComponent={<CustomDropDown />}
            />
          </div>
        </div>
        <div className={classes.Sorting}>
          <div className={classes.Sort}>
            <SortDropDown title="Sort" />
            <BsArrowUpDown size="2em" color="#4886ff" />
          </div>
          <div onClick={() => saved()} className={classes.Save}>
            <p>Save</p>
            <BsBell size="2em" color="#4886ff" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Filter;
