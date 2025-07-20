import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";
dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key:    process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

export const uploadImagetoCloudinary = async (file, folder, height, quality) => {
  const options = { folder };
  if (height) options.height = height;
  if (quality) options.quality = quality;
  options.resource_type = "auto";

  const result = await cloudinary.uploader.upload(file.tempFilePath, options);
  return {
    url: result.secure_url,
    public_id: result.public_id
  };
};
