const { Lock } = require("../../models/lockModel");
// const { resetLock } = require("./utils/lock");
// let debug = require("debug");

exports.addLock = async (req, res) => {
  const data = req.query;
  let newLock;

  if (!data.h || data.h !== "A3%nm*Wb") {
    return res.status(404).send("netu metki");
  }
  if (
    data.id === undefined ||
    data.id.length !== 24 ||
    data.id !== "Lg18299RHS10MxShFFFFFFFF"
  ) {
    return res.status(404).send("plochije parametry");
  }
  try {
    const emptyTimeStampArrays = { o1: [], o2: [] };
    const lockObject = {
      timeInterval: data.t,
      i1: data.i1,
      i2: data.i2,
      i3: data.i3,
      i4: data.i4,
      i5: data.i5,
      i6: data.i6,
      i7: data.i7,
      i8: data.i8,
      i9: data.i9,
      o1: data.o1,
      o2: data.o2,
      o3: data.o3,
      e: data.e,
      a: data.a,
      lockOpened: emptyTimeStampArrays,
      lockClosed: emptyTimeStampArrays,
    };

    const createdLock = new Lock(lockObject);
    newLock = await createdLock.save();
    if (newLock !== undefined || newLock !== null) {
      const {
        _id,
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
        a,
      } = newLock;
      const result = `A3%nm*Wb&id=${_id}&i1=${i1}&$i2=${i2}&i3=${i3}&i4=${i4}&i5=${i5}&i6=${i6}&i7=${i7}&i8=${i8}&i9=${i9}&n1=0&n2=0&n3=0&o1=${o1}&o2=${o2}&o3=${o3}&t=${t}&e=${e}&a=${a}`;
      return res.status(200).send(result);
    } else {
      return res.status(404).send("oshibka");
    }
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};
