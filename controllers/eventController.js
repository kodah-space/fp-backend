const Event = require("../models/Event.model");

exports.getAllEvents = async (req, res) => {
  try {
    const events = await Event.find().populate("creator taskLists attendees");
    res.json(events);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getEventById = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id).populate(
      "creator taskLists attendees"
    );
    if (!event) return res.status(404).json({ message: "Event not found" });
    res.json(event);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getEventsByCreatorId = async (req, res) => {
  try {
    const { creatorId } = req.params;
    const events = await Event.find({ creator: creatorId }).populate(
      "creator taskLists attendees"
    );
    res.json(events);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getEventsByCommunityId = async (req, res) => {
  try {
    const { communityId } = req.params;
    const events = await Event.find({ community: communityId }).populate(
      "creator taskLists attendees"
    );
    res.json(events);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.createEvent = async (req, res) => {
  const event = new Event(req.body);
  try {
    const newEvent = await event.save();
    res.status(201).json(newEvent);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.updateEvent = async (req, res) => {
  try {
    const updatedEvent = await Event.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedEvent)
      return res.status(404).json({ message: "Event not found" });
    res.json(updatedEvent);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.deleteEvent = async (req, res) => {
  try {
    const deletedEvent = await Event.findByIdAndDelete(req.params.id);
    if (!deletedEvent)
      return res.status(404).json({ message: "Event not found" });
    res.json({ message: "Event deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
