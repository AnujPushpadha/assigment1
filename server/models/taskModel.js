const mongoose = require("mongoose");

const taskSchema = mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    task: {
      type: String,
      required: [true, "please add the task"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("tasks", taskSchema);
