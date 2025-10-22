import foodModel from "../models/foodModel.js";
import fs from "fs";
import { uploadoncloudinary } from "../utils/cloudinary.js";

// add food item

const addFood = async (req, res) => {
  try {
    if (!req.file)
      return res
        .status(400)
        .json({ success: false, message: "No image file found" });

    const localFilePath = req.file.path || req.file.filename;

    const uploadResponse = await uploadoncloudinary(localFilePath);

    if (fs.existsSync(localFilePath)) {
      try {
        fs.unlinkSync(localFilePath);
      } catch (_) {}
    }

    if (!uploadResponse) {
      return res
        .status(500)
        .json({ success: false, message: "Image upload failed" });
    }

    const imageUrl = uploadResponse.secure_url || uploadResponse.url || null;

    const food = new foodModel({
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      category: req.body.category,
      image: imageUrl,
    });

    await food.save();
    res.json({ success: true, message: "Food item added successfully" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Failed to add food item" });
  }
};

const listfood = async (req, res) => {
  try {
    const foods = await foodModel.find({});
    res.json({ success: true, foods: foods });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Failed to retrieve food items" });
  }
};

const deletefood = async (req, res) => {
  try {
    const food = await foodModel.findById(req.body.id);
    if (!food) {
      return res.json({ success: false, message: "Food item not found" });
    }
    await foodModel.findByIdAndDelete(req.body.id);
    res.json({ success: true, message: "Food item deleted successfully" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Failed to delete food item" });
  }
};

export { addFood, listfood, deletefood };
