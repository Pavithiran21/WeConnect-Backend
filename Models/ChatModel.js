import mongoose from 'mongoose';
const chatSchema = mongoose.Schema(
  {
    photo: {
      type: String,
      default: "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"
    },
    isGroup: {
      type: Boolean,
    },
    GroupName:{
      type:String,
    },
    users: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
      },
    ],
    latestMessage:[ {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'messages',
    }],
    groupAdmin: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'users',
    },
  },
  {
    timestamps: true,
  }
);
export default mongoose.model('chats', chatSchema);
