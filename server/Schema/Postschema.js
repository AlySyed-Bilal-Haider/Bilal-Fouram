import mongoose from "mongoose";
const Addpost = new mongoose.Schema({
  tag:String,
  title : {
    type: String,
    trim: true,
    required:true,
  },
  addedAt: {
    type: Date,
    default: new Date(),
  },
  description : {
    type: String,
    trim: true,
    required:true,
  },
  status:false,
  question:String,
  ans1:String,
  ans2:String,
  enddate:{type: Date},
  username:String,
  email:String
});
const postmodal=mongoose.model("Addpost", Addpost);
export default postmodal;
