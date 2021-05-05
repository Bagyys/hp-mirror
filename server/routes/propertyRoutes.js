const router = require("express").Router();
const { addProperty } = require("../controllers/property/addProperty");
const {
  getAllProperties,
} = require("../controllers/property/getAllProperties");
const { getOneProperty } = require("../controllers/property/getOneProperty");

// Routes
router.post("/addProperty", addProperty);
router.get("/getAllProperties", getAllProperties);
router.get("/getOneProperty/:id", getOneProperty);

module.exports = router;
