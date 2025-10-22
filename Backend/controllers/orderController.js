import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import Razorpay from "razorpay";
import dotenv from "dotenv";
import crypto from "crypto";

dotenv.config();

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

const placeOrder = async (req, res) => {
  const frontend_url = process.env.frontend_url;
  try {
    const newOrder = new orderModel({
      userId: req.body.userId,
      items: req.body.items,
      amount: req.body.amount,
      address: req.body.address,
      status: req.body.status || "pending",
    });
    await newOrder.save();

    await userModel.findByIdAndUpdate(req.body.userId, { cartData: {} });

    // Razorpay expects amount in paise
    const amountInPaise = req.body.amount * 100;

    const razorpayOrder = await razorpay.orders.create({
      amount: amountInPaise,
      currency: "INR",
      receipt: `order_rcptid_${newOrder._id}`,
      notes: {
        orderId: newOrder._id.toString(),
      },
    });

    res.json({
      success: true,
      orderId: newOrder._id,
      razorpayOrderId: razorpayOrder.id,
      amount: amountInPaise,
      key: process.env.RAZORPAY_KEY_ID,
      currency: "INR",
      frontend_url,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// You may want to verify payment using Razorpay signature in verifyOrder
const verifyOrder = async (req, res) => {
  const {
    orderId,
    razorpay_payment_id,
    razorpay_order_id,
    razorpay_signature,
  } = req.body;
  try {
    // Generate expected signature
    const generated_signature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(razorpay_order_id + "|" + razorpay_payment_id)
      .digest("hex");

    if (generated_signature === razorpay_signature) {
      await orderModel.findByIdAndUpdate(orderId, { payment: true });
      res.json({ success: true, message: "Payment verified and order paid." });
    } else {
      await orderModel.findByIdAndDelete(orderId);
      res.json({ success: false, message: "Payment verification failed." });
    }
  } catch (err) {
    res
      .status(500)
      .json({ success: false, message: "Error in payment verification." });
  }
};

//user order for frontend
const userOrders = async (req, res) => {
  try {
    const orders = await orderModel.find({ userId: req.userId });
    res.json({ success: true, data: orders });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

//Listing orders for admin panel

const listOrders = async (req, res) => {
  try {
    const order = await orderModel.find({});
    res.json({ success: true, data: order });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// api for updating order status

const updateStatus = async (req, res) => {
  try {
    await orderModel.findByIdAndUpdate(req.body.orderId, {
      status: req.body.status,
    });
    res.json({ success: true, message: "Status updated successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export { placeOrder, verifyOrder, userOrders, listOrders, updateStatus };
