import postmodal from "../Schema/Postschema.js";
import commentModal from "../Schema/CommentSchema.js";
// ....Add discussion and Questions ,answer..........
export const createPost = async (req, res, next) => {
  // console.log("user id",req.body);

  try {
    // const { tag, title, description, user, poll } = req.body;
    const newPost = new postmodal(req.body);
    // const addpost = await new postmodal({
    //   tag, title, description,user,poll
    // });
    console.log(newPost);
    await newPost.save();
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
    const data = await postmodal.find({visibility: true}).populate("comments").populate({
      path: "comments",
      populate: [{
        path: "reply",
        modal: commentModal
      }]
    });
    // console.log("data", data);
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

export const fetchcategory = async (req, res) => {
  const tag = req.params.tag;
  try {
    const data = await postmodal.find({ tag: tag, visibility: true }).populate("comments");
    res.send(data);
  } catch (error) {
    console.log(error);
  }
};

// fetch specific detials from discussion, according to user Email
export const getSpecificdescussion = async (req, res, next) => {
  const email = req.params.email;
  try {
    const data = await postmodal.find({ email: email });
    res.send(data);
  } catch (error) {
    next(error);
  }
};

//fetch fetchPostDetails from MongoDB and server

export const fetchPostDetails = async (req, res) => {
  const id = req.params.id;
  try {
    const data = await postmodal.find({ _id :id,visibility: true}).populate("comments").populate({
      path: "comments",
      populate: [{
        path: "reply",
        modal: commentModal
      }]
    });
    console.log(data);
    if(data){
      res.send(data);
    }else{
      res.json({
        message: "no post exists"
      })
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

    const data = await postmodal.findByIdAndUpdate(id, { visibility: false });
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
        message: "please try again ,post not delete !",
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
export const editepostHandler = async (req, res) => {
  const _id = req.params.id;
  try {
    const data = await postmodal.findByIdAndUpdate(_id, {
      description: req.body.description,
      question: req.body.Question,
      ans1: req.body.ans1,
      ans2: req.body.ans2,
    });
    // console.log("result value", data);
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
    const postLike = await postmodal.findById({ _id: post_id });
    const check = postLike.like.includes(user_id);
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
};

export const likeHandler = async (req, res) => {
  // console.log(req.body);
  try {
    const post = await postmodal.findByIdAndUpdate(req.body.post_id, {
      $push: { like: req.body.user_id },
    });
    const postLike = await postmodal.findById(req.body.post_id);

    // console.log("likehandler");
    // console.log(postLike.like);
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
    const post = await postmodal.findByIdAndUpdate(req.body.post_id, {
      $pull: { like: req.body.user_id },
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
