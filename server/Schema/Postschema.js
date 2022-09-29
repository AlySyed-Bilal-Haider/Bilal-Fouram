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
  poll:{
    type:Schema.Types.ObjectId,
    ref:"poll"
  },
  visibility:{
    type: Boolean,
    default: true
  }
  
});
const postmodal=model("Addpost", Addpost);
export default postmodal;
