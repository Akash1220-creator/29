import express from "express";
import multer from "multer";
import path from "path";
import Testimonial from "../models/testimonial.js";

const router = express.Router();

//  Configure Multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "Uploads/"); // save files in Uploads folder
  },
  filename: (req, file, cb) => {
    cb(
      null,
      Date.now() + "-" + file.originalname.replace(/\s+/g, "_") // unique filename
    );
  },
});

const upload = multer({ storage });


//  Create a new testimonial with image
router.post("/", upload.single("profileImage"), async (req, res) => {
  try {
    const { name, designation, message } = req.body;
    console.log("req.body:", req.body); 
    console.log("req.file:", req.file);

    const newTestimonial = new Testimonial({
      profileImage: req.file ? `/Uploads/${req.file.filename}` : null, // store path
      name,
      designation,
      message,
    });

    await newTestimonial.save();
    res.status(201).json(newTestimonial);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});


//  Get all testimonials
router.get("/", async (req, res) => {
  try {
    const testimonials = await Testimonial.find().sort({ createdAt: -1 });
    res.json(testimonials);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


//  Update testimonial (with optional new image)
router.put("/:id", upload.single("profileImage"), async (req, res) => {
  try {
    const { name, designation, message } = req.body;

    const updatedData = {
      name,
      designation,
      message,
    };

    if (req.file) {
      updatedData.profileImage = `/Uploads/${req.file.filename}`;
    }

    const updatedTestimonial = await Testimonial.findByIdAndUpdate(
      req.params.id,
      updatedData,
      { new: true, runValidators: true }
    );

    if (!updatedTestimonial) {
      return res.status(404).json({ error: "Testimonial not found" });
    }

    res.json(updatedTestimonial);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});


//  Delete testimonial
router.delete("/:id", async (req, res) => {
  try {
    const deletedTestimonial = await Testimonial.findByIdAndDelete(req.params.id);
    if (!deletedTestimonial) {
      return res.status(404).json({ error: "Testimonial not found" });
    }
    res.json({ message: "Testimonial deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
