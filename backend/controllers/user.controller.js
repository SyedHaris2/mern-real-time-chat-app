import User from "../models/user.model.js";

export const getUserforSidebar = async (req, resp) => {
  try {
    const loggedInUserId = req.user._id;
    const filteredUsers = await User.find({
      _id: { $ne: loggedInUserId },
    }).select("-password"); //Fetch all users except current users

    resp.status(200).json(filteredUsers);
  } catch (error) {
    console.log("Error in getUserSidebar", error.message);

    resp.status(500).json({ error: "Internal server error" });
  }
};
