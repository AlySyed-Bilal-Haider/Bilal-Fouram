import mongoose from "mongoose";
const commentAdd = new mongoose.Schema({
  comment  : {
    type: String,
    trim: true,
    required:true,
  },
  like : {
    type: Number,
    default:0
    
  },
  userid:{
    type: String,
    required:true,
  },
  dislike : {
    type: Number,
    default:0
  },
  addedAt: {
    type: Date,
    default: new Date(),
  },
 
});
const commentModal=mongoose.model("commentAdd", commentAdd);
export default commentModal;
