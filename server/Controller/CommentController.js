import commentModal from "../Schema/CommentSchema.js";
import postModal from "../Schema/PostSchema.js";
import userModal from "../Schema/UserSchema.js";

export const commentHandler = async (req, res, next) => {
  console.log("comment handle:", req.body);
  try {
    const { post_id, mention } = req.body;
    console.log(mention);

    const newComment = new commentModal(req.body);
    await newComment.save();

    const ref = { ref_id: newComment._id };

    for (var i in mention) {
      const data = await userModal.findByIdAndUpdate(mention[i], {
        $push: { mention: ref },
      });
      console.log(mention[i]);
    }

    const post = await postModal.findByIdAndUpdate(post_id, {
      $push: { comments: newComment._id },
    });

    res.json({
      status: "ok",
      success: true,
      message: "Comment add Successfully!",
      id: newComment._id,
    });
  } catch (error) {
    next(error);
  }
};
export const replyHandler = async (req, res, next) => {
  try {
    const { comment_id, mention } = req.body;
    const newComment = new commentModal(req.body);

    await newComment.save();

    const ref = { ref_id: newComment._id };
    for (var i in mention) {
      const data = await userModal.findByIdAndUpdate(mention[i], {
        $push: { mention: ref },
      });
      console.log(mention[i]);
    }

    const reply = await commentModal.findByIdAndUpdate(comment_id, {
      $push: { reply: newComment._id },
    });
    res.json({
      status: "ok",
      success: true,
      message: "Reply add Successfully!",
      id: newComment._id,
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
        message: "ok",
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
};

export const likeComment = async (req, res) => {
  try {
    const { comment_id, user_id } = req.body;
    const comment = await commentModal.findByIdAndUpdate(comment_id, {
      $push: { like: user_id },
    });
    const likecomment = await commentModal.findById(comment_id);

    console.log("likeComment");
    console.log(likecomment.like);
    res.json({
      message: "ok",
    });
  } catch (error) {
    res.json({
      message: error,
    });
  }
};
export const unlikeComment = async (req, res) => {
  try {
    const { comment_id, user_id } = req.body;
    const comment = await commentModal.findByIdAndUpdate(comment_id, {
      $pull: { like: user_id },
    });
    const unlikecomment = await commentModal.findById(comment_id);

    console.log("unlikeComment");
    console.log(unlikecomment.like);
    res.json({
      message: "ok",
    });
  } catch (error) {
    res.json({
      message: error,
    });
  }
};

export const EditComment = async (req, res) => {
  try {
    console.log(req.body);
    const { comment_id, comment } = req.body;
    const update = await commentModal.findByIdAndUpdate(comment_id, {
      comment: comment,
    });

    res.json({
      status: "ok",
      success: true,
      message: "Comment Edit Successfully!",
    });
  } catch (error) {
    res.json({
      status: "error",
      success: false,
      message: error,
    });
  }
};

export const removeComment = async (req, res) => {
  try {
    const id = req.params.id;

    const data = await commentModal.findByIdAndUpdate(id, {
      visibility: false,
    });

    if (data) {
      res.status(200).json({
        status: "ok",
        success: true,
        message: "Comment remove successfully !",
      });
    } else {
      res.status(200).json({
        status: "error",
        success: false,
        message: "please try again ,Comment not delete !",
      });
    }
  } catch (error) {
    res.status(505).json({
      status: "error",
      success: false,
      message: error,
    });
  }
};

export const restoreComment = async (req, res) => {
  try {
    const id = req.params.id;
    const data = await commentModal.findByIdAndUpdate(id, { visibility: true });
    if (data) {
      res.status(200).json({
        status: "ok",
        success: true,
        message: "Comment Restored successfully !",
      });
    } else {
      res.status(200).json({
        status: "error",
        success: false,
        message: "please try again ,Comment not Restored !",
      });
    }
  } catch (error) {
    res.status(505).json({
      status: "error",
      success: false,
      message: error,
    });
  }
};

export const FetchUsers = async (req, res) => {
  try {
    const { name } = req.body;
    if (name == null) {
      userModal.find({}, function (err, data) {
        res.send(data);
      });
    } else {
      const regex = new RegExp(name, "i");
      userModal.find({ name: regex }, function (err, data) {
        res.send(data);
      });
    }
  } catch (error) {
    res.status(505).json({
      status: "error",
      success: false,
      message: error,
    });
  }
};
