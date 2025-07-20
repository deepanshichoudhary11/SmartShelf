import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ["customer", "staff"],
    required: true,
  },
  points: {
    type: Number, 
    default: 0
  }
});

export default mongoose.model("User", userSchema);
