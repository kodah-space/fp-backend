const RSVP = require("../models/RSVP.model");

exports.getAllRSVPs = async (req, res) => {
  try {
    const rsvps = await RSVP.find().populate("eventID userID checkItemID");
    res.json(rsvps);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getRSVPById = async (req, res) => {
  try {
    const rsvp = await RSVP.findById(req.params.id).populate(
      "eventID userID checkItemID"
    );
    if (!rsvp) return res.status(404).json({ message: "RSVP not found" });
    res.json(rsvp);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getRSVPsByEventId = async (req, res) => {
  try {
    const { eventId } = req.params;
    const rsvps = await RSVP.find({ eventID: eventId }).populate(
      "eventID userID checkItemID"
    );
    res.json(rsvps);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.createRSVP = async (req, res) => {
  const rsvp = new RSVP(req.body);
  try {
    const newRSVP = await rsvp.save();
    res.status(201).json(newRSVP);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.updateRSVP = async (req, res) => {
  try {
    const updatedRSVP = await RSVP.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!updatedRSVP)
      return res.status(404).json({ message: "RSVP not found" });
    res.json(updatedRSVP);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.deleteRSVP = async (req, res) => {
  try {
    const deletedRSVP = await RSVP.findByIdAndDelete(req.params.id);
    if (!deletedRSVP)
      return res.status(404).json({ message: "RSVP not found" });
    res.json({ message: "RSVP deleted" });
  } catch (err) {
    res.status500.json({ message: err.message });
  }
};
