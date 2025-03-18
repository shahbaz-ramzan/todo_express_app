const Task = require("../models/task");

const createTask = async (req, res) => {

  const { title, description, status } = req.body;

  try {
    const task = new Task({
      title,
      description,
      status,
      subtasks: [],
      createdAt: new Date(),
    });
    await task.save();
    res.status(201).json({ message: "Task created successfully" });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

const getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find({});
    res.status(200).json({ data: tasks });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

const getTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ message: "Task not found" });
    res.status(200).json({ message: "Task fetched successfully", data: task });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

const deleteTask = async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);
    if (!task) return res.status(404).json({ message: "Task not found" });
    res.status(200).json({ message: "Task deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

const updateTask = async (req, res) => {
  console.log("req body",req.body);
  const { title, description, status } = req.body;

  try {
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ message: "Task not found" });

    // Update only the provided fields
    if (title) task.title = title;
    if (description) task.description = description;
    if (status) task.status = status; // Allow updating status

    await task.save(); // Save the updated task

    res.status(200).json({ message: "Task updated successfully", data: task });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

module.exports = {
  createTask,
  getAllTasks,
  getTask,
  deleteTask,
  updateTask,
};
