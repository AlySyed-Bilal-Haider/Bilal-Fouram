
import mongoose, { Schema } from "mongoose";

const Adduser = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: true,
  },
  email: {
    type: String,
    trim: true,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    trim: true,
    required: true,
  },
  addedAt: {
    type: Date,
    default: new Date(),
  },
  img: {
    type: String,
    default: "",
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user'
  },
  discussion: [{
    ref_id: {
      type: Schema.Types.ObjectId,
      ref: "post"
    },
    date: {
      type: Date,
      default: new Date(),
    },
  }],
  like: [{
    ref_id: {
      type: Schema.Types.ObjectId,
      ref: "post"
    },
    date: {
      type: Date,
      default: new Date(),
    },
  }],
  poll: [{
    ref_id: {
      type: Schema.Types.ObjectId,
      ref: "post"
    },
    date: {
      type: Date,
      default: new Date(),
    },
  }],
  mention: [{
    ref_id: {
      type: Schema.Types.ObjectId,
      ref: "comment"
    },
    date: {
      type: Date,
      default: new Date(),
    },
  }]
});
const userModal = mongoose.model("user", Adduser);
export default userModal;
