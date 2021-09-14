//Style
import classes0 from "./chooseFlats.module.scss";
import classes1 from "../../../../components/Flats/Flat/Flat.module.scss";
import classes2 from "../../../../components/Flats/flats.module.scss";
//Components
import Flat from "../../../../components/Flats/Flat/Flat";
import { useDispatch, useSelector } from "react-redux";
import { getAllPropertiesAction } from "../../../../store/actions/propertyActions";
import { PropertyInterface } from "../../../../store/types/propertyInterfaces";

import { useEffect } from "react";
import { StoreState } from "../../../../store/configureStore";

const ChooseFlats = (props: any) => {
  console.log("Kas cia -------------------------");
  const dispatch = useDispatch();
  console.log(dispatch, "?");
  console.log(props, "ChoseFlat Props");

  useEffect(() => {
    dispatch(getAllPropertiesAction());
  }, []);
  console.log(getAllPropertiesAction(), "getAllProperties?");
  const properties: any = useSelector((state: StoreState) => state.property);
  console.log(properties, "Properties?");

  return (
    <>
      <h3>More places to stay Hamburg</h3>
      <div className={classes0.FlatLayer1}>
        {properties.properties.map((butas: any, index: number) => {
          return (
            <>
              <div className={classes0.FlatLayer}>
                <div className={classes2.FlatsContainer}>
                  <ul className={classes2.FlatsListConatiner}>
                    <li className={classes1.FlatMain}>
                      <div className={classes2.FlatContainer}>
                        <div className={classes2.FlatImg}>
                          <section>
                            <Flat
                              liked={false}
                              key={index}
                              property={butas}
                              clickedLike={function (): void {
                                throw new Error("Function not implemented.");
                              }}
                            />
                          </section>
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
              {console.log(
                props.Flat,
                "h3 colg----------------------------------------------"
              )}
            </>
          );
        })}
      </div>
    </>
  );
};

export default ChooseFlats;
