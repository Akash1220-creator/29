import express from "express";
import WebsiteInfo from "../models/websiteinfo.js";

const router = express.Router();

// @route   POST /api/institute
// @desc    Create new website info
router.post("/", async (req, res) => {
  try {
    const { name, about } = req.body;
    const info = new WebsiteInfo({ name, about });
    await info.save();   
    res.status(201).json(info);
  } catch (err) {
    console.error(err);  
    res.status(500).json({ error: "Server Error" });
  }
});


// @route   GET /api/institute
// @desc    Get all website infos
router.get("/", async (req, res) => {
  try {
    const infos = await WebsiteInfo.find();
    res.json(infos);
  } catch (err) {
    res.status(500).json({ error: "Server Error" });
  }
});

// @route   GET /api/institute/:id
// @desc    Get website info by ID
router.get("/:id", async (req, res) => {
  try {
    const info = await WebsiteInfo.findById(req.params.id);
    if (!info) return res.status(404).json({ error: "Not found" });
    res.json(info);
  } catch (err) {
    res.status(500).json({ error: "Server Error" });
  }
});

export default router;
