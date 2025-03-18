const mongoose = require("mongoose");

const subtaskSchema = new mongoose.Schema({
  _parent_id: { type: mongoose.Schema.Types.ObjectId, ref: "Task" },
  _id: { type: mongoose.Schema.Types.ObjectId, auto: true }, 
  title: { type: String, required: true },
  // status: { type: String, required: true }, 
  description: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const taskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  status: { type: String, required: true },
  subtasks: [subtaskSchema], 
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Task", taskSchema);
