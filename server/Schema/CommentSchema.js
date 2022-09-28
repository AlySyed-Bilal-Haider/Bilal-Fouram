import mongoose, { Schema } from "mongoose";
const commentAdd = new Schema({
  comment: {
    type: String,
    trim: true,
    required: true,
  },
  userName: String,
  addedAt: {
    type: Date,
    default: new Date(),
  },
  like: [{
    type: Schema.Types.ObjectId,
    ref: "user"
  }],
  dislike: [{
    type: Schema.Types.ObjectId,
    ref: "user"
  }],
  reply: [{
    type: Schema.Types.ObjectId,
    ref: "comment"
  }],
  


});
const commentModal = mongoose.model("comment", commentAdd);
export default commentModal;
