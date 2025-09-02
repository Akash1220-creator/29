import express from "express";
import multer from "multer";
import Blog from "../models/addnewblogSchema.js";
const router = express.Router();

// Configure Multer for image uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  }
});
const upload = multer({ storage });

// @POST Create Blog
router.post(
  "/",
  upload.fields([{ name: "coverImage" }, { name: "sliderImage" }]),
  async (req, res) => {
    try {
      const { title, status, shortDescription, longDescription } = req.body;

      const newBlog = new Blog({
        title,
        status,
        shortDescription,
        longDescription,
        coverImage: req.files?.coverImage ? req.files.coverImage[0].path : null,
        sliderImage: req.files?.sliderImage ? req.files.sliderImage[0].path : null,
      });

      await newBlog.save();
      res.status(201).json({ message: "Blog created successfully", blog: newBlog });
    } catch (error) {
      res.status(500).json({ error: "Error creating blog", details: error.message });
    }
  }
);



// @GET Get All Blogs
router.get("/", async (req, res) => {
  try {
    const blogs = await Blog.find().sort({ createdAt: -1 });
    res.json(blogs);
  } catch (error) {
    res.status(500).json({ error: "Error fetching blogs" });
  }
});

export default router;
