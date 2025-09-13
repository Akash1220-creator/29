import express from "express";
import Subscriber from "../models/subscribe.js"

const router = express.Router();

// ✅ Add subscriber
router.post("/", async (req, res) => {
  try {
    const { whatsapp, email } = req.body;

    if (!whatsapp || !email) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existing = await Subscriber.findOne({ email });
    if (existing) {
      return res.status(400).json({ message: "Already subscribed with this email" });
    }

    const newSubscriber = new Subscriber({ whatsapp, email });
    await newSubscriber.save();

    res.status(201).json({ message: "Subscription successful", subscriber: newSubscriber });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// ✅ Get all subscribers (for Admin Panel view)
router.get("/", async (req, res) => {
  try {
    const subscribers = await Subscriber.find().sort({ createdAt: -1 });
    res.json(subscribers);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// ✅ Delete a subscriber
router.delete("/:id", async (req, res) => {
  try {
    await Subscriber.findByIdAndDelete(req.params.id);
    res.json({ message: "Subscriber removed" });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

export default router;
