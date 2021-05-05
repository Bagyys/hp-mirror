const compareHourObjects = (dbHours, inputHours) => {
  hoursToSave = {};
  for (let i = 0; i < 24; i++) {
    let hour = {};
    if (
      dbHours[i] === true ||
      inputHours[i] === "unavailable" ||
      inputHours[i] === "selected"
    ) {
      hour = { [i]: true };
    } else {
      hour = { [i]: false };
    }
    hoursToSave = { ...hoursToSave, ...hour };
  }
  return hoursToSave;
};
