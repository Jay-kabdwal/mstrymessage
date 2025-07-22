import mongoose, { Schema, Document } from "mongoose";

//define datatype(interface) in typescript
export interface Message extends Document {
  content: string;
  createdAt: Date;
}

const MessageSchema: Schema<Message> = new Schema({
  content: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    required: true,
  },
});

export interface User extends Document {
  username: string;
  email: string;
  password: string;
  verifyCode: string;
  verifycodeExpiry: Date;
  isVerified: boolean;
  isAcceptingMessage: boolean;
  message: Message[];
}

const UserSchema :Schema<User>=new Schema({
    username:{
        type:String,
        required:[true,"username is required"],
        trim:true,
        unique:true,
    },
    email:{
        type:String,
        required:[true,"email is required"],
        trim:true,
        unique:true,
        match:[ /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/ ,"please enter a valid email"]
    },
    password:{
        type:String,
        required: [true,"password is required"],
    },
    verifyCode:{
        type: String,
        required: [true,"verifyCode is required"],
    },
    verifycodeExpiry:{
        type: Date,
        required: [true,"verify code Expiry is required"],    
    },
    isVerified:{
        type: Boolean,
        default: false,
    },
    isAcceptingMessage:{
        type: Boolean,
        default: false,
    },
    message:[MessageSchema],
})

const UserModel = ( mongoose.models.User as mongoose.Model<User> ) || mongoose.model<User>("User", UserSchema);

export default UserModel;