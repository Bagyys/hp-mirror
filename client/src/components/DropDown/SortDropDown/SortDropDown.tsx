import { useEffect, useRef, useState } from "react";
import classes from "./SortDropDown.module.scss";

export interface SortDropDownInterface {
  title: string;
}

function SortDropDown({ title }: SortDropDownInterface) {
  const [open, setOpen] = useState<boolean>(false);
  const toggle = (value: boolean) => {
    setOpen(value);
  };

  // TO DO: CLick outside and Toggle MultiDropdowns -- Need to refactor to more sufficient code
  // TO DO: Clean ANY type in typescript

  let menuRef: any = useRef();

  useEffect(() => {
    let handler = (event: Event) => {
      if (!menuRef.current.contains(event.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);

    return () => {
      document.removeEventListener("mousedown", handler);
    };
  }, []);

  return (
    <div ref={menuRef} className={classes.ddWrapper}>
      <div
        tabIndex={0}
        className={classes.ddHeader}
        role="button"
        onKeyPress={() => toggle(!open)}
        onClick={() => toggle(!open)}
      >
        <div className={classes.ddHeaderTitle}>
          <p>{title}</p>
        </div>
      </div>
      {open && (
        <ul className={classes.ddList}>
          <li className={classes.Default}>Default</li>
          <li>Rent (low to high)</li>
          <li>Rent (high to low)</li>
          <li>Video</li>
          <li>3D Tour</li>
          <li>Last Updated</li>
        </ul>
      )}
    </div>
  );
}

export default SortDropDown;
