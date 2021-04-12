const router = require("express").Router();
const { addProperty } = require("../controllers/property/addProperty");
const {getAllProperties} = require("../controllers/property/getAllProperties")

// Routes
router.post("/addProperty", addProperty);
router.get("/getAllProperties", getAllProperties);

module.exports = router;
