import mongoose from "mongoose";
const Addpost = new mongoose.Schema({
  tag:[String],
  title : {
    type: String,
    trim: true,
    required:true,
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
  enddate:{type: Date, default: Date.now}
});
const postmodal=mongoose.model("Addpost", Addpost);
export default postmodal;
