import jwt from "jsonwebtoken";

const generateTokenAndSetCookie = (userId, resp) => {
  console.log("Generating Token for User ID:", userId);
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "15d",
  });

  resp.cookie("jwt", token, {
    maxAge: 15 * 24 * 60 * 60 * 1000, //Millisecond
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.NODE_ENV !== "development",
  });
};

export default generateTokenAndSetCookie;
