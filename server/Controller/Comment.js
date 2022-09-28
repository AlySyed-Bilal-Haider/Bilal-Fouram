
import commentModal from "../Schema/comment.js";
import mongoose from "mongoose";

export const commentHandler = async (req, res, next) => {
  const comment = req.body.comment;
  const postId = req.body.postId;

  console.log(req.body);
  try {
    let commentRecord = await new commentModal({
      _id: new mongoose.Types.ObjectId(),
      comment,
      userid: req.body.userid,
    });

    commentRecord.save();
    await postmodal.findByIdAndUpdate(
      {
        _id: postId,
      },
      {
        $push: {
          comments: commentRecord._id,
        },
      }
    );

    res.json({
      status: "ok",
      success: true,
      message: "Comment add Successfully!",
    });
  } catch (error) {
    next(error);
  }
};

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
