import mongoose from "mongoose";

const commentAdd = new mongoose.Schema({
  comment  : {
    type: String,
    trim: true,
    required:true,
  },
  userid:{
    type: String,
    required:true,
  },
  addedAt: {
    type: Date,
    default: new Date(),
  },
 
});
const commentModal=mongoose.model("commentAdd", commentAdd);
export default commentModal;
