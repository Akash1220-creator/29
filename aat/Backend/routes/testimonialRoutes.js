import express from "express";
import multer from "multer";
import path from "path";
import Testimonial from "../models/testimonial.js";

const router = express.Router();

 
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'Uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({ storage: storage });

// Single file upload
router.post('/', upload.single('profileImage'), async (req, res) => {
  console.log("req.body:", req.body);
  console.log("req.file:", req.file);

  try {
    const testimonial = new Testimonial({
      name: req.body.name,
      designation: req.body.designation,
      message: req.body.message,
      profileImage: req.file ? req.file.filename : null
    });
    await testimonial.save();
    res.json(testimonial);
  } catch (err) {
    res.status(400).json({ error: err.message });
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
