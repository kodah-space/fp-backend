const express = require("express");
const router = express.Router();
const {
  getAllEvents,
  getEventById,
  getEventsByCreatorId,
  getEventsByCommunityId,
  createEvent,
  updateEvent,
  deleteEvent,
} = require("../controllers/eventController");

router.get("/events/", getAllEvents);
router.get("/events/:id", getEventById);
router.get("/creator/:creatorId/events", getEventsByCreatorId); // New route for events created by user
router.get("/community/:communityId/events", getEventsByCommunityId); // New route for events in a community
router.post("/events/", createEvent);
router.put("/events/:id", updateEvent);
router.delete("/events/:id", deleteEvent);

module.exports = router;
