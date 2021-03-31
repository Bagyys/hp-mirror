const router = require("express").Router();
const {
  getDoor,
  //   getDoor1,
  getDoor2,
  doorSwitch,
  doorSwitch1,
    reset,
} = require("../controllers/doorController");

// Landing page route
router.put("/door/", getDoor);
// router.put("/door1/", getDoor1);
router.put("/door2/", getDoor2);

router.put("/doorSwitch/", doorSwitch);
router.put("/doorSwitch1/", doorSwitch1);
router.put('/doorReset/', reset);
module.exports = router;
