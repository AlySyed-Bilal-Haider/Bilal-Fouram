import postmodal from "../Schema/Postschema.js";
import commentModal from "../Schema/CommentSchema.js";
import pollmodal from "../Schema/PollSchema.js";
// ....Add discussion and Questions ,answer..........
export const createPost = async (req, res, next) => {
 console.log("req.body:",req.body)
 const {tag,title,description,user,poll}=req.body;
  try {

    const newPost = new postmodal({
      tag,title,description,user,poll
    });
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
    const data = await postmodal.find({visibility: true}).populate("poll").populate("comments").populate({
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

// fetch specific detials from discussion, according to user id
export const getSpecificDiscussion = async (req, res, next) => {
  
  try {
    const id = req.params.id;
    const data = await postmodal.find({user: id,visibility: true}).populate("poll").populate("comments").populate({
      path: "comments",
      populate: [{
        path: "reply",
        modal: commentModal
      }]
    });
    res.json({
      status: true,
      data: data
    })
  } catch (error) {
    res.json({
      status: false,
      message: error
    })
  }
};

//fetch fetchPostDetails from MongoDB and server

export const fetchPostDetails = async (req, res) => {
  const id = req.params.id;
  try {
    const data = await postmodal.find({ _id :id,visibility: true}).populate("poll").populate("comments").populate({
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
    console.log("id",id);

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
export const EditepostHandler = async (req, res) => {
console.log("req.body",req.body);
  try {
    const {id,description} = req.body;
    console.log("id:",id,"description: ",description);
    const data = await postmodal.findByIdAndUpdate(id, {
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
  const post_id = req.params.post_id;
  const user_id = req.params.user_id;
  try {
    const postLike = await postmodal.findById({_id:post_id});
   const check = postLike.like.includes(user_id);
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
