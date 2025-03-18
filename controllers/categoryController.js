const Category = require("../models/category");
// const mongoose = require("mongoose");

const createCategory = async (req, res) => {
  try {
    const { category } = req.body;

    const existingCategory = await Category.findOne({ category });
    if (existingCategory) {
      return res.status(400).json({ error: "Category already exists!" });
    }

    const newCategory = new Category({ category });
    await newCategory.save();

    res.status(201).json({
      message: "Category created successfully",
      data: newCategory,
    });
  } catch (error) {
    console.error("Error creating category:", error);
    res.status(500).json({ error: "Server error" });
  }
};

const getAllCategories = async (req, res) => {
  console.log("2. ------------------------------");
  try {
    const categories = await Category.find({});
    res.status(200).json({ data: categories });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

const deleteCategory = async (req, res) => {
  console.log("3. ------------------------------");
  try {
    const { id } = req.params;
    await Category.findByIdAndDelete(id);
    res.status(200).json({ message: "Category deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

module.exports = {
  createCategory,
  getAllCategories,
  deleteCategory,
};
