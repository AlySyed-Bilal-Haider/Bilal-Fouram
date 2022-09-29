
import voiting from "../Schema/Voting.js";
// ........Approve and UpApprove approveHandler.apply............
export const approveHandler = async (req, res) => {
  // console.log(req.body,"Body data");
  let approve;
  try {
    const getpost = await voiting.findOne({ postId: req.body.id });
    if (getpost) {
      const approvevalue = getpost.approve + 1;
      approve = await new voiting({
        useremail: req.body.email,
        postId: req.body.id,
        approve: approvevalue,
        checkstatus: true,
      });
    } else {
      approve = await new voiting({
        useremail: req.body.email,
        postId: req.body.id,
        approve: 1,
        checkstatus: true,
      });
    }

    await approve.save();
    res.json({
      status: "ok",
      success: true,
      message: "Approve successfully !",
    });
  } catch (error) {
    res.status(505).json({
      status: "error",
      success: false,
      message: "Not approve,please try again  !",
    });
  }
};

export const unapproveHandler = async (req, res) => {
  console.log(req.body, "Body data");
  let unapprove;
  try {
    const getpost = await voiting.findOne({ postId: req.body.id });
    console.log("getpost", getpost);
    if (getpost) {
      console.log("first unApprove !");
      const unapprovevalue = getpost.unapprove + 1;
      unapprove = await new voiting({
        useremail: req.body.email,
        postId: req.body.id,
        unapprove: unapprovevalue,
        checkstatus: true,
      });
    } else {
      console.log("Unapprove second");
      unapprove = await new voiting({
        useremail: req.body.email,
        postId: req.body.id,
        unapprove: 1,
        checkstatus: true,
      });
    }

    await unapprove.save();
    res.json({
      status: "ok",
      success: true,
      message: "unprove successfully !",
    });
  } catch (error) {
    res.status(505).json({
      status: "error",
      success: false,
      message: "unprove not successfully  !",
    });
  }
};

// check user is exist or not for this post

export const handlerApproveORunApprove = async (req, res, next) => {
  console.log(req.body);
  try {
    const data = await voiting.findOne({
      postId: req.body.id,
      email: req.body.email,
    });
    console.log("Handler approve or not aaprove", data);
    if (data) {
      res.json({
        status: "ok",
        success: true,
        message: "check approve and unapprove status!",
        votedetails: data,
      });
    }
  } catch (error) {
    next(error);
    console.log("check user exist or not,server issues !");
  }
};


