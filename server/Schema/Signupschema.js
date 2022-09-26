import mongoose from "mongoose";
const Adduser = new mongoose.Schema({
  name  : {
    type: String,
    trim: true,
    required:true,
  },
  email : {
    type: String,
    trim: true,
    required:true,
    unique:true
  },
  password : {
    type: String,
    trim: true,
    required:true,
  },
  addedAt: {
    type: Date,
    default: new Date(),
  },
  img:
    {
        type:String,
        default:""
    }
});
const mongomodal=mongoose.model("mindao", Adduser);
export default mongomodal;
