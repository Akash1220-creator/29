import express from "express";
import Institute from "../models/Institute.js";
const router = express.Router();

// @route   POST /api/institute
// API to save institute info
router.post("/api/institute", async (req, res) => {
  try {
    const { name, about } = req.body;
    const institute = new Institute({ name, about });
    await institute.save();
    res.json({ success: true, message: "Institute info saved!" });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

export default router;
