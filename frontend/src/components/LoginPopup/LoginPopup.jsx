import React, { useContext, useEffect } from "react";
import "./LoginPopup.css";
import { assets } from "../../assets/assets";
import { useState } from "react";
import { StoreContext } from "../../context/StoreContext";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const LoginPopup = ({ setShowLogin }) => {
  const { url, setToken, setUserId } = useContext(StoreContext);

  const [currState, setCurrState] = useState("Login");
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData({ ...data, [name]: value });
  };

  // ...existing code...
  const onLogin = async (event) => {
    event.preventDefault();

    const isLogin = currState === "Login";
    const newUrl = url + (isLogin ? "/api/user/login" : "/api/user/register");

    try {
      const response = await axios.post(newUrl, data);

      if (response.data?.success) {
        if (isLogin) {
          // Log in flow
          setToken(response.data.token);
          setUserId(response.data.userId);
          localStorage.setItem("userId", response.data.userId);
          localStorage.setItem("token", response.data.token);
          setShowLogin(false); // close popup
          toast.success(response.data.message || "Logged in");
        } else {
          // Register flow -> go to Login
          toast.success(
            response.data.message || "Registration successful. Please login."
          );
          setCurrState("Login"); // switch to Login view
          // navigate("/login");          // uncomment if you have a /login page
          // setShowLogin(true);          // keep popup open for login
          // Optionally clear password
          // setData({ name: "", email: data.email, password: "" });
        }
      } else {
        toast.error(response.data?.message || "Operation failed");
      }
    } catch (err) {
      const msg =
        err.response?.data?.message ||
        err.response?.data?.error ||
        err.message ||
        "Something went wrong";
      toast.error(msg);
    }
  };
  // ...existing code...

  return (
    <div className="login-popup">
      <form onSubmit={onLogin} className="login-popup-container" action="">
        <div className="login-popup-title">
          <h2>{currState}</h2>
          <img
            onClick={() => setShowLogin(false)}
            src={assets.cross_icon}
            alt=""
          />
        </div>
        <div className="login-popup-inputs">
          {currState === "Login" ? (
            <></>
          ) : (
            <input
              type="text"
              name="name"
              onChange={onChangeHandler}
              value={data.name}
              placeholder="Your name"
              id=""
              required
            />
          )}
          <input
            name="email"
            type="email"
            onChange={onChangeHandler}
            value={data.email}
            placeholder="Your email"
            id=""
            required
          />
          <input
            name="password"
            type="password"
            onChange={onChangeHandler}
            value={data.password}
            placeholder="Your password"
            id=""
            required
          />
        </div>
        <button type="submit">
          {currState === "Sign Up" ? "Create Account" : "Login"}
        </button>
        <div className="login-popup-condition">
          <input type="checkbox" name="" id="" required />
          <p>
            By Continuing , i agree to the <span>Terms of Service</span> and{" "}
            <span>Privacy Policy</span>
          </p>
        </div>
        {currState === "Login" ? (
          <p>
            Create a new account?{" "}
            <span onClick={() => setCurrState("Sign Up")}>Click here</span>
          </p>
        ) : (
          <p>
            Already have an account ?{" "}
            <span onClick={() => setCurrState("Login")}>Login here</span>
          </p>
        )}
      </form>
    </div>
  );
};

export default LoginPopup;
