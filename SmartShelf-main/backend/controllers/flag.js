import Flag from "../models/flag.js";
import User from '../models/user.js'
import { uploadImagetoCloudinary } from "../utils/imageUploader.js";
import { v2 as cloudinary } from "cloudinary";

export const checkflags = async (req, res) => {
  try {
    const flags = await Flag.find();
    return res.status(200).json({
      success: true,
      data: flags,
    });
  } catch (error) {
    console.error("Error fetching flags:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch flags",
    });
  }
};

export const closeflag = async (req, res) => {
  try {
    const { flagId } = req.body;

    if (!flagId) {
      return res.status(400).json({ success: false, message: "Flag ID is required" });
    }

    const flag = await Flag.findById(flagId).populate("users", "email points");
    // console.log(flag)
    if (!flag) {
      return res.status(404).json({ success: false, message: "Flag not found" });
    }

    // 1. Delete all images from Cloudinary
    for (const img of flag.images) {
      if (img?.public_id) {
        await cloudinary.uploader.destroy(img.public_id);
      }
    }

    // 2. Award points to the reporting user
    const user = await User.findById(flag.users);// flag.users is a single user ID (ObjectId)
    // console.log(user)
    if (user) {
      user.points += 50;
      await user.save();
    }

    // 3. Delete the flag
    await Flag.findByIdAndDelete(flagId);

    return res.status(200).json({
      success: true,
      message: "Flag closed and user awarded +50 points",
      awardedTo: user?.email,
      currentPoints: user?.points,
    });
  } catch (error) {
    console.error("Error closing flag:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to close flag",
    });
  }
};

export const checkItemsDetails = async (req, res) => {
  try {
    const { query } = req.query;

    if (!query) {
      return res
        .status(400)
        .json({ success: false, message: "Query parameter is required" });
    }

    // Mock response or fetch from DB
    const mockResults = [
      {
        name: "Coca Cola 500ml",
        aisle: "A-12",
        price: "₹40",
        stock: "In Stock",
      },
      { name: "Coca Cola 1L", aisle: "A-12", price: "₹75", stock: "Low Stock" },
    ];

    const results = mockResults.filter((item) =>
      item.name.toLowerCase().includes(query.toLowerCase())
    );

    return res.status(200).json({
      success: true,
      results,
    });
  } catch (error) {
    console.error("Error fetching item details:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch item details",
    });
  }
};

export const flagItem = async (req, res) => {
  try {
    const { shelfCode, priority = "low", email } = req.body;

    if (!email || !shelfCode) {
      return res.status(400).json({ message: "Missing shelfCode or email" });
    }

    if (!req.files || !req.files.image) {
      return res.status(400).json({ message: "No image file provided" });
    }

    const images = Array.isArray(req.files.image)
      ? req.files.image
      : [req.files.image];

    const uploadedImageUrls = [];

    for (const image of images) {
      const { url, public_id } = await uploadImagetoCloudinary(
        image,
        "smart_shelf_flags"
      );
      uploadedImageUrls.push({ url, public_id });
    }

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found with given email" });
    }

    // Create new flag
    const newFlag = new Flag({
      shelfCode,
      priority,
      users: user._id, // since `users` is a single ObjectId field
      images: uploadedImageUrls,
    });

    await newFlag.save();

    res.status(201).json({
      success: true,
      message: "Flag submitted successfully",
      data: newFlag,
    });
  } catch (error) {
    console.error("Error in flagItem:", error);
    res.status(500).json({
      success: false,
      message: "Server error while flagging item",
    });
  }
};

// export const fetchPoints = async (req, res) => {
//   try {
//     const user = await User.findById(req.query.userId);
//     if (!user) return res.status(404).json({ message: "User not found" });

//     return res.status(200).json({ points: user.points });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: "Server error" });
//   }
// }

export const fetchPointsByEmail = async (req, res) => {
  try {
    const email = req.query.email;
    // console.log(req.query)
    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    const user = await User.findOne({ email }).select("points");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({ points: user.points });
  } catch (err) {
    console.error("Error fetching points by email:", err);
    return res.status(500).json({ message: "Server error" });
  }
};