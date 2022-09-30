
import commentModal from "../Schema/CommentSchema.js";
import postmodal from "../Schema/Postschema.js";

export const commentHandler = async (req, res, next) => {

  try {
    const { post_id } = req.body;
    const newComment = new commentModal(req.body);

    await newComment.save();

    const post = await postmodal.findByIdAndUpdate(post_id, { $push: { comments: newComment._id } });

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
export const replyHandler = async (req, res, next) => {

  try {
    const { comment_id } = req.body;
    const newComment = new commentModal(req.body);

    await newComment.save();

    const reply = await commentModal.findByIdAndUpdate(comment_id, { $push: { reply: newComment._id } });
    res.json({
      status: "ok",
      success: true,
      message: "Reply add Successfully!",
      id: newComment._id
    });
  } catch (error) {
    next(error);
  }
};

export const CheckCommentLike = async (req, res) => {

  try {
    const comment_id = req.params.comment_id;
    const user_id = req.params.user_id;
    const commentLike = await commentModal.findById({ _id: comment_id });
    const check = commentLike.like.includes(user_id);
    console.log("check:", check);
    if (check) {
      res.json({
        status: true,
        message: 'ok'
      });
    } else {
      res.json({
        status: false,
      });
    }
  } catch (error) {
    res.json({
      message: error,
    });
  }

}

export const likeComment = async (req, res) => {

  try {
    const { comment_id, user_id } = req.body;
    const comment = await commentModal.findByIdAndUpdate(comment_id, { $push: { like: user_id } });
    const likecomment = await commentModal.findById(comment_id);

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
export const unlikeComment = async (req, res) => {

  try {
    const { comment_id, user_id } = req.body;
    const comment = await commentModal.findByIdAndUpdate(comment_id, { $pull: { like: user_id } });
    const unlikecomment = await commentModal.findById(comment_id);

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

export const EditComment = async (req, res) => {
  try {
    
    res.json({
      status: "ok",
      success: true,
      message: "Comment Edit Successfully!",
    });

  } catch (error) {
    res.json({
      status: "error",
      success: false,
      message: error
    })
  }
}

