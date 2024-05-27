const { Schema, model } = require("mongoose");

// CheckListItem Schema
const checkListItemSchema = new Schema(
  {
    checkListID: {
      type: Schema.Types.ObjectId,
      ref: "CheckList",
      required: [true, "CheckList ID is required."],
    },
    description: {
      type: String,
      required: [true, "Description is required."],
    },
    isDone: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const CheckListItem = model("CheckListItem", checkListItemSchema);

module.exports = CheckListItem;
