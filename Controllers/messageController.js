import Chat from '../Models/ChatModel.js';
import mongoose from 'mongoose';
import Message from '../Models/MessageModel.js';

export const sendMessage = async (req, res) => {
  const { chatId, message } = req.body;
  const userId = new mongoose.Types.ObjectId(req.user.id);
  try {
    // Create the message first
    const msg = await Message.create({ sender: userId, messages: message, chatId: chatId });
    console.log(msg);

    const populatedMessage = await Message.findById(msg._id)
      .populate({
        path: 'sender',
        select: 'username pic email', // Exclude the 'password' field
        model: 'users',
      })
      .populate({
        path: 'chatId',
        select: 'chatName isGroup users groupAdmin',
        model: 'chats',
        populate: [
          {
            path: 'users',
            select: 'username email pic', // Exclude the 'password' field
            model: 'users',
          },
          {
            path: 'groupAdmin',
            select: 'username email pic', // Exclude the 'password' field
            model: 'users',
          },
        ],
      })
      .exec();

      

    // Update the latestMessage field in Chat
     await Chat.findByIdAndUpdate(chatId, {
      latestMessage: populatedMessage,
    });
    console.log(populatedMessage)

    if (populatedMessage) {
      res.json({ status: true, message: 'Message sent successfully', data: populatedMessage });
    } else {
      res.json({ status: false, message: 'Message cannot be found' });
    }
  } catch (error) {
    console.log(error);
    res.json({ status: false, message: 'Something went wrong' });
  }
};

export const getMessages = async (req, res) => {
  const { chatId } = req.params;
  try {
    const messages = await Message.find({chatId:chatId})
      .populate({
        path: 'sender',
        model: 'users',
        select: 'username pic email',
      })
      .populate({
        path: 'chatId',
        select: 'chatName isGroup users groupAdmin',
        model: 'chats',
        populate: [
          {
            path: 'users',
            select: 'username email pic', // Exclude the 'password' field
            model: 'users',
          },
          {
            path: 'groupAdmin',
            select: 'username email pic', // Exclude the 'password' field
            model: 'users',
          },
        ],
      })
      .exec();

    console.log(messages);
    if (messages.length > 0) {
      res.json({status:true,message:'Messages retrieved successfully',data:messages});
    } else {
      res.json({status:false,message:'No messages found for this chat'});
    }
  } catch (error) {
    console.log(error); 
    res.json({ status:false,message:'Something went wrong'});
  }
};

