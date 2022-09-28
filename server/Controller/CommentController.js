
import commentModal from "../Schema/CommentSchema.js";
import postmodal from "../Schema/Postschema.js";
import mongoose from "mongoose";

export const commentHandler = async (req, res, next) => {
  // const comment = req.body.comment;
  // const postId = req.body.postId;

  console.log(req.body);
  try {
    const newComment = new commentModal(req.body);

    await newComment.save();
  
    const post = await postmodal.findByIdAndUpdate(req.body.post_id,{ $push: { comments : newComment._id } });

    res.json({
      status: "ok",
      success: true,
      message: "Comment add Successfully!",
      id: newComment._id
    });
  } catch (error) {
    next(error);
  }
};

export const likeComment = async(req,res)=>{
   console.log(req.body);
   try {
    const comment = await commentModal.findByIdAndUpdate(req.body.comment_id,{ $push: { like : req.body.user_id } });
    const likecomment = await commentModal.findById(req.body.comment_id);

    console.log("likeComment");
    console.log(likecomment.like);
    res.json({
      message: "ok"
    })
  } catch (error) {
    res.json({
      message: error
    })
  }
}
export const unlikeComment = async(req,res)=>{
  console.log(req.body);
  try {
   const comment = await commentModal.findByIdAndUpdate(req.body.comment_id,{ $pull: { like : req.body.user_id } });
   const unlikecomment = await commentModal.findById(req.body.comment_id);

   console.log("unlikeComment");
   console.log(unlikecomment.like);
   res.json({
     message: "ok"
   })
 } catch (error) {
   res.json({
     message: error
   })
 }
}

export const fetchComment = async (req, res, next) => {
  const id = req.params.id;
  try {
    const data = await commentModal.find({ _id: id });
    if (data) {
      res.json({
        status: "ok",
        commentDetails: data,
      });
    }
  } catch (error) {
    next(error);
  }
};
