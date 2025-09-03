import mongoose from "mongoose";
import { Schema, model } from 'mongoose';

const carouselSchema = new mongoose.Schema({
  imageUrl: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String }
});

export default mongoose.model("Carousel", carouselSchema);