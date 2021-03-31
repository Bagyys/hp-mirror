const router = require("express").Router();
const { getFlat } = require("../controllers/flatController");

// Landing page route
router.get("/", getFlat);

module.exports = router;
