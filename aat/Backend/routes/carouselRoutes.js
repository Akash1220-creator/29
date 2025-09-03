import express from 'express';
import carousel from '../models/carousel.js';
const router = express.Router();

// ✅ Get all carousel items
router.get("/", async (req, res) => {
  try {
    const data = await carousel.find();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ Add new carousel item
router.post("/", async (req, res) => {
  try {
    const {  imageUrl, title, description } = req.body;
    const newSlide = new carousel({ imageUrl, title, description });
    await newSlide.save();
    res.json(newSlide);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ Delete carousel item
router.delete("/:id", async (req, res) => {
  try {
    await carousel.findByIdAndDelete(req.params.id);
    res.json({ message: "Carousel item deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ Update carousel item
router.put("/:id", async (req, res) => {
  try {
    const { imageUrl, title, description } = req.body;
    const updatedSlide = await Carousel.findByIdAndUpdate(
      req.params.id,
      { imageUrl, title, description },
      { new: true }
    );
    res.json(updatedSlide);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
