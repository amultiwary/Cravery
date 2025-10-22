import React, { useContext, useEffect, useState } from "react";
import "./MyOrders.css";
import { StoreContext } from "../../context/StoreContext";
import axios from "axios";
import { assets } from "../../assets/assets.js";

const MyOrders = () => {
  const { url, token } = useContext(StoreContext);
  const [data, setData] = useState([]);

  const fetchOrder = async () => {
    const response = await axios.post(
      url + "/api/order/userOrders",
      {},
      { headers: { token } }
    );
    setData(response.data.data);
  };

  useEffect(() => {
    fetchOrder();
  }, [token]);

  return (
    <div className="my-orders">
      <h2>My Orders</h2>
      <div className="orders-container">
        {data.length > 0 ? (
          data.map((order, index) => {
            const key = order._id || index;
            return (
              <div key={key} className="my-orders-order">
                <img src={assets.parcel_icon} alt="" />
                <p>
                  {order.items.map((item, i) =>
                    i === order.items.length - 1
                      ? `${item.name} x ${item.quantity}`
                      : `${item.name} x ${item.quantity},`
                  )}
                </p>
                <p>${order.amount}.00</p>
                <p>Items:{order.items.length}</p>
                <p>
                  <span>&#x25cf;</span> <b>{order.status}</b>
                </p>
                <button
                  onClick={() => {
                    fetchOrder();
                  }}
                >
                  Track Order
                </button>
              </div>
            );
          })
        ) : (
          <div>
            <p style={{color:'red'}}>You Haven't Ordered Anything Yet</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyOrders;
