const express = require("express");
const router = express.Router();
const {
  createCategory,
  getAllCategories,
  deleteCategory,
} = require("../controllers/categoryController");

router.post("/post", createCategory);
router.get("/get-all", getAllCategories);
router.delete("/delete/:id", deleteCategory);

module.exports = router;
