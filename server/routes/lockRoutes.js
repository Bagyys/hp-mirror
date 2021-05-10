const router = require("express").Router();

const { handleLock } = require("../controllers/locks/handleLock");
const { addLock } = require("../controllers/locks/addLock");
const { openLock } = require("../controllers/locks/openLock");
const { resetLock } = require("../controllers/locks/resetLock");
const { deleteLock } = require("../controllers/locks/deleteLock");
const { getAllLocks } = require("../controllers/locks/getAllLocks");
const { getUnassignedLocks } = require("../controllers/locks/getUnassignedLocks");

// Landing page route
router.put("/openLock/", openLock);
router.put("/lock/add/", addLock);
router.put("/reset/", resetLock);
router.delete("/delete/", deleteLock);
router.get("/allLocks/", getAllLocks);
router.get("/unassignedLocks/", getUnassignedLocks);
router.put("/", handleLock);

module.exports = router;