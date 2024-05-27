const { Schema, model } = require("mongoose");

// RSVP Schema
const rsvpSchema = new Schema(
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
    typeOfAttendance: {
      type: String,
      enum: ["yes", "no", "maybe"],
      required: [true, "Type of attendance is required."],
    },
    checkItemID: {
      type: Schema.Types.ObjectId,
      ref: "CheckListItem",
    },
  },
  {
    timestamps: true,
  }
);

const RSVP = model("RSVP", rsvpSchema);

module.exports = RSVP;
