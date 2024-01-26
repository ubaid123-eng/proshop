import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";

const protect = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      //taking token from the postman header&authorization and ...
      //index[1] means that at[0] we have 'Bearer' and at [1] we have the token....

      token = req.headers.authorization.split(" ")[1];

      //this decodes whatever the token is
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      req.user = await User.findById(decoded.id).select("-password");

      next();
    } catch (error) {
      console.error(error);
      res.status(401);
      throw new Error("Not Authorized , token failed");
    }
  }

  if (!token) {
    res.status(401);
    throw new Error("Not Authorized , no no token");
  }
});

const admin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(401);
    throw new Error("Not an Admin");
  }
};

export { protect, admin };
