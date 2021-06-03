import React, { ReactNode } from "react";
import classes from "./Backdrop.module.scss";

interface Props {
  isVisible: boolean;
  children: ReactNode;
  toggleHandler: (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => void | Function;
}
const Backdrop: React.FC<Props> = ({ isVisible, children, toggleHandler }) =>
  isVisible ? (
    <div
      className={classes.Backdrop}
      onClick={(e) => {
        console.log("clicked on Backdrop");
        toggleHandler(e);
      }}
    >
      {children}
    </div>
  ) : null;

export default Backdrop;
