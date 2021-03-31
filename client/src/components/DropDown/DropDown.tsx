import { useEffect, useRef, useState } from "react";
import classes from "./DropDown.module.scss";
import arrow from "../../assets/images/arrowDown.png";
export interface DropDownInterface {
  title: string;
  items?: any;
  type: string;
  customComponent?: JSX.Element;
}

interface itemInterface {
  id: number;
  value: string;
}

function DropDown({ title, items, type, customComponent }: DropDownInterface) {
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
        <div className={classes.ddHeaderAction}>
          <p>
            {open ? (
              <img className={classes.ArrowClose} src={arrow} alt="Close" />
            ) : (
              <img className={classes.ArrowOpen} src={arrow} alt="Open" />
            )}
          </p>
        </div>
      </div>
      {open && (
        <ul className={classes.ddList}>
          {type !== "list" && type !== "calendar" && type !== "custom" ? (
            <div className={classes.inputs}>
              <input
                type="tel"
                pattern="\$?(\d|\,)*"
                maxLength={type === "mixed" ? 6 : 1}
                placeholder={type === "mixed" ? "Min Price" : "Min Beds"}
              />
              <span>-</span>
              <input
                type="tel"
                pattern="\$?(\d|\,)*"
                maxLength={type === "mixed" ? 6 : 1}
                placeholder={type === "mixed" ? "Max Price" : "Max Beds"}
              />
            </div>
          ) : null}

          <div className={classes.list}>
            {type === "mixed" ? (
              <li className={classes.Active}>
                <span>No Min</span>
              </li>
            ) : null}

            {type !== "calendar" && type !== "custom" ? (
              items.map((item: itemInterface) => {
                if (type === "mixed") {
                  return (
                    <li key={item.id}>
                      <span>{item.value}€</span>
                    </li>
                  );
                } else if (type === "list") {
                  return (
                    <li className={classes.ddItem} key={item.id}>
                      <input type="checkbox" name="checkBox" />
                      <label htmlFor="checkBox">{item.value}(Totals)</label>
                    </li>
                  );
                } else {
                  return null;
                }
              })
            ) : (
              <div>
                {type === "calendar" ? (
                  <input type="date" />
                ) : (
                  <div>{customComponent}</div>
                )}
              </div>
            )}
          </div>
        </ul>
      )}
    </div>
  );
}

export default DropDown;
