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

router.post("/", verifyToken, createTask);
router.get("/", getAllTasks);
router.get("/get/:id", verifyToken, getTask);
router.delete("/delete/:id", verifyToken, deleteTask);
router.put("/update/:id", verifyToken, updateTask);

// Subtask routes
router.post("/:id/subtask", verifyToken, addSubTask);
router.put("/:id/subtask", verifyToken, editSubTask);
router.delete("/:id/subtask/:subtaskId", verifyToken, deleteSubTask);
module.exports = router;
