import { model, Schema } from "mongoose";
const Post = new Schema({
  tag: String,
  title: {
    type: String,
    trim: true,
    required: true,
  },
  addedAt: {
    type: Date,
    default: new Date(),
  },
  description: {
    type: String,
    required: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "user",
  },
  comments: [
    {
      type: Schema.Types.ObjectId,
      ref: "comment",
    },
  ],
  like: [
    {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
  ],
  poll: {
    type: Schema.Types.ObjectId,
    ref: "poll",
  },
  visibility: {
    type: Boolean,
    default: true,
  },
  status: {
    type: String,
    default: "Pending",
  },
});
const postModal = model("post", Post);
export default postModal;
