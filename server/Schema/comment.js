import mongoose, { trusted } from "mongoose";
const commentAdd = new mongoose.Schema({
  comment  : {
    type: String,
    trim: true,
    required:true,
  },
  like : {
    type: String,
    default:0
    
  },
  dislike : {
    type: String,
    default:0
  },
  mention:{
    type:String,
  },
  postId:{
    type:String,
    required:true
  },
  addedAt: {
    type: Date,
    default: new Date(),
  },
 
});
const mongomodal=mongoose.model("commentAdd", commentAdd);
export default mongomodal;
