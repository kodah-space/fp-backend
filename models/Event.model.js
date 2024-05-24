const { Schema, model } = require("mongoose");

// Event Schema
const eventSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Event name is required."],
    },
    eventImage: {
      type: String,
    },
    location: {
      type: String,
      required: [true, "Location is required."],
    },
    beginTime: {
      type: Date,
      required: [true, "Begin time is required."],
    },
    endTime: {
      type: Date,
      required: [true, "End time is required."],
    },
    typeOfEvent: {
      type: String,
      enum: [
        "Workshop",
        "Party",
        "Concert",
        "Festival",
        "Trip",
        "Online",
        "Performance",
      ],
      required: [true, "Type of event is required."],
    },
    description: {
      type: String,
    },
    taskLists: [
      {
        type: Schema.Types.ObjectId,
        ref: "Task",
      },
    ],
    checkList: [
      {
        type: String,
      },
    ],
    creator: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Creator is required."],
    },
    codeOfConduct: {
      type: String,
    },
    attendees: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
);

const Event = model("Event", eventSchema);

module.exports = Event;
