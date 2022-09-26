import mongoose from "mongoose";
const vote = new mongoose.Schema({
  useremail: { type: String, trim: true, required: true, unique: true },
  postId: String,
  approve: { type: Number, default: 0 },
  unapprove: { type: Number, default: 0 },
  checkstatus: { type: Boolean, default: false },
});
const voiting = mongoose.model("voting", vote);
export default voiting;
