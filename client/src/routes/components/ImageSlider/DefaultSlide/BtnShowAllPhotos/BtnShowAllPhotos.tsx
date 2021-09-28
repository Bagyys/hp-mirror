import { id } from "date-fns/locale";
import { useEffect, useState } from "react";
import Modal from "react-modal";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getOnePropertyAction } from "../../../../../store/actions/propertyActions";
import ImageSlider from "../../ImageSlider";
//Style
import classes from "./BtnShowAllPhotos.module.scss";
//TS
import { PropertyInterface } from "../../../../../store/types/propertyInterfaces";
//Reducer
import { PropertyState } from "../../../../../store/reducers/propertyReducer";
//Config
import { StoreState } from "../../../../../store/configureStore";
import { userState } from "../../../../../store/reducers/userReducer";

interface PropsInterface {
  state: {
    property: PropertyInterface;
  };
  pathname: string;
}

const BtnShowAllPhotos = (props: any) => {
  const dispatch = useDispatch();
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    dispatch(getOnePropertyAction);
  }, []);
  console.log(id, "id");

  const propertyStore: PropertyState = useSelector(
    (state: StoreState) => state.property
  );
  const properties: Array<PropertyInterface> = propertyStore.properties;
  const stateProperty = properties[0]; //need to change
  let property: PropertyInterface = {} as PropertyInterface;
  property = stateProperty;
  const auth: userState = useSelector((state: StoreState) => state.user);
  const user = auth.user;
  console.log(property, "property");
  console.log(properties, "Properties?-");
  // console.log(stateProperty, "StateProperty ?-");
  const initialState = {};

  const [modalIsOpen, setIsOpen] = useState(false);
  function openModal() {
    setIsOpen(true);
  }
  function afterOpenModal() {
    // subtitle.style.color = "#f00";
  }
  function closeModal() {
    setIsOpen(false);
  }
  return (
    <>
      <button className={classes.Button} onClick={openModal}>
        Show all photos
      </button>
      <div>
        <Modal
          isOpen={modalIsOpen}
          onAfterOpen={afterOpenModal}
          onRequestClose={closeModal}
          overlayClassName={classes.ModalOverlay}

          // className={classes.ModalStyle}
        >
          <ImageSlider sliderClass="FlatCard" slides={props.property.images} />
        </Modal>
      </div>
    </>
  );
};

export default BtnShowAllPhotos;
