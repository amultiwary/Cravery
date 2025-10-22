import jwt from "jsonwebtoken";

const authMiddleware = async (req, res, next) => {
  let token = (await req.headers["token"]) || req.headers["authorization"];
  if (!token) {
    return res
      .status(401)
      .json({ success: false, message: "Not authorized, Login Again" });
  }

  if (token.startsWith("Bearer ")) {
    token = token.split(" ")[1];
  }

  try {
    const token_decode = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = token_decode.id;
    next();
  } catch (error) {
    return res
      .status(401)
      .json({ success: false, message: "Not authorized, Login Again" });
  }
};

export default authMiddleware;
