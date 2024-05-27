const { Schema, model } = require("mongoose");

// Task Schema
const taskSchema = new Schema(
  {
    eventID: {
      type: Schema.Types.ObjectId,
      ref: "Event",
      required: [true, "Event ID is required."],
    },
    taskName: {
      type: String,
      required: [true, "Task name is required."],
    },
    descriptionRequirements: {
      type: String,
    },
    contributors: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Task = model("Task", taskSchema);

module.exports = Task;
