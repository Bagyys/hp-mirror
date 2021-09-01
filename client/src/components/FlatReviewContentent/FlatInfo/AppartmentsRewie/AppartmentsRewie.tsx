import React from "react";

//Style
import classes from "./appartmentsRewie.module.scss";

const AppartmentsRewie = () => {
  return (
    <>
      <div className={classes.Layer}>
        <div>
          <p>Studio appartments in city center</p>
        </div>
        <div>
          <button>Share</button>
          <button>Save</button>
        </div>
      </div>
      <div>
        <p>3 guest 2 beds 1 private bath Wifi</p>
      </div>
      <div>
        <p>Start 4.75</p>
        <p>(7reviews)</p>
      </div>
    </>
  );
};
export default AppartmentsRewie;
