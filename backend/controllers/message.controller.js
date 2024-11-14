import Converation from "../models/conversation.model.js";
import Message from "../models/message.models.js";
import { getRecevierSocketId, io } from "../socket/socket.js";

export const sendMessage = async (req, resp) => {
  try {
    const { message } = req.body;
    const { id: receiverId } = req.params;
    const senderId = req.user._id;

    let conversation = await Converation.findOne({
      participants: { $all: [senderId, receiverId] },
    });

    if (!conversation) {
      conversation = await Converation.create({
        participants: [senderId, receiverId],
      });
    }

    const newMessage = new Message({
      senderId,
      receiverId,
      message,
    });

    if (newMessage) {
      conversation.message.push(newMessage._id);
    }

    // await conversation.save();
    // await newMessage.save();

    //This will run parallel
    await Promise.all([await conversation.save(), await newMessage.save()]);

    //SOCKET IO FUNCTINALITY HERE
    const recevierSocketId = getRecevierSocketId(receiverId);
    if (recevierSocketId) {
      //io to(socket.id).emit() used to send events to specific clients
      io.to(recevierSocketId).emit("newMessage", newMessage);
    }

    resp.status(201).json(newMessage);
  } catch (error) {
    console.log("Error in sendMessage controller: ", error.message);

    resp.status(500).json({ error: "Internal Server error" });
  }
};

export const getMessage = async (req, resp) => {
  try {
    const { id: userToChatId } = req.params;
    const senderId = req.user._id;

    const converation = await Converation.findOne({
      participants: { $all: [senderId, userToChatId] },
    }).populate("message");

    if (!converation) return resp.status(200).json([]);

    const messages = converation.message;

    resp.status(200).json(messages);
  } catch (error) {
    console.log("Error in getMessage controller: ", error.message);
    resp.status(500).json({ error: "Internal Server error" });
  }
};
