const Task = require("../models/task");

const mongoose = require("mongoose"); 

const addSubTask = async (req, res) => {
  console.log("1: ------------------------------");
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ message: "Task not found" });

    const newSubtask = {
      _parent_id:task,
      _id: new mongoose.Types.ObjectId(),
      title: req.body.title,
      description: req.body.description,
      createdAt: new Date(),
    };

    task.subtasks.push(newSubtask);
    await task.save();

    res.status(201).json({
      message: "Subtask created successfully",
      data: newSubtask,
    });
  } catch (error) {
    console.error("Error adding subtask:", error);
    res.status(500).json({ error: "Server error" });
  }
};


const editSubTask = async (req, res) => {
  const { id, subtaskId } = req.params;
  const { title, description } = req.body;

  try {
    const task = await Task.findById(id);
    if (!task) return res.status(404).json({ message: "Task not found" });

    const subtask = task.subtasks.id(subtaskId);
    if (!subtask) return res.status(404).json({ message: "Subtask not found" });

    if (title !== undefined) subtask.title = title;
    if (description !== undefined) subtask.description = description;

    await task.save();

    res.status(200).json({
      message: "Subtask updated successfully",
      data: subtask,
    });
  } catch (error) {
    console.error("Error editing subtask:", error);
    res.status(500).json({ error: "Server error" });
  }
};

const deleteSubTask = async (req, res) => {
  const { id, subtaskId } = req.params;

  try {
    const task = await Task.findById(id);
    if (!task) return res.status(404).json({ message: "Task not found" });

    const subtask = task.subtasks.id(subtaskId);
    if (!subtask) return res.status(404).json({ message: "Subtask not found" });

    task.subtasks.pull(subtaskId);
    await task.save();

    res.status(200).json({ message: "Subtask deleted successfully" });
  } catch (error) {
    console.error("Error deleting subtask:", error);
    res.status(500).json({ error: "Server error" });
  }
};

module.exports = {
  addSubTask,
  editSubTask,
  deleteSubTask,
};
