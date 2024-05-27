const CheckListItem = require("../models/CheckListItem.model");

exports.getAllCheckListItems = async (req, res) => {
  try {
    const checkListItems = await CheckListItem.find().populate("checkListID");
    res.json(checkListItems);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getCheckListItemById = async (req, res) => {
  try {
    const checkListItem = await CheckListItem.findById(req.params.id).populate(
      "checkListID"
    );
    if (!checkListItem)
      return res.status(404).json({ message: "CheckListItem not found" });
    res.json(checkListItem);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.createCheckListItem = async (req, res) => {
  const checkListItem = new CheckListItem(req.body);
  try {
    const newCheckListItem = await checkListItem.save();
    res.status(201).json(newCheckListItem);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.updateCheckListItem = async (req, res) => {
  try {
    const updatedCheckListItem = await CheckListItem.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedCheckListItem)
      return res.status(404).json({ message: "CheckListItem not found" });
    res.json(updatedCheckListItem);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.deleteCheckListItem = async (req, res) => {
  try {
    const deletedCheckListItem = await CheckListItem.findByIdAndDelete(
      req.params.id
    );
    if (!deletedCheckListItem)
      return res.status(404).json({ message: "CheckListItem not found" });
    res.json({ message: "CheckListItem deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
