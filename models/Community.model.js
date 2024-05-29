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
      default:
        "https://static.wixstatic.com/media/7e619e_a97319449991416a978e2d52ba6bfadb~mv2.jpg/v1/fill/w_1359,h_944,al_c,q_85,enc_auto/7e619e_a97319449991416a978e2d52ba6bfadb~mv2.jpg",
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
