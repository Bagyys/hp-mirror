const router = require("express").Router();
const { addProperty } = require("../controllers/property/addProperty");
const {
  getAllProperties,
} = require("../controllers/property/getAllProperties");
const {
  getPropertieswoLocks,
} = require("../controllers/property/getPropertieswoLocks");
const { getOneProperty } = require("../controllers/property/getOneProperty");

// Routes
router.post("/addProperty", addProperty);
router.get("/getPropertieswoLocks", getPropertieswoLocks);
router.get("/getAllProperties", getAllProperties);
router.get("/getOneProperty/:id", getOneProperty);

module.exports = router;
