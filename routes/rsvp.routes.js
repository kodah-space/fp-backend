const express = require("express");
const router = express.Router();
const {
  getAllRSVPs,
  getRSVPById,
  getRSVPsByEventId,
  createRSVP,
  updateRSVP,
  deleteRSVP,
} = require("../controllers/rsvpController");

router.get("/rsvps/", getAllRSVPs);
router.get("/rsvps/:id", getRSVPById);
router.get("/rsvps/event/:eventId", getRSVPsByEventId);
router.post("/rsvps/", createRSVP);
router.put("/rsvps/:id", updateRSVP);
router.delete("/rsvps/:id", deleteRSVP);

module.exports = router;
