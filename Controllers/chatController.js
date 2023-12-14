import mongoose from 'mongoose';
import Chat from '../Models/ChatModel.js';
import User from '../Models/UserModel.js';


export const NewChat = async (req, res) => {
  try {
    const {userId} = req.body;
    const userObjectId = new mongoose.Types.ObjectId(req.user.id);
    
    const chatExists = await Chat.findOne({
      users: { $all: [userId, userObjectId] },
    })
      .populate('users', '-password')
      .populate('latestMessage')
      .populate('latestMessage.sender', 'username email pic');
    console.log(chatExists);
    if (chatExists) {
      res.json({ status: false, message: "User Chat already found", data: chatExists });
    } 
    else{
      // If the chat doesn't exist, create a new one
      const newChat = new Chat({
        users: [userId, userObjectId],
      });
      await newChat.save();
      console.log(newChat);
      const populatedChat = await Chat.findById(newChat._id)
      .populate('users', '-password');
      
      console.log(populatedChat);

      res.json({ status:true, message: "New  Chat created Successfuly!!!", data:populatedChat});

    }

 
  } catch (error) {
    console.error(error);
    return res.json({status: false, message: 'Internal server error' });
  }
};

export const AllChats = async (req, res) => {
  try {
    const userObjectId = new mongoose.Types.ObjectId(req.user.id);
    console.log(userObjectId);
    const chats = await Chat.find({
      users: { $elemMatch: { $eq: userObjectId } },
    })
    .populate('users')
    .populate('latestMessage')
    .populate('groupAdmin')
    .sort({ updatedAt: -1 });
    

    if(chats){
      const finalChats = await User.populate(chats, {
        path: 'latestMessage.sender',
        select: 'username email pic',
      });
      console.log(finalChats);
      res.json({status:true,message:"All Chats found Successfully !!!",data:finalChats});

    }
    else{
      res.json({status:false,message:"Cannot be Find All Chats. Please check it!!!"})
    }
  } catch (error) {
    console.log(error);
    res.json({status:false,message:'Something went wrong'});
  }
};

export const DeleteChat = async (req, res) => {
  try {
    const chat = await Chat.findByIdAndDelete({_id:req.params.id});
    console.log(chat);

    if (chat) {
      res.json({status:true,message:"Chat Deleted Successfully!!!",data:chat});
    }
    else{
      res.json({status:false,message:"Chat Already Deleted.Please check it"});
    }
  } catch (error) {
    console.log(error);
    res.json({status:false,message: 'Something went wrong' });
  }
};


export const viewChat = async (req, res) => {
  try {
    const chatId = req.params.id; // Assuming chatId is passed as a route parameter

    // Find the chat by ID
    const chat = await Chat.findById(chatId)
      .populate('users', '-password')
      .populate('latestMessage') // Assuming you have a 'messages' field in your chat schema

    if (!chat) {
      return res.json({status:false,message: 'Chat not found' });
    }

    res.json({ status: true, message: 'Chat retrieved successfully', data: chat });
  } catch (error) {
    console.error(error);
    return res.json({status:false, message: 'Something went wrong' });
  }
};


