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
router.put("/openAdmin/", openLockAdmin);
router.put("/open/", openLock);
router.put("/add/", addLock);
router.post("/assign/", assignLock);
router.put("/reset/", resetLock);
router.delete("/delete/", deleteLock);
router.get("/getAll/", getAllLocks);
router.get("/getUnassigned/", getUnassignedLocks);
router.get("/getLockByProperty/:id", getLockByProperty);
router.put("/", handleLock);

module.exports = router;