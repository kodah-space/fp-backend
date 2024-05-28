const Community = require("../models/Community.model");

exports.getAllCommunities = async (req, res) => {
  const { createdby } = req.query;

  try {
    const communities = await Community.find().populate(
      "creator members events"
    );
    res.json(communities);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getCommunityById = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id);
    const community = await Community.findById(req.params.id).populate(
      "creator members events"
    );
    if (!community)
      return res.status(404).json({ message: "Community not found" });
    res.json(community);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.createCommunity = async (req, res) => {
  const community = new Community(req.body);
  try {
    const newCommunity = await community.save();
    res.status(201).json(newCommunity);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.updateCommunity = async (req, res) => {
  try {
    const updatedCommunity = await Community.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedCommunity)
      return res.status(404).json({ message: "Community not found" });
    res.json(updatedCommunity);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.deleteCommunity = async (req, res) => {
  try {
    const deletedCommunity = await Community.findByIdAndDelete(req.params.id);
    if (!deletedCommunity)
      return res.status(404).json({ message: "Community not found" });
    res.json({ message: "Community deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getCommunitiesCreatedByUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const communities = await Community.find({
      creator: { _id: userId },
    }).populate("creator members events");
    res.json(communities);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getCommunitiesUserIsMemberOf = async (req, res) => {
  try {
    const { userId } = req.params;
    console.log(userId);
    const communities = await Community.find({ members: userId }).populate(
      "creator members events"
    );
    res.json(communities);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
