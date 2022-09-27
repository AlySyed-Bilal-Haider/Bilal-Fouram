import {model, mongoose, Schema} from "mongoose";
const Addpost = new Schema({
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
  email:String,
  comments:[{
    type:Schema.Types.ObjectId,
    ref:"commentAdd"
  }],
});
const postmodal=model("Addpost", Addpost);
export default postmodal;
