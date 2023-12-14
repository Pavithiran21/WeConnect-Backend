
import mongoose from 'mongoose';
const {Schema} = mongoose;

const UserSchema = new Schema({
    username:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    pic: {
        type: String,
        default: "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"
    },
    bio: {
        type: String,
        default: 'Available',
    },    
    resetToken:{
        type:String,
        require:false,
        
    },
    resetExpires:{
        type:Date
    },
    updatedAt:{
        type:Date,
        default:Date.now()
    },  
},
{
    timestamps: true
});



export default mongoose.model('users', UserSchema);
