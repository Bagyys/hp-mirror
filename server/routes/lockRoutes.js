const router = require("express").Router();

const { handleLock } = require("../controllers/locks/handleLock");
const { addLock } = require("../controllers/locks/addLock");
const { openLock } = require("../controllers/locks/openLock");
const { openLockAdmin } = require("../controllers/locks/openLockAdmin");
const { assignLock } = require("../controllers/locks/assignLock");
const { resetLock } = require("../controllers/locks/resetLock");
const { deleteLock } = require("../controllers/locks/deleteLock");
const { getAllLocks } = require("../controllers/locks/getAllLocks");
const {
  getUnassignedLocks,
} = require("../controllers/locks/getUnassignedLocks");
const { getLockByProperty } = require("../controllers/locks/getLockByProperty");

// routes
router.put("/openLockAdmin/", openLockAdmin);
router.put("/openLock/", openLock);
router.put("/lock/add/", addLock);
router.post("/lock/assign/", assignLock);
router.put("/reset/", resetLock);
router.delete("/delete/", deleteLock);
router.get("/allLocks/", getAllLocks);
router.get("/unassignedLocks/", getUnassignedLocks);
router.get("/getLockByProperty/:id", getLockByProperty);
router.put("/", handleLock);

module.exports = router;
