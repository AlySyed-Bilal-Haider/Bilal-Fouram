import mongomodal from "../Schema/Signupschema.js";
import postmodal from "../Schema/Postschema.js";
import jwt from "jsonwebtoken";
import jwt_decode from "jwt-decode";
import { config } from "./config.js";

import voiting from "../Schema/Voting.js";
import commentModal from "../Schema/comment.js";
// ......Signup here routes start..............

export const post = async (req, res) => {
  try {
    let user1 = await mongomodal.findOne({
      email: req.body.email,
    });
    if (user1) {
      res.status(200).json({
        status: "warning",
        message: "Email Already Exist!",
        user: false,
      });
    } else {
      let userToken = { password: req.body.password };
      let token = jwt.sign(userToken, config.secret);
      const usersignup = await new mongomodal({
        name: req.body.name,
        email: req.body.email,
        password: token,
      });
      await usersignup.save();
      res.json({
        status: "ok",
        success: true,
        message: "User register Successfully!",
      });
    }

  } catch (error) {
    console.log(error);
    res.status(404).json({
      status: "error",
      message: "Please try again!",
      user: false,
    });
  }
};

// ........Login routes start...jsonwebtoken.....

export const login = async (req, res) => {

  try {
    console.log(req.body);
    let user = mongomodal.findOne({ email: req.body.email, }, function (err, docs) {
      if (docs) {
        console.log(docs._doc.name);
        var decoded = jwt_decode(docs._doc.password);
        console.log(decoded);
        if (decoded.password == req.body.password) {
          console.log("Password");

          let userToken = { id: docs._doc._id };
          jwt.sign(
            userToken,
            config.secret,
            {
              expiresIn: "6d",
            },
            (err, token) => {
              res.json({
                status: "ok",
                message: "User login Successfully!",
                user: token,
                name: docs._doc.password,
              });
            }
          );
        } else {
          res.json({
            status: "error",
            message: "Please try gain! Password  not match",
            user: false,
          });
        }
      } else {
        res.status(404).json({
          status: "error",
          message: "SignUp First..!",
          user: false,
        });
      }
    });
  } catch (error) {
    console.log(error);
    res.status(404).json({
      status: "error",
      message: "Please wait server error!",
      user: false,
    });
  }
};

// .........verify token here start here...........

export const tokenVerifyHandler = async (req, res) => {

  const token = req.headers["x-access-token"];
  try {

    var decoded = jwt_decode(token);
    if (decoded.id) {
      mongomodal.findOne({ _id: decoded.id }, function (err, docs) {
        // console.log(docs);
        res.json({
          status: "ok",
          name: docs.name,
        });
      });
    }else{
      res.json({
        status: "error",
        message: " invaild token",
      });
    }
  } catch (error) {
    res.status(404).json({
      status: "error",
      message: "Please try again!",
      user: false,
    });
  }
};

// ....Add discussion and Questions ,answer..........
export const discussion = async (req, res) => {
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
    await addpost.save();
    if (addpost) {
      res.json({
        status: "ok",
        success: true,
        message: "post add Successfully!",
      });
    } else {
      res.json({
        status: "error",
        success: false,
        message: "Please add agian and carefully!",
      });
    }
  } catch (error) {
    res.status(404).json({
      status: "error",
      message: "Please try again!",
      user: false,
    });
  }
};

// fetch all discusions from server , then send on front end
export const fetchAlldiscussion = async (req, res) => {
  try {
    const data = await postmodal.find({});
    if (data) {
      res.json({
        status: "ok",
        success: true,
        message: "post add Successfully!",
        allDiscussion: data,
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

// fetch specifc data from server

export const fetchcategory = async (req, res) => {
  const tag = req.params.tag;
  try {
    const data = await postmodal.find({ tag: tag });
    res.send(data);
  } catch (error) {
    console.log(error);
  }
};

//fetch specific data from server of user

export const fetchuser = async (req, res) => {
  const email = req.params.email;
  try {
    const data = await mongomodal.findOne({ email: email });
    res.send(data);
  } catch (error) {
    console.log(error);
  }
};

// fetch specific detials from discussion, according to user Email
export const getSpecificdescussion = async (req, res) => {
  const email = req.params.email;
  try {
    const data = await postmodal.find({ email: email });
    res.send(data);
  } catch (error) {
    res.status(404).json({
      status: "error",
      success: false,
      message: error,
    });
  }
};

//fetch fetchPostDetails from MongoDB and server

export const fetchPostDetails = async (req, res) => {
  const id = req.params.id;
  try {
    const data = await postmodal.findOne({ _id: id });
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
  // console.log(req.body,"Body data");
  let unapprove;
  try {
    const getpost = await voiting.findOne({ postId: req.body.id });
    if (getpost) {
      const unapprovevalue = getpost.unapprove + 1;
      unapprove = await new voiting({
        useremail: req.body.email,
        postId: req.body.id,
        unapprove: unapprovevalue,
        checkstatus: true,
      });
    } else {
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

export const handlerApproveORunApprove = async (req, res) => {
  console.log(req.body);
  try {
    const data = await voiting.findOne({
      postId: req.body.id,
      email: req.body.email,
    });

    if (data) {
      res.json({
        status: "ok",
        success: true,
        message: "check approve and unapprove status!",
        votedetails: data,
      });
    } else {
      res.json({
        status: "error",
        success: false,
        message: " approve and unapprove not exist  !",
      });
    }
  } catch (error) {
    console.log("check user exist or not,server issues !");
  }
};

export const commentHandler = async (req, res, next) => {
  const comment = req.body.comment;
  const postId = req.body.postId;
  let commentRecord;

  try {
    if (postId && comment) {
      commentRecord = await new commentModal({
        comment,
        postId
      });
    }
    await commentRecord.save();
    res.json({
      status: "ok",
      success: true,
      message: "Comment add Successfully!",
    });
  } catch (error) {
    next(error);
  }
};


export const fetchComment=async(req,res,next)=>{
  const id=req.params.id;
  try {
    const data = await commentModal.find({_id:id});
    if (data) {
      res.json({
        status: "ok",
        commentDetails: data,
      });
    }
  } catch (error) {
   next(error)
  }
}