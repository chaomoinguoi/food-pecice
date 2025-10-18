import express from "express";
import Recipe from "../models/Recipe.js";

const router = express.Router();

// ✅ Lấy tất cả công thức
router.get("/", async (req, res) => {
  try {
    const recipes = await Recipe.find();
    res.json(recipes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ✅ Tìm kiếm công thức theo tên hoặc nguyên liệu
router.get("/search", async (req, res) => {
  try {
    const { q } = req.query; // query string, ví dụ: /api/recipes/search?q=chicken
    if (!q) return res.json([]);

    const regex = new RegExp(q, "i"); // không phân biệt hoa thường
    const recipes = await Recipe.find({
      $or: [
        { title: regex },
        { ingredients: regex }
      ],
    });
    res.json(recipes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ✅ Thêm mới công thức
router.post("/", async (req, res) => {
  try {
    const recipe = new Recipe(req.body);
    await recipe.save();
    res.status(201).json(recipe);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

export default router;
