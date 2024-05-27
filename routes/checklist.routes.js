const express = require("express");
const router = express.Router();
const {
  getAllCheckLists,
  getCheckListById,
  getCheckListsByEventId,
  createCheckList,
  updateCheckList,
  deleteCheckList,
} = require("../controllers/checkListController");

router.get("/checklists", getAllCheckLists);
router.get("/checklists/:id", getCheckListById);
router.get("/checklists/event/:eventId", getCheckListsByEventId);
router.post("/checklists/", createCheckList);
router.put("/checklists/:id", updateCheckList);
router.delete("/checklists/:id", deleteCheckList);

module.exports = router;
