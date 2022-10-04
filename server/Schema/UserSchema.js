
import {model, mongoose, Schema} from "mongoose";

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
  post: [{
    type: Schema.Types.ObjectId,
    ref: "post"
  }],
  discussion: [{
    type: Schema.Types.ObjectId,
    ref: "post"
  }],
  like: [{
    type: Schema.Types.ObjectId,
    ref: "post"
  }],
});
const usermodal = mongoose.model("user", Adduser);
export default usermodal;
