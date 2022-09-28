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
  user:{
    type:Schema.Types.ObjectId,
    ref:"user"
  },
  comments:[{
    type:Schema.Types.ObjectId,
    ref:"comment"
  }],
  like:[{
    type:Schema.Types.ObjectId,
    ref:"user"
  }],
  


  status:false,
  question:String,
  ans1:String,
  ans2:String,
  enddate:{type: Date},
  
});
const postmodal=model("Addpost", Addpost);
export default postmodal;
