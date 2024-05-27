const { Schema, model } = require("mongoose");

// CheckList Schema
const checkListSchema = new Schema(
  {
    eventID: {
      type: Schema.Types.ObjectId,
      ref: "Event",
      required: [true, "Event ID is required."],
    },
    userID: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User ID is required."],
    },
    list: [
      {
        type: Schema.Types.ObjectId,
        ref: "CheckListItem",
      },
    ],
  },
  {
    timestamps: true,
  }
);

const CheckList = model("CheckList", checkListSchema);

module.exports = CheckList;
