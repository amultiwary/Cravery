import express from "express";
import cors from "cors";
import "dotenv/config";
import { connectDB } from "./config/db.js";
import foodRouter from "./routes/foodRoute.js";
import userRouter from "./routes/userRoutes.js";
import cartRouter from "./routes/cartRoute.js";
import orderRouter from "./routes/orderRoute.js";
//app config

const app = express();
const port = 4000;

//middleware
app.use(express.json());
app.use(
  cors({
    origin: "*", // Adjust this to your frontend's URL
  })
);

//DB Connection

connectDB();

// api endpoints

app.use("/api/food", foodRouter);
// app.use("/images", express.static("uploads"));
app.use("/api/user", userRouter);
app.use("/api/cart", cartRouter);
app.use("/api/order", orderRouter);
//api working
app.get("/", (req, res) => {
  res.send("api working");
});

//run express server
app.listen(port, () => {
  console.log(`server started on port http://localhost:${port}`);
});
