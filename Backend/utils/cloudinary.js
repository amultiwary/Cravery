import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import dotenv from "dotenv";
dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadoncloudinary = async (localfilepath) => {
  try {
    if (!localfilepath) return "file path not found";
    // upload the file on cloudinary
    const response = await cloudinary.uploader.upload(localfilepath, {
      resource_type: "image",
    });


    return response;
  } catch (error) {
    fs.unlinkSync(localfilepath); // remove the locally saved temporary file as the upload operation got failed
    return null;
  }
};

export { uploadoncloudinary };
