import postmodal from "../Schema/Postschema.js";
// ....Add discussion and Questions ,answer..........
export const discussion = async (req, res, next) => {
  console.log(req.body);
  try {
    const addpost = await new postmodal({
      tag: req.body.tag,
      title: req.body.title,
      description: req.body.despone,
      status: req.body.status,
      question: req.body.question,
      ans1: req.body.ans1,
      ans2: req.body.ans2,
      enddate: req.body.enddate,
      username: req.body.name,
      email: req.body.email,
    });
    addpost.save();
    if (addpost) {
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
    const data = await postmodal.find().populate("comments");
    console.log("data", data);
    res.json({
      status: "ok",
      success: true,
      message: "post add Successfully!",
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
    const data = await postmodal.find({ tag: tag }).populate("comments");
    res.send(data);
  } catch (error) {
    console.log(error);
  }
};



// fetch specific detials from discussion, according to user Email
export const getSpecificdescussion = async (req, res,next) => {
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
    const data = await postmodal.findById({ _id: id });
    res.send(data);
  } catch (error) {
    res.status(404).json({
      status: "error",
      success: false,
      message: error,
    });
  }
};

export const removepost = async (req, res) => {
  const id = req.params.id.trim();
  try {
    const data = await postmodal.findByIdAndDelete({ _id: id });
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
    console.log("result value", data);
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






