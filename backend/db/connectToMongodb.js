import mongoose from "mongoose";

const connectToMongodb = async () => {
  try {
    await mongoose.connect(process.env.MONGO_DB_URI);

    console.log("Connected to Mogngo DB..");
  } catch (error) {
    console.log("Not connected", error.message);
  }
};
//MONGO_DB_URI=mongodb+srv://forlearningpurpose02:eutwoQYLB8ipBUdE@cluster0.2nwgb.mongodb.net/chatapp-db?retryWrites=true&w=majority

export default connectToMongodb;
