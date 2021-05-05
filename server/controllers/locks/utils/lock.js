const { Lock } = require("../../../models/lockModel");
// const io = require("../../../server");
const { socketConnection } = require("../../../utils/socket");
// let debug = require("debug");

exports.reset = async (lockId, n1, n3, error) => {
  updatedLock = await Lock.findByIdAndUpdate(
    lockId,
    {
      $set: {
        // i1: data.i1,
        // i2: data.i2,
        // i3: data.i3,
        // i4: data.i4,
        // i5: data.i5,
        // i6: data.i6,
        // i7: data.i7,
        // i8: data.i8,
        // i9: data.i9,
        o1: 0,
        o2: 0,
        o3: 0,
        e: error,
      },
      $push: {
        [`lockClosed.o1`]: { time: new Date(), user: "system reset" },
        [`lockClosed.o2`]: { time: new Date(), user: "system reset" },
      },
    },
    { new: true }
  );
  console.log("reset");
  console.log(updatedLock);
  // get values to return from updated door
  if (updatedLock) {
    socketConnection.socket.emit("lockUpdate", {
      id: lockId,
      o1: 0,
      o2: 0,
      o3: 0,
    });
  }
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
  const n2 = 0;
  const result = `A3%nm*Wb&ID=Lg18299RHS10MxSh&i1=${i1}&$i2=${i2}&i3=${i3}&i4=${i4}&i5=${i5}&i6=${i6}&i7=${i7}&i8=${i8}&i9=${i9}&n1=${n1}&n2=${n2}&n3=${n3}&o1=${o1}&o2=${o2}&o3=${o3}&t=${t}&e=${e}`;
  return result;
};
