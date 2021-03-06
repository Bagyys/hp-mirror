const { Lock } = require("../../models/lockModel");
const { reset } = require("../../utils/lock");
const { checkActiveReservations } = require("../../utils/reservation");
const { socketConnection } = require("../../utils/socket");
// let debug = require("debug");

exports.handleLock = async (req, res) => {
  console.log("handleLock");
  const data = req.query;
  //   console.log("data");
  //   console.log(data);
  if (data.o1 === undefined || data.o2 === undefined || data.n2 === undefined) {
    // console.log("data o1, o2, n2 undefined");
    // console.log("send error");
    return res.status(404).send("netu parametrof");
  }
  if (!data.h || data.h !== "A3%nm*Wb") {
    // console.log("data h undefined or incorrect");
    // console.log("send error");
    return res.status(404).send("netu metki");
  }
  if (data.id === undefined || data.id.length !== 24) {
    // console.log("data id undefined or too short");
    // console.log("send error");
    const result =
      "A3%nm*Wb";
    return res.status(404).send(result);
  }
  let updatedLock;
  let dataInDb;
  let a = 0;
  try {
    const active = await checkActiveReservations(data.id);
    active ? (a = 1) : (a = 0);
  } catch (error) {
    return res.status(404).send("oshibka parametra a: " + error.message);
  }
  try {
    dataInDb = await Lock.findById(data.id);
    // console.log("found");
    if (dataInDb === null || dataInDb === undefined) {
      //   console.log("no lock found by id");
      //   console.log("send error");
      const result =
        "A3%nm*Wb&id=XXXXXXXXXXXXXXXXXXXXXXXX&i1=0&$i2=0&i3=0&i4=0&i5=0&i6=0&i7=0&i8=0&i9=0&n1=0&n2=0&n3=0&o1=0&o2=0&o3=0&t=0&e=0&a=0";
      return res.status(404).send(result);
    }
  } catch (error) {
    // console.log("no lock found by id");
    // console.log("send error");
    // return res.status(404).send("nepravelnyj id 3: " + error.message);
    const result =
      "A3%nm*Wb&id=XXXXXXXXXXXXXXXXXXXXXXXX&i1=0&$i2=0&i3=0&i4=0&i5=0&i6=0&i7=0&i8=0&i9=0&n1=0&n2=0&n3=0&o1=0&o2=0&o3=0&t=0&e=0&a=0";
    return res.status(404).send(result);
  }
  //gauname o1===0, o2===0, n2===0
  if (data.o1 === "0" && data.o2 === "0" && data.n2 === "0") {
    // console.log("condition: query o1=0, o2=0, n2=0");
    // console.log(`query o1=${data.o1}, o2=${data.o2}, n2=${data.n2}`);
    //tikriname DB o1 ir o2
    // jei o1 ir o2 lygus 0
    if (dataInDb.o1 == 0 && dataInDb.o2 == 0) {
      //   console.log("condition: db o1=0, o2=0");
      //   console.log(`db o1=${dataInDb.o1}, o2=${dataInDb.o2}`);
      const {
        i1,
        i2,
        i3,
        i4,
        i5,
        i6,
        i7,
        i8,
        i9,
        o1,
        o2,
        o3,
        timeInterval: t,
      } = dataInDb;
      const { n1, n2, n3, e } = data;

      // ciklas nulis
      // return o1, o2 ir n2 kaip requeste
      const result = `A3%nm*Wb&id=${data.id}&i1=${i1}&$i2=${i2}&i3=${i3}&i4=${i4}&i5=${i5}&i6=${i6}&i7=${i7}&i8=${i8}&i9=${i9}&n1=${n1}&n2=${n2}&n3=${n3}&o1=${o1}&o2=${o2}&o3=${o3}&t=${t}&e=${e}&a=${a}`;
      //   console.log("response: o1=0, o2=0, n2=0");
      //   console.log(`return o1=${o1}, o2=${o2}, n2=${n2}`);
      return res.status(200).send(result);
    } else if (
      // jei o1 arba o2 DB lygus 1
      (dataInDb.o1 == 1 && dataInDb.o2 == 0) ||
      (dataInDb.o2 == 1 && dataInDb.o1 == 0)
    ) {
      //   console.log("condition: db o1=1, o2=0 OR o1=0, o2=1");
      //   console.log(`db o1=${dataInDb.o1}, o2=${dataInDb.o2}`);
      const {
        i1,
        i2,
        i3,
        i4,
        i5,
        i6,
        i7,
        i8,
        i9,
        o1,
        o2,
        o3,
        timeInterval: t,
      } = dataInDb;
      const { n1, n3, e } = data;
      const n2 = 1;
      // return o1 arba o2 (ta, kuris lygus 1) ir n2=1
      const result = `A3%nm*Wb&id=${data.id}&i1=${i1}&$i2=${i2}&i3=${i3}&i4=${i4}&i5=${i5}&i6=${i6}&i7=${i7}&i8=${i8}&i9=${i9}&n1=${n1}&n2=${n2}&n3=${n3}&o1=${o1}&o2=${o2}&o3=${o3}&t=${t}&e=${e}&a=${a}`;
      //   console.log("response: o1=1, o2=0 OR o1=0, o2=1 AND n2=1");
      //   console.log(`return o1=${o1}, o2=${o2}, n2=${n2}`);
      return res.status(200).send(result);
    } else {
      // edge case - reset lock to initial state
      const result = await reset(data.id, data.n1, data.n3, "F");
      //   console.log("94 response: o1=0, o2=0, n2=0, e=F");
      //   console.log(`return ${result}`);
      return res.status(200).send(result);
    }
  } else if (data.o1 === "0" && data.o2 === "0" && data.n2 === "1") {
    //gauname o1===0, o2===0, n2===1
    // console.log("condition: query o1=0, o2=0, n2=1");
    // console.log(`query o1=${data.o1}, o2=${data.o2}, n2=${data.n2}`);
    //tikriname DB o1 ir 02
    // jei o1 ir o2 lygus 0
    if (dataInDb.o1 == 0 && dataInDb.o2 == 0) {
      //   console.log("condition: db o1=0, o2=0");
      //   console.log(`db o1=${dataInDb.o1}, o2=${dataInDb.o2}`);
      const {
        i1,
        i2,
        i3,
        i4,
        i5,
        i6,
        i7,
        i8,
        i9,
        o1,
        o2,
        o3,
        timeInterval: t,
      } = dataInDb;
      const { n1, n3, e } = data;
      const n2 = 1;
      // URL EXAMPLE
      // A3%nm*Wb_ID=Lg18299RHS10MxSh_&i1=1_&i2=1_&i3=1_&i4=1_&i5=1_&i6=1_&i7=1_&i8=1_&i9=1_&n1=1_&n2=1_&n3=1_&o1=0_&o2=0_&o3=0_&e=0

      // return o1===0, o2===0, n2===1
      const result = `A3%nm*Wb&id=${data.id}&i1=${i1}&$i2=${i2}&i3=${i3}&i4=${i4}&i5=${i5}&i6=${i6}&i7=${i7}&i8=${i8}&i9=${i9}&n1=${n1}&n2=${n2}&n3=${n3}&o1=${o1}&o2=${o2}&o3=${o3}&t=${t}&e=${e}&a=${a}`;
      //   console.log("response: o1=0, o2=0, n2=1");
      //   console.log(`return o1=${o1}, o2=${o2}, n2=${n2}`);
      return res.status(200).send(result);
    } else {
      // edge case - reset lock to initial state
      const result = await reset(data.id, data.n1, data.n3, "F");
      //   console.log("135 response: o1=0, o2=0, n2=0, e=F");
      //   console.log(`return ${result}`);

      return res.status(200).send(result);
    }
  } else if (
    //gauname o1===1 arba o2===1, n2===1
    ((data.o1 === "1" && data.o2 === "0") ||
      (data.o2 === "1" && data.o1 === "0")) &&
    data.n2 === "1"
  ) {
    // console.log("condition: query o1=1, o2=0 OR o1=0, o2=1 AND n2=1");
    // console.log(`query o1=${data.o1}, o2=${data.o2}, n2=${data.n2}`);
    //tikriname DB o1 ir o2
    // jei DB o1 ar o2 buvo 1, keiciame i 0
    if (
      data.o1 === "1" &&
      data.o2 === "0" &&
      dataInDb.o1 == 1 &&
      dataInDb.o2 == 0
    ) {
      //   console.log("condition: query o1=1, o2=0 AND db o1=1, o2=0");
      //   console.log(`db o1=${dataInDb.o1}, o2=${dataInDb.o2}`);
      try {
        updatedLock = await Lock.findByIdAndUpdate(
          data.id,
          {
            $set: {
              i1: data.i1,
              i2: data.i2,
              i3: data.i3,
              i4: data.i4,
              i5: data.i5,
              i6: data.i6,
              i7: data.i7,
              i8: data.i8,
              i9: data.i9,
              o1: 0,
              o2: +data.o2,
              o3: data.o3,
              e: 0,
            },
            $push: {
              [`lockClosed.o1`]: { time: new Date(), user: "lock close" },
            },
          },
          { new: true }
        );
        if (updatedLock) {
          socketConnection.socket.emit("lockUpdate", {
            id: data.id,
            o1: 0,
            o2: +data.o2,
            o3: +data.o3,
          });
        }
        // console.log("updated");
      } catch (error) {
        // console.log("no lock found by id");
        // console.log("send error");
        // console.log(error);
        return res.status(404).send("nepravelnyj id 4: " + error.message);
      }
      // get values to return from updated lock
      const {
        i1,
        i2,
        i3,
        i4,
        i5,
        i6,
        i7,
        i8,
        i9,
        o1,
        o2,
        o3,
        timeInterval: t,
        e,
      } = updatedLock;
      const { n1, n3 } = data;
      const n2 = 1;

      // return o1 arba o2 0 ir n2 1
      const result = `A3%nm*Wb&id=${data.id}&i1=${i1}&$i2=${i2}&i3=${i3}&i4=${i4}&i5=${i5}&i6=${i6}&i7=${i7}&i8=${i8}&i9=${i9}&n1=${n1}&n2=${n2}&n3=${n3}&o1=${o1}&o2=${o2}&o3=${o3}&t=${t}&e=${e}&a=${a}`;
      //   console.log("response: o1=0, o2=0, n2=1");
      //   console.log(`return o1=${o1}, o2=${o2}, n2=${n2}`);
      return res.status(200).send(result);
    } else if (
      //tikriname DB o1 ir o2
      // jei DB o1 ar o2 buvo 1, keiciame i 0
      data.o2 === "1" &&
      data.o1 === "0" &&
      dataInDb.o2 == 1 &&
      dataInDb.o1 == 0
    ) {
      //   console.log("condition: query o1=0, o2=1 AND db o1=0, o2=1");
      //   console.log(`db o1=${dataInDb.o1}, o2=${dataInDb.o2}`);
      try {
        updatedLock = await Lock.findByIdAndUpdate(
          data.id,
          {
            $set: {
              i1: data.i1,
              i2: data.i2,
              i3: data.i3,
              i4: data.i4,
              i5: data.i5,
              i6: data.i6,
              i7: data.i7,
              i8: data.i8,
              i9: data.i9,
              o1: +data.o1,
              o2: 0,
              o3: +data.o3,
              e: 0,
            },
            $push: {
              [`lockClosed.o2`]: { time: new Date(), user: "lock close" },
            },
          },
          { new: true }
        );
        if (updatedLock) {
          socketConnection.socket.emit("lockUpdate", {
            id: data.id,
            o1: +data.o1,
            o2: 0,
            o3: +data.o3,
          });
        }
        // console.log("updated");
      } catch (error) {
        // console.log("no lock found by id");
        // console.log("send error");
        return res.status(404).send("nepravelnyj id 5: " + error.message);
      }
      // get values to return from updated lock
      const {
        i1,
        i2,
        i3,
        i4,
        i5,
        i6,
        i7,
        i8,
        i9,
        o1,
        o2,
        o3,
        timeInterval: t,
        e,
      } = updatedLock;
      const { n1, n3 } = data;
      const n2 = 1;
      // return o1 arba o2 0 ir n2 1
      const result = `A3%nm*Wb&id=${data.id}&i1=${i1}&$i2=${i2}&i3=${i3}&i4=${i4}&i5=${i5}&i6=${i6}&i7=${i7}&i8=${i8}&i9=${i9}&n1=${n1}&n2=${n2}&n3=${n3}&o1=${o1}&o2=${o2}&o3=${o3}&t=${t}&e=${e}&a=${a}`;
      //   console.log("response: o1=0, o2=0, n2=1");
      //   console.log(`return o1=${o1}, o2=${o2}, n2=${n2}`);
      return res.status(200).send(result);
    } else {
      // edge case - reset lock to initial state
      const result = await reset(data.id, data.n1, data.n3, "F");
      //   console.log("263 response: o1=0, o2=0, n2=0, e=F");
      //   console.log(`return ${result}`);
      return res.status(200).send(result);
    }
  } else {
    // unsupported combination - reset to initial state
    // edge case - reset lock to initial state
    const result = await reset(data.id, data.n1, data.n3, "F");
    // console.log("271 response: o1=0, o2=0, n2=0, e=F");
    // console.log(`return ${result}`);
    return res.status(200).send(result);
  }
};
