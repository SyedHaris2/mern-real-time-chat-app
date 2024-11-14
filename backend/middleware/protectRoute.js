/*

import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import { Types } from "mongoose"; // Importing Types for ObjectId

const protectRoute = async (req, resp, next) => {
  try {
    console.log("Cookies:", req.cookies);
    const token = req.cookies.jwt;
    if (!token) {
      return resp
        .status(401)
        .json({ error: "Unauthorized - No Token Provided" });
    }
    //   console.log(token);

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded) {
      return resp.status(401).json({ error: "Unauthorized - Invalid Token" });
    }
    //  console.log(decoded);

    const user = await User.findById(decoded.userID).select("-password");
    // console.log("Queried user:", user);
    // const userId = new Types.ObjectId(decoded.userID); // Instantiate ObjectId
    // const user = await User.findById(userId).select("-password");

    // console.log("Queried User:", user); // Log queried user

    if (!user) {
      return resp.status(404).json({ error: "User not found" });
    }

    req.user = user;

    next();
  } catch (error) {
    console.log("Error in protectRoute middleware: ", error.message);

    resp.status(500).json({ error: "Internal Server error" });
  }
};

export default protectRoute;

// senderId;
// ObjectId("67111710ced8650c16d72c5d"); Sender-- Hem
// receiverId;
// ObjectId("67150dfe034e3b6eef28178f"); Rec --  Hamza

*/

import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

const protectRoute = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;

    if (!token) {
      return res
        .status(401)
        .json({ error: "Unauthorized - No Token Provided" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded) {
      return res.status(401).json({ error: "Unauthorized - Invalid Token" });
    }

    const user = await User.findById(decoded.userId).select("-password");

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    req.user = user;

    next();
  } catch (error) {
    console.log("Error in protectRoute middleware: ", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

export default protectRoute;
