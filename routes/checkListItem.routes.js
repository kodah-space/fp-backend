const express = require("express");
const router = express.Router();
const {
  getAllCheckListItems,
  getCheckListItemById,
  createCheckListItem,
  updateCheckListItem,
  deleteCheckListItem,
} = require("../controllers/checkListItemController");

router.get("/checklistitems/", getAllCheckListItems);
router.get("/checklistitems/:id", getCheckListItemById);
router.post("/checklistitems/", createCheckListItem);
router.put("/checklistitems/:id", updateCheckListItem);
router.delete("/checklistitems/:id", deleteCheckListItem);

module.exports = router;
