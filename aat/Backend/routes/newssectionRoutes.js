import express from "express";
import News from "../models/News.js";

const router = express.Router();

// ✅ Get all news
router.get("/", async (req, res) => {
  try {
    const news = await News.find().sort({ serialNumber: 1 });
    res.json(news);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ Get single news by ID
router.get("/:id", async (req, res) => {
  try {
    const newsItem = await News.findById(req.params.id);
    if (!newsItem) return res.status(404).json({ message: "News not found" });
    res.json(newsItem);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ Add news
router.post("/", async (req, res) => {
  try {
    const newNews = new News(req.body);
    await newNews.save();
    res.status(201).json(newNews);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// ✅ Update news
router.put("/:id", async (req, res) => {
  try {
    const updatedNews = await News.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedNews) return res.status(404).json({ message: "News not found" });
    res.json(updatedNews);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// ✅ Delete news
router.delete("/:id", async (req, res) => {
  try {
    const deleted = await News.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "News not found" });
    res.json({ message: "News deleted" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

export default router;
