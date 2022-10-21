import postModal from "../Schema/PostSchema.js";
import commentModal from "../Schema/CommentSchema.js";
import pollModal from "../Schema/PollSchema.js";
import userModal from "../Schema/UserSchema.js";

// ....Add discussion and Questions ,answer..........

export const createPost = async (req, res, next) => {
  try {
    const { tag, title, description, user, poll } = req.body;
    const newPost = new postModal({
      tag,
      title,
      description,
      user,
      poll,
    });
    
    await newPost.save();
    const ref = { ref_id: newPost._id };
    await userModal.findByIdAndUpdate(user, {
      $push: { discussion: ref },
    });
    if (newPost) {
      res.json({
        status: "ok",
        success: true,
        message: "post add Successfully!",
      });
    }
  } catch (error) {
    next(error);
  }
};

// fetch all discusions from server , then send on front end
export const fetchAlldiscussion = async (req, res) => {
  try {
    const data = await postModal
      .find({ visibility: true, status: "Approved" })
      .populate("user")
      .populate("poll")
      .populate("comments")
      .populate({
        path: "comments",
        match: { visibility: true },
        populate: [
          {
            path: "user",
            select: "_id name email img",
            modal: userModal,
          },
          {
            path: "reply",
            modal: commentModal,
            match: { visibility: true },
            populate: [
              {
                path: "user",
                select: "_id name email img",
                modal: userModal,
              },
              {
                path: "reply",
                modal: commentModal,
                match: { visibility: true },
              },
            ],
          },
        ],
      });

    res.json({
      status: "ok",
      success: true,
      message: "all posts",
      allDiscussion: data,
    });
  } catch (error) {
    res.status(404).json({
      status: "error",
      success: false,
      message: error,
    });
  }
};

// fetch specifc data from server

export const fetchcategory = async (req, res, next) => {
  try {
    const tag = req.params.tag;
    const data = await postModal
      .find({ tag: tag, visibility: true, status: "Approved" })
      .populate("user")
      .populate("comments");
    res.json({
      message: "ok",
      data: data,
    });
  } catch (error) {
    next(error);
  }
};

// fetch specific details from discussion, according to user id
export const getSpecificDiscussion = async (req, res, next) => {
  try {
    const id = req.params.id;
    const data = await postModal
      .find({ user: id, visibility: true })
      .populate("user")
      .populate("poll")
      .populate("comments")
      .populate({
        path: "comments",
        match: { visibility: true },
        populate: [
          {
            path: "user",
            select: "_id name email img",
            modal: userModal,
          },
          {
            path: "reply",
            modal: commentModal,
            match: { visibility: true },
            populate: [
              {
                path: "user",
                select: "_id name email img",
                modal: userModal,
              },
              {
                path: "reply",
                modal: commentModal,
                match: { visibility: true },
              },
            ],
          },
        ],
      });
    res.json({
      status: true,
      data: data,
    });
  } catch (error) {
    next(error);
  }
};

//fetch fetchPostDetails from MongoDB and server

export const fetchPostDetails = async (req, res) => {
  const id = req.params.id;
  try {
    const data = await postModal
      .find({ _id: id, visibility: true })
      .populate("user")
      .populate({
        path: "user",
        select: "_id name email img",
      })
      .populate("poll")
      .populate("comments")
      .populate({
        path: "comments",
        match: { visibility: true },
        populate: [
          {
            path: "user",
            select: "_id name email img",
            modal: userModal,
          },
          {
            path: "reply",
            modal: commentModal,
            match: { visibility: true },
            populate: [
              {
                path: "user",
                select: "_id name email img",
                modal: userModal,
              },
              {
                path: "reply",
                modal: commentModal,
                match: { visibility: true },
              },
            ],
          },
        ],
      });

    if (data) {
      res.send(data);
    } else {
      res.json({
        message: "no post exists",
      });
    }
  } catch (error) {
    res.status(404).json({
      status: "error",
      success: false,
      message: error,
    });
  }
};

export const removepost = async (req, res) => {
  try {
    const id = req.params.id.trim();
    const data = await postModal.findByIdAndUpdate(id, { visibility: false });
    await pollModal.findByIdAndUpdate(data.poll, { visibility: false });

    if (data) {
      res.status(200).json({
        status: "ok",
        success: true,
        message: "Post remove successfully !",
      });
    } else {
      res.status(200).json({
        status: "error",
        success: false,
        message: "please try again ,post not deleted !",
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

// start update post code start here
export const EditpostHandler = async (req, res) => {
  try {
    const { id, description } = req.body;
    const data = await postModal.findByIdAndUpdate(id, {
      description: description,
    });
    if (data) {
      res.status(202).json({
        status: "ok",
        success: true,
        message: "Update successfully",
      });
    } else {
      res.json({
        status: "error",
        success: false,
        message: "Not successfully update",
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

export const CheckPostLike = async (req, res) => {
  try {
    const post_id = req.params.post_id;
    const user_id = req.params.user_id;
    const postLike = await postModal.findById({ _id: post_id });
    const check = postLike.like.includes(user_id);
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

export const likeHandler = async (req, res) => {
  try {
    const { user_id, post_id } = req.body;
    const post = await postModal.findByIdAndUpdate(post_id, {
      $push: { like: user_id },
    });
    const ref = { ref_id: post._id };
    await userModal.findByIdAndUpdate(user_id, {
      $push: { like: ref },
    });
    await postModal.findById(post_id);

    res.json({
      message: "ok",
    });
  } catch (error) {
    res.json({
      message: error,
    });
  }
};

export const unlikeHandler = async (req, res) => {
  try {
    const { user_id, post_id } = req.body;
    const post = await postModal.findByIdAndUpdate(post_id, {
      $pull: { like: user_id },
    });
    const ref = { ref_id: post._id };
    await userModal.findByIdAndUpdate(user_id, {
      $pull: { like: ref },
    });
    res.json({
      message: "ok",
    });
  } catch (error) {
    res.json({
      message: "error",
      error: error,
    });
  }
};
