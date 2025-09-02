import mongoose from "mongoose";

const instituteSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    default: "Excellence Coaching Institute"
  },
  about: {
    type: String,
    required: true,
    default: "Leading coaching institute providing quality education and professional training for over 22 years."
  }
});

const Institute = mongoose.model("Institute", instituteSchema);
export default Institute;
