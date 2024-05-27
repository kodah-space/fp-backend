const CheckList = require("../models/Checklist.model");

exports.getAllCheckLists = async (req, res) => {
  try {
    const checkLists = await CheckList.find().populate("eventID userID list");
    res.json(checkLists);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getCheckListById = async (req, res) => {
  try {
    const checkList = await CheckList.findById(req.params.id).populate(
      "eventID userID list"
    );
    if (!checkList)
      return res.status(404).json({ message: "CheckList not found" });
    res.json(checkList);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getCheckListsByEventId = async (req, res) => {
  try {
    const { eventId } = req.params;
    const checkLists = await CheckList.find({ eventID: eventId }).populate(
      "eventID userID list"
    );
    res.json(checkLists);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.createCheckList = async (req, res) => {
  const checkList = new CheckList(req.body);
  try {
    const newCheckList = await checkList.save();
    res.status(201).json(newCheckList);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.updateCheckList = async (req, res) => {
  try {
    const updatedCheckList = await CheckList.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedCheckList)
      return res.status(404).json({ message: "CheckList not found" });
    res.json(updatedCheckList);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.deleteCheckList = async (req, res) => {
  try {
    const deletedCheckList = await CheckList.findByIdAndDelete(req.params.id);
    if (!deletedCheckList)
      return res.status(404).json({ message: "CheckList not found" });
    res.json({ message: "CheckList deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
