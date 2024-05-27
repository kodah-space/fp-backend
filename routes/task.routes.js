const express = require("express");
const router = express.Router();
const {
  getAllTasks,
  getTaskById,
  getTasksByEventId,
  createTask,
  updateTask,
  deleteTask,
} = require("../controllers/taskController");

router.get("/tasks", getAllTasks);
router.get("/tasks/:id", getTaskById);
router.get("/tasks/event/:eventId", getTasksByEventId);
router.post("/tasks", createTask);
router.put("/tasks/:id", updateTask);
router.delete("/tasks/:id", deleteTask);

module.exports = router;
