import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

const Verify = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [status, setStatus] = useState("Verifying...");
  const url=import.meta.env.VITE_URL;
  const query = new URLSearchParams(location.search);
  const orderId = query.get("orderId");
  const payment_id = query.get("payment_id");
  const razorpay_order_id = query.get("order_id"); 
  const signature = query.get("signature");

  useEffect(() => {
    const verifyPayment = async () => {
      try {
        const res = await axios.post(`${url}/api/order/verify`, {
          orderId,
          razorpay_payment_id: payment_id,
          razorpay_order_id,
          razorpay_signature: signature,
        });

        if (res.data.success) {
          setStatus("Payment Successful ✅ Redirecting to My Orders...");
          setTimeout(() => navigate("/myorders"), 2000);
        } else {
          setStatus("Payment Verification Failed ❌ Redirecting...");
          setTimeout(() => navigate("/cart"), 2000);
        }
      } catch (err) {
        setStatus("Something went wrong ❌ Redirecting...");
        setTimeout(() => navigate("/cart"), 2000);
      }
    };

    verifyPayment();
  }, [orderId, payment_id, razorpay_order_id, signature, navigate]);

  return (
    <div className="verify">
      <h2>{status}</h2>
    </div>
  );
};

export default Verify;
