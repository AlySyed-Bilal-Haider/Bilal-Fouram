import mongoose, { Schema } from "mongoose";
const commentAdd = new Schema({
  comment: {
    type: String,
    trim: true,
    required: true,
  },
  username: String,
  userpic: {
    type: String,
    default: "",
  },
  addedAt: {
    type: Date,
    default: new Date(),
  },
  like: [
    {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
  ],
  reply: [
    {
      type: Schema.Types.ObjectId,
      ref: "comment",
    },
  ],
  mention: [
    {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
  ],
  visibility: {
    type: Boolean,
    default: true,
  },
});
const commentModal = mongoose.model("comment", commentAdd);
export default commentModal;
