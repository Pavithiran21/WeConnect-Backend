import mongoose from "mongoose";
const {Schema} = mongoose;
const messageSchema = new Schema({
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
  },
  messages: {
    type: String,
    trim: true,
  },
  chatId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "chats",
  },
},
{
  timestamps: true,
});
export default mongoose.model("messages", messageSchema);

