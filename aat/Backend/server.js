import express from "express";
import webpack from "webpack";
import dotenv from "dotenv";
import mongoose from "mongoose";
import { v2 as cloudinary } from 'cloudinary';
//following imports for authentication
import cookieParser from "cookie-parser";
import cors from "cors";
import institute from "./routes/institute.js"
import process from 'process';
import User from "./models/User.js";
import authRoutes from "./routes/authRoutes.js"; // import the router
import { signup, login, logout } from "./Controller/SignUpController.js";
// Define port from .env 
const port = process.env.PORT ;
dotenv.config();
const MONGO_URL = process.env.MONGO_URI
//middleware express instantiated
const app = express();
//middleware to ftech data
app.use(express.urlencoded({ extended: true })); // optional for form data 
/*Routes for SignUp
app.post("/api/auth/signup", signup);
app.post("/api/auth/login", login);
app.post("/api/auth/logout", logout);*/

app.use(express.json());
app.use("/api/auth", authRoutes); // all /signup, /login, /logout routes go here

//connection with frontend 

app.use(cors());
app.use(express.json());
 

// Test Route
app.get("/", (req, res) => {
  res.send("CORS is working fine!");
});

app.use(cookieParser()); //extract token cereated in cookies while creaating a blog by Blog.create(blogData) 

//Mongo DB Connection
try{
  mongoose.connect(MONGO_URL);
  console.log("Connected to MongoDB");
}catch (error){
  console.log(error);
}



  //Cloudinary connection
  cloudinary.config({ 
   Cloud_NAME: 'process.env.CLOUD_NAME', 
    cloud_api_key: 'process.env.CLOUD_API_KEY', 
  CLOUD_SECRET_KEY: 'process.env.CLOUD_SECRET_KEY' 
});

console.log("Connected to cloudinary");








app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

