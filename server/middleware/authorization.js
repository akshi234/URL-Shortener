const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();

const authorization = (req, res, next) => {
  // console.log(req.headers);
  const { token } = req.headers;
  console.log(token);

  if (!token) {
    return res.status(401).json({ message: "Unauthorized: Token missing" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Decoded Token Payload:", decoded);
    req.user = decoded;
    next();
  } catch (error) {
    console.error("JWT Verification Error:", error);
    return res
      .status(401)
      .json({ message: "Unauthorized: Invalid token", error: error.message });
  }
};
module.exports = authorization;
