const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const User = require("../model/userModel");

const protect = asyncHandler(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      //Get Token from header
      token = req.headers.authorization.split(" ")[1];
      //The token starts with Bearer 1267612372637236(token) and what splits does it converts the token
      //an array and splits it with at 0 index the word Bearer and at the 1 index the actual token So
      //that's how we are getting the token

      //Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      //Get User Id from token
      req.user = await User.findById(decoded.id).select("-password");
      //When we get the req.user and then it's id so it gives a lot of things and we don't want the
      //password here so that's why we use "minus" password

      next();
    } catch (error) {
      console.log(error);
      res.status(401);
      throw new Error("Not Authorized");
    }
  }
  if (!token) {
    res.status(401);
    throw new Error("Not Authorized No Token");
  }
});

module.exports = { protect };
