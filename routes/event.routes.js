const express = require("express");
const router = express.Router();
const {
  getAllEvents,
  getEventById,
  createEvent,
  updateEvent,
  deleteEvent,
  getEventTypes,
  getEventsCreatedByUser,
  getEventsToAttendByUser,
} = require("../controllers/eventController");

router.get("/events/", getAllEvents);
router.get("/events/:id", getEventById);
router.get("/events/createdby/:userId", getEventsCreatedByUser); // New route for communities created by user
router.get("/events/attendedby/:userId", getEventsToAttendByUser);
router.post("/events/", createEvent);
router.put("/events/:id", updateEvent);
router.delete("/events/:id", deleteEvent);

router.get("/event-types", getEventTypes);
module.exports = router;
