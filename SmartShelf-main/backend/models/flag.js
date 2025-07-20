import mongoose from "mongoose";

const flagSchema = new mongoose.Schema({
  users: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  priority: {
    type: String,
    default: "low",
  },
  shelfCode: {
    type: String,
    required: true,
  },
  images: [
    {
      url: { type: String, required: true },
      public_id: { type: String, required: true },
    },
  ],
});

const flag = mongoose.model("Flag", flagSchema);
export default flag;
