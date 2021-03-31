const { Door } = require("../models/doorModel");
let debug = require("debug");

exports.getDoor = async (req, res) => {
  const data = req.query;
  const doorID = req.query.id;

  try {
    if (!req.query.t || req.query.t !== "A3%nm*Wb") {
      return res.status(404).send("netu metki");
    }
    let updatedDoor;

    if (data.n2 === "1") {
      // n2 keiciu i 0, o2 keiciu i 0
      updatedDoor = await Door.findOneAndUpdate(
        { doorID: doorID },
        {
          $set: {
            door: {
              i1: data.i1,
              i2: data.i2,
              i3: data.i3,
              i4: data.i4,
              i5: data.i5,

              i6: data.i6,
              i7: data.i7,
              i8: data.i8,
              i9: data.i9,
              n1: data.n1,
              n2: 0,
              n3: data.n3,
              o1: data.o1,
              o2: 0,
              o3: data.o3,
            },
          },
        },
        { new: true }
      );

      if (updatedDoor === null) {
        return res.status(404).send("No doors found by ID");
      }
    }
    if (data.n1 === "1") {
      updatedDoor = await Door.findOneAndUpdate(
        { doorID: doorID },
        {
          $set: {
            door: {
              i1: data.i1,
              i2: data.i2,
              i3: data.i3,
              i4: data.i4,
              i5: data.i5,
              i6: data.i6,
              i7: data.i7,
              i8: data.i8,
              i9: data.i9,
              n1: 0,
              n2: data.n2,
              n3: data.n3,
              o1: 0,
              o2: data.o2,
              o3: data.o3,
            },
          },
        },
        { new: true }
      );
      if (updatedDoor === null) {
        return res.status(404).send("No doors found by ID");
      }
    }
    console.log(updatedDoor, "ud");
    let i1 = updatedDoor.door.i1;
    let i2 = updatedDoor.door.i2;
    let i3 = updatedDoor.door.i3;
    let i4 = updatedDoor.door.i4;
    let i5 = updatedDoor.door.i5;
    let i6 = updatedDoor.door.i6;
    let i7 = updatedDoor.door.i7;
    let i8 = updatedDoor.door.i8;
    let i9 = updatedDoor.door.i9;
    let n1 = updatedDoor.door.n1;
    let n2 = updatedDoor.door.n2;
    // console.log(n2, "n2");
    let n3 = updatedDoor.door.n3;
    let o1 = updatedDoor.door.o1;
    // console.log(o1, "o1");
    let o2 = updatedDoor.door.o2;
    let o3 = updatedDoor.door.o3;
    let e = updatedDoor.door.e;

    // URL EXAMPLE

    // A3%nm*Wb_ID=Lg18299RHS10MxSh_&i1=1_&i2=1_&i3=1_&i4=1_&i5=1_&i6=1_&i7=1_&i8=1_&i9=1_&n1=1_&n2=1_&n3=1_&o1=0_&o2=0_&o3=0_&e=0

    let result = `A3%nm*Wb&ID=Lg18299RHS10MxSh&i1=${i1}&$i2=${i2}&i3=${i3}&i4=${i4}&i5=${i5}&i6=${i6}&i7=${i7}&i8=${i8}&i9=${i9}&n1=${n1}&n2=${n2}&n3=${n3}&o1=${o1}&o2=${o2}&o3=${o3}&e=${e}`;

    return res.status(200).send(result);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

exports.doorSwitch = async (req, res) => {
  const data = req.query;
  const doorID = req.query.id;
  console.log(data, "data");
  console.log(data.o2, "data");

  try {
    if (!req.query.t || req.query.t !== "A3%nm*Wb") {
      return res.status(404).send("netu metki");
    }
    let switchDoor;
    let test = await Door.findOne({ doorID: doorID });
    console.log(test);
    if (data.o1 != undefined && data.o2 === undefined) {
      switchDoor = await Door.findOneAndUpdate(
        { doorID: doorID },
        {
          $set: {
            "door.o1": data.o1,
          },
        },
        { new: true }
      );
      if (switchDoor === undefined) {
        return res.status(404).send("No doors found by ID");
      }
    }
    if (data.o1 === undefined && data.o2 !== undefined) {
      switchDoor = await Door.findOneAndUpdate(
        { doorID: doorID },
        {
          $set: {
            "door.o2": data.o2,
          },
        },
        { new: true }
      );
      if (switchDoor === null) {
        return res.status(404).send("No doors found by ID");
      }
    }
    console.log(switchDoor, "switch door");

    // console.log(switchDoor, "switch door");
    // let i1 = updatedDoor.door.i1;
    // let i2 = updatedDoor.door.i2;
    // let i3 = updatedDoor.door.i3;
    // let i4 = updatedDoor.door.i4;
    // let i5 = updatedDoor.door.i5;
    // let i6 = updatedDoor.door.i6;
    // let i7 = updatedDoor.door.i7;
    // let i8 = updatedDoor.door.i8;
    // let i9 = updatedDoor.door.i9;
    // let n1 = updatedDoor.door.n1;
    // let n2 = updatedDoor.door.n2;
    // // console.log(n2, "n2");
    // let n3 = updatedDoor.door.n3;
    // let o1 = updatedDoor.door.o1;
    // // console.log(o1, "o1");
    // let o2 = updatedDoor.door.o2;
    // let o3 = updatedDoor.door.o3;
    // let e = updatedDoor.door.e;

    // URL EXAMPLE

    // A3%nm*Wb_ID=Lg18299RHS10MxSh_&i1=1_&i2=1_&i3=1_&i4=1_&i5=1_&i6=1_&i7=1_&i8=1_&i9=1_&n1=1_&n2=1_&n3=1_&o1=0_&o2=0_&o3=0_&e=0

    // let result = `A3%nm*Wb&ID=Lg18299RHS10MxSh&i1=${i1}&$i2=${i2}&i3=${i3}&i4=${i4}&i5=${i5}&i6=${i6}&i7=${i7}&i8=${i8}&i9=${i9}&n1=${n1}&n2=${n2}&n3=${n3}&o1=${o1}&o2=${o2}&o3=${o3}&e=${e}`;

    return res.status(200).send("success");
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

exports.getDoor2 = async (req, res) => {
  const data = req.query;
  console.log("data");
  console.log(data);
  const doorID = req.query.id;
  if (data.o1 === undefined || data.o2 === undefined || data.n2 === undefined) {
    return res.status(404).send("netu parametrof");
  }
  try {
    if (!req.query.h || req.query.h !== "A3%nm*Wb") {
      return res.status(404).send("netu metki");
    }
    let updatedDoor;
    let dataInDb = await Door.findOne({ doorID: doorID });
    console.log("dataInDb");
    console.log(dataInDb);
    console.log("dataInDb.door.o1");
    console.log(dataInDb.door.o1);
    console.log("dataInDb.door.o2");
    console.log(dataInDb.door.o2);
    //gauname o1===0, o2===0, n2===0
    if (data.o1 === "0" && data.o2 === "0" && data.n2 === "0") {
      //tikriname DB o1 ir 02
      // jei o1 ir o2 lygus 0
      if (dataInDb.door.o1 == 0 && dataInDb.door.o2 == 0) {
        let i1 = dataInDb.door.i1;
        let i2 = dataInDb.door.i2;
        let i3 = dataInDb.door.i3;
        let i4 = dataInDb.door.i4;
        let i5 = dataInDb.door.i5;
        let i6 = dataInDb.door.i6;
        let i7 = dataInDb.door.i7;
        let i8 = dataInDb.door.i8;
        let i9 = dataInDb.door.i9;
        let n1 = data.n1;
        let n2 = data.n2;
        let n3 = data.n3;
        let o1 = dataInDb.door.o1;
        let o2 = dataInDb.door.o2;
        let o3 = dataInDb.door.o3;
        let e = data.e;

        // URL EXAMPLE
        // A3%nm*Wb_ID=Lg18299RHS10MxSh_&i1=1_&i2=1_&i3=1_&i4=1_&i5=1_&i6=1_&i7=1_&i8=1_&i9=1_&n1=1_&n2=1_&n3=1_&o1=0_&o2=0_&o3=0_&e=0

        // ciklas nulis
        // return o1, o2 ir n2 kaip requeste
        let result = `A3%nm*Wb&ID=Lg18299RHS10MxSh&i1=${i1}&$i2=${i2}&i3=${i3}&i4=${i4}&i5=${i5}&i6=${i6}&i7=${i7}&i8=${i8}&i9=${i9}&n1=${n1}&n2=${n2}&n3=${n3}&o1=${o1}&o2=${o2}&o3=${o3}&e=${e}`;
        return res.status(200).send(result);
        // jei o1 arba o2 DB lygus 1
      } else if (dataInDb.door.o1 == 1 || dataInDb.door.o2 == 1) {
        console.log(true);
        let i1 = dataInDb.door.i1;
        let i2 = dataInDb.door.i2;
        let i3 = dataInDb.door.i3;
        let i4 = dataInDb.door.i4;
        let i5 = dataInDb.door.i5;
        let i6 = dataInDb.door.i6;
        let i7 = dataInDb.door.i7;
        let i8 = dataInDb.door.i8;
        let i9 = dataInDb.door.i9;
        let n1 = data.n1;
        let n2 = 1;
        let n3 = data.n3;
        let o1 = dataInDb.door.o1;
        let o2 = dataInDb.door.o2;
        let o3 = dataInDb.door.o3;
        let e = data.e;

        // URL EXAMPLE
        // A3%nm*Wb_ID=Lg18299RHS10MxSh_&i1=1_&i2=1_&i3=1_&i4=1_&i5=1_&i6=1_&i7=1_&i8=1_&i9=1_&n1=1_&n2=1_&n3=1_&o1=0_&o2=0_&o3=0_&e=0

        // return o1 arba o2 (ta, kuris lygus 1) ir n2=1
        let result = `A3%nm*Wb&ID=Lg18299RHS10MxSh&i1=${i1}&$i2=${i2}&i3=${i3}&i4=${i4}&i5=${i5}&i6=${i6}&i7=${i7}&i8=${i8}&i9=${i9}&n1=${n1}&n2=${n2}&n3=${n3}&o1=${o1}&o2=${o2}&o3=${o3}&e=${e}`;
        return res.status(200).send(result);
      }
      //gauname o1===1 arba o2===1, n2===1
    } else if ((data.o1 === "1" || data.o2 === "1") && data.n2 === "1") {
      //tikriname DB o1 ir o2
      // jei DB o1 ar o2 buvo 1, keiciame i 0
      // return o1 arba o2 0 ir n2 1

      if (data.o1 === "1" && dataInDb.door.o1 == 1) {
        updatedDoor = await Door.findOneAndUpdate(
          { doorID: doorID },
          {
            $set: {
              door: {
                i1: data.i1,
                i2: data.i2,
                i3: data.i3,
                i4: data.i4,
                i5: data.i5,
                i6: data.i6,
                i7: data.i7,
                i8: data.i8,
                i9: data.i9,
                n1: 0,
                n2: 1,
                n3: data.n3,
                o1: 0,
                o2: +data.o2,
                o3: data.o3,
              },
            },
          },
          { new: true }
        );
        let i1 = updatedDoor.door.i1;
        let i2 = updatedDoor.door.i2;
        let i3 = updatedDoor.door.i3;
        let i4 = updatedDoor.door.i4;
        let i5 = updatedDoor.door.i5;
        let i6 = updatedDoor.door.i6;
        let i7 = updatedDoor.door.i7;
        let i8 = updatedDoor.door.i8;
        let i9 = updatedDoor.door.i9;
        let n1 = updatedDoor.door.n1;
        let n2 = updatedDoor.door.n2;
        let n3 = updatedDoor.door.n3;
        let o1 = updatedDoor.door.o1;
        let o2 = updatedDoor.door.o2;
        let o3 = updatedDoor.door.o3;
        let e = updatedDoor.door.e;

        let result = `A3%nm*Wb&ID=Lg18299RHS10MxSh&i1=${i1}&$i2=${i2}&i3=${i3}&i4=${i4}&i5=${i5}&i6=${i6}&i7=${i7}&i8=${i8}&i9=${i9}&n1=${n1}&n2=${n2}&n3=${n3}&o1=${o1}&o2=${o2}&o3=${o3}&e=${e}`;
        return res.status(200).send(result);
      } else if (data.o2 === "1" && dataInDb.door.o2 == 1) {
        updatedDoor = await Door.findOneAndUpdate(
          { doorID: doorID },
          {
            $set: {
              door: {
                i1: data.i1,
                i2: data.i2,
                i3: data.i3,
                i4: data.i4,
                i5: data.i5,
                i6: data.i6,
                i7: data.i7,
                i8: data.i8,
                i9: data.i9,
                n1: 0,
                n2: 1,
                n3: data.n3,
                o2: 0,
                o1: +data.o1,
                o3: +data.o3,
              },
            },
          },
          { new: true }
        );
        let i1 = updatedDoor.door.i1;
        let i2 = updatedDoor.door.i2;
        let i3 = updatedDoor.door.i3;
        let i4 = updatedDoor.door.i4;
        let i5 = updatedDoor.door.i5;
        let i6 = updatedDoor.door.i6;
        let i7 = updatedDoor.door.i7;
        let i8 = updatedDoor.door.i8;
        let i9 = updatedDoor.door.i9;
        let n1 = updatedDoor.door.n1;
        let n2 = updatedDoor.door.n2;
        let n3 = updatedDoor.door.n3;
        let o1 = updatedDoor.door.o1;
        let o2 = updatedDoor.door.o2;
        let o3 = updatedDoor.door.o3;
        let e = updatedDoor.door.e;

        let result = `A3%nm*Wb&ID=Lg18299RHS10MxSh&i1=${i1}&$i2=${i2}&i3=${i3}&i4=${i4}&i5=${i5}&i6=${i6}&i7=${i7}&i8=${i8}&i9=${i9}&n1=${n1}&n2=${n2}&n3=${n3}&o1=${o1}&o2=${o2}&o3=${o3}&e=${e}`;
        return res.status(200).send(result);
      }

      //gauname o1===0, o2===0, n2===1
    } else if (data.o1 === "0" && data.o2 === "0" && data.n2 === "1") {
      //tikriname DB o1 ir 02
      // jei o1 ir o2 lygus 0
      if (dataInDb.door.o1 === 0 && dataInDb.door.o2 === 0) {
        let i1 = dataInDb.door.i1;
        let i2 = dataInDb.door.i2;
        let i3 = dataInDb.door.i3;
        let i4 = dataInDb.door.i4;
        let i5 = dataInDb.door.i5;
        let i6 = dataInDb.door.i6;
        let i7 = dataInDb.door.i7;
        let i8 = dataInDb.door.i8;
        let i9 = dataInDb.door.i9;
        let n1 = data.n1;
        let n2 = data.n2;
        let n3 = data.n3;
        let o1 = dataInDb.door.o1;
        let o2 = dataInDb.door.o2;
        let o3 = dataInDb.door.o3;
        let e = data.e;

        // URL EXAMPLE
        // A3%nm*Wb_ID=Lg18299RHS10MxSh_&i1=1_&i2=1_&i3=1_&i4=1_&i5=1_&i6=1_&i7=1_&i8=1_&i9=1_&n1=1_&n2=1_&n3=1_&o1=0_&o2=0_&o3=0_&e=0

        // return o1===0, o2===0, n2===1
        let result = `A3%nm*Wb&ID=Lg18299RHS10MxSh&i1=${i1}&$i2=${i2}&i3=${i3}&i4=${i4}&i5=${i5}&i6=${i6}&i7=${i7}&i8=${i8}&i9=${i9}&n1=${n1}&n2=${n2}&n3=${n3}&o1=${o1}&o2=${o2}&o3=${o3}&e=${e}`;
        return res.status(200).send(result);
      }
    }
    return res.status(404).send("oshibka");
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

exports.doorSwitch1 = async (req, res) => {
  const data = req.query;
  const doorID = req.query.id;
  console.log(data, "data");
  console.log(doorID, "data");

  try {
    if (!req.query.h || req.query.h !== "A3%nm*Wb") {
      return res.status(404).send("netu metki");
    }
    let switchDoor;
    // let dataInDb = await Door.findOne({ doorID: doorID });
    // console.log(dataInDb, "data in db");
    // ar reikia apsidrausti, kai jau esama o1 open = true? arba o2 open = true?
    if (data.o1 != undefined && data.o1 == 1) {
      // ar praeina
      console.log(doorID, "doorID");
      switchDoor = await Door.findOneAndUpdate(
        { doorID: doorID },
        {
          $set: {
            "door.o1": +data.o1,
          },
        },
        { new: true }
      );
      if (switchDoor === undefined) {
        return res.status(404).send("No doors found by ID");
      }
    }
    if (data.o2 != undefined && data.o2 == 1) {
      switchDoor = await Door.findOneAndUpdate(
        { doorID: doorID },
        {
          $set: {
            "door.o2": +data.o2,
          },
        },
        { new: true }
      );
      if (switchDoor === null) {
        return res.status(404).send("No doors found by ID");
      }
    }

    console.log(switchDoor, "switch door");
    if (switchDoor === undefined) {
      return res.status(404).send("e11");
    }
    // console.log(switchDoor, "switch door");
    let i1 = switchDoor.door.i1;
    let i2 = switchDoor.door.i2;
    let i3 = switchDoor.door.i3;
    let i4 = switchDoor.door.i4;
    let i5 = switchDoor.door.i5;
    let i6 = switchDoor.door.i6;
    let i7 = switchDoor.door.i7;
    let i8 = switchDoor.door.i8;
    let i9 = switchDoor.door.i9;
    let n1 = switchDoor.door.n1;
    let n2 = switchDoor.door.n2;
    let n3 = switchDoor.door.n3;
    let o1 = switchDoor.door.o1;
    let o2 = switchDoor.door.o2;
    let o3 = switchDoor.door.o3;
    let e = switchDoor.door.e;

    // URL EXAMPLE

    // A3%nm*Wb_ID=Lg18299RHS10MxSh_&i1=1_&i2=1_&i3=1_&i4=1_&i5=1_&i6=1_&i7=1_&i8=1_&i9=1_&n1=1_&n2=1_&n3=1_&o1=0_&o2=0_&o3=0_&e=0
    // A3%nm*Wb_ID=Lg18299RHS10MxSh&i1=1&i2=1&i3=1&i4=1&i5=1&i6=1&i7=1&i8=1&i9=1&n1=1&n2=1&n3=1&o1=0&o2=0&o3=0&e=0

    let result = `A3%nm*Wb&ID=Lg18299RHS10MxSh&i1=${i1}&$i2=${i2}&i3=${i3}&i4=${i4}&i5=${i5}&i6=${i6}&i7=${i7}&i8=${i8}&i9=${i9}&n1=${n1}&n2=${n2}&n3=${n3}&o1=${o1}&o2=${o2}&o3=${o3}&e=${e}`;

    return res.status(200).send(result);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

exports.reset = async (req, res) => {
  const data = req.query;
  const doorID = req.query.id;
  console.log(data, 'data');
  console.log(data.o2, 'data');

  let switchDoor = await Door.findOneAndUpdate(
    { doorID: doorID },
    {
      $set: {
        'door.o1': 0,
        'door.o2': 0,
      },
    },
    { new: true }
  );
  return res.status(200).send('success');
};
