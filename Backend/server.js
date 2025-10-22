import express from "express";
import cors from "cors";
import dotenv from "dotenv"
import { connectDB } from "./config/db.js";
import foodRouter from "./routes/foodRoute.js";
import userRouter from "./routes/userRoutes.js";
import cartRouter from "./routes/cartRoute.js";
import orderRouter from "./routes/orderRoute.js";

//app config
dotenv.config();
const app = express();

//middleware
app.use(express.json());

const allowed = (
  process.env.FRONTEND_URLS ||
  "http://localhost:5173,https://cravery-eight.vercel.app"
)
  .split(",")
  .map((s) => s.trim())
  .filter(Boolean);

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true); // allow non-browser tools
      return allowed.includes(origin)
        ? callback(null, true)
        : callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
  })
);

//DB Connection

connectDB();

// api endpoints

app.use("/api/food", foodRouter);
app.use("/api/user", userRouter);
app.use("/api/cart", cartRouter);
app.use("/api/order", orderRouter);
app.get("/", (req, res) => {
  res.send("api working");
});

//run express server
app.listen(process.env.port, () => {
  console.log(`server started on port http://localhost:${process.env.port}`);
});
