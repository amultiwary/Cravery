import express from "express";
import {
  addFood,
  listfood,
  deletefood,
} from "../controllers/foodController.js";
import { upload } from "../middleware/multer.middleware.js";
const foodRouter = express.Router();

//Image Storage Engine

foodRouter.post("/add", upload.single("image"), addFood);
foodRouter.get("/list", listfood);
foodRouter.post("/remove", deletefood);

export default foodRouter;
