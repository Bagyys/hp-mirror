import React, { Component } from "react";
//Style
import classes from "./flatInfo.module.scss";
//Component
import AppartmentsRewie from "./AppartmentsRewie/AppartmentsRewie";

const FlatInfo = () => {
  return (
    <>
      <div className={classes.Layer}>
        <AppartmentsRewie />
        <h1>About the place</h1>
        <h1>Whats this place offers</h1>
        <form>Payment and reservation info</form>
      </div>
    </>
  );
};
export default FlatInfo;