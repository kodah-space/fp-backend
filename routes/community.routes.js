const express = require("express");
const router = express.Router();
const {
  getAllCommunities,
  getCommunityById,
  createCommunity,
  getCommunitiesCreatedByUser,
  getCommunitiesUserIsMemberOf,
  updateCommunity,
  deleteCommunity,
} = require("../controllers/communityController");

router.get("/communities", getAllCommunities);
router.get("/communities/:id", getCommunityById);
router.post("/communities/", createCommunity);
router.get("/communities/createdBy/:userId", getCommunitiesCreatedByUser); // New route for communities created by user
router.get("/communities/memberOf/:userId", getCommunitiesUserIsMemberOf);
router.put("/communities/:id", updateCommunity);
router.delete("/communities/:id", deleteCommunity);

module.exports = router;
