const { Schema, model } = require("mongoose");

// Community Schema
const communitySchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Community name is required."],
    },
    communityImage: {
      type: String,
    },
    description: {
      type: String,
    },
    manifesto: {
      type: String,
    },
    creator: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Creator is required."],
    },
    members: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    events: [
      {
        type: Schema.Types.ObjectId,
        ref: "Event",
      },
    ],
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
);

const Community = model("Community", communitySchema);

module.exports = Community;
