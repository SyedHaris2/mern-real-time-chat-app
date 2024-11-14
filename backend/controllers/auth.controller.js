import bcrypt from "bcryptjs";
import User from "../models/user.model.js";
import generateTokenAndSetCookie from "../utils/generateToken.js";

//Signup
export const signup = async (req, resp) => {
  try {
    const { fullName, username, password, confirmPassword, gender } = req.body;
    if (password !== confirmPassword) {
      return resp.status(400).json({ error: "password don't match" });
    }

    const user = await User.findOne({ username });

    if (user) {
      return resp.status(400).json({ error: "username already existed" });
    }

    //Hash Password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`;
    const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`;

    const newUser = new User({
      fullName,
      username,
      password: hashedPassword,
      gender,
      profilePic: gender === "male" ? boyProfilePic : girlProfilePic,
    });

    if (newUser) {
      //Generate JWT token
      generateTokenAndSetCookie(newUser._id, resp);

      await newUser.save();

      resp.status(201).json({
        _id: newUser._id,
        fullName: newUser.fullName,
        username: newUser.username,
        profilePic: newUser.profilePic,
      });
    } else {
      resp.status(400).json({ error: "invalid user data" });
    }
  } catch (error) {
    console.log("Error in signup controller", error.message);
    resp.status(500).json({ error: "internal server error" });
  }
};

//Login
export const login = async (req, resp) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    const isPasswordCorreect = await bcrypt.compare(
      password,
      user?.password || ""
    );

    if (!user || !isPasswordCorreect) {
      return resp.status(400).json({ error: "invalid username or password" });
    }

    generateTokenAndSetCookie(user._id, resp);

    resp.status(200).json({
      _id: user._id,
      fullName: user.fullName,
      username: user.username,
      profilePic: user.profilePic,
    });
  } catch (error) {
    console.log("Error in login controller", error.message);
    resp.status(500).json({ error: "internal server error" });
  }
};

//Logout
export const logout = (req, resp) => {
  try {
    resp.cookie("jwt", "", { maxAge: 0 });
    resp.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    console.log("Error in logout controller", error.message);
    resp.status(500).json({ error: "internal server error" });
  }
};
