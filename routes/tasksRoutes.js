const express = require("express");
const {
  createTask,
  getAllTasks,
  getTask,
  deleteTask,
  updateTask,
} = require("../controllers/taskController");
const {
  addSubTask,
  editSubTask,
  deleteSubTask,
} = require("../controllers/subTaskController");
const verifyToken = require("../middleware/authMiddleware");
const router = express.Router();

// Task Routes
router.post("/create", verifyToken, createTask); 
router.get("/list",verifyToken, getAllTasks); 
router.get("/edit/:id", verifyToken, getTask); 
router.put("/update/:id", verifyToken, updateTask); 
router.delete("/remove/:id", verifyToken, deleteTask); 

// Subtask Routes
router.post("/:id/subtask/create", verifyToken, addSubTask); 
router.put("/:id/subtask/edit/:subtaskId", verifyToken, editSubTask); 
router.delete("/:id/subtask/remove/:subtaskId", verifyToken, deleteSubTask); 

module.exports = router;
