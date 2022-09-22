import mongoose from "mongoose";
const Adduser = new mongoose.Schema({
  name  : {
    type: String,
    trim: true,
    required:true,
  },
  email : {
    type: String,
    trim: true,
    required:true,
    unique:true
  },
  password : {
    type: String,
    trim: true,
    required:true,
  },
  img:
    {
        data: Buffer,
        contentType: String
    }
});
const mongomodal=mongoose.model("mindao", Adduser);
export default mongomodal;
