const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema(
  {
    Title: { type: String, required: true },
    Author: { type: String, required: true },
    Content: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Task = mongoose.model("Task", taskSchema);
module.exports = Task;
