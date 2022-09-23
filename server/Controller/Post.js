import mongomodal from "../Schema/Signupschema.js";
import postmodal from "../Schema/Postschema.js";
import jsonwebtoken from "jsonwebtoken";

// ......Signup here routes start..............
export const post = async (req, res) => {
  try {
    const usersignup = await new mongomodal({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    });
    await usersignup.save();
    res.json({
      status: "ok",
      success: true,
      message: "User register Successfully!",
    });
  } catch (error) {
    res.status(404).json({
      status: "error",
      message: "Please try again!",
      user: false,
    });
  }
};

// ........Login routes start...jsonwebtoken.....

export const login = async (req, res) => {
  let token;
  try {
    const data = await mongomodal.findOne({
      email: req.body.email,
      password: req.body.password,
    });
    if (data) {
      token = jsonwebtoken.sign(
        { email: data.email, name: data.name },
        "secret123"
      );
    }
    if (token) {
      res.json({
        status: "ok",
        message: "User login Successfully!",
        user: token,
        name: data.name,
      });
    } else {
      res.json({
        status: "error",
        message: "Please try gain!",
        user: false,
      });
    }
  } catch (error) {
    res.status(404).json({
      status: "error",
      message: "Please try again, server error!",
      user: false,
    });
  }
};

// .........verify token here start here...........

export const tokenVerifyHandler = async (req, res) => {
  const token = req.headers["x-access-token"];
  try {
    const decoded = jsonwebtoken.verify(token, "secret123");
    const email = decoded.email;
    const data = await mongomodal.findOne({
      email: email,
    });
    if (data) {
      res.json({
        status: "ok",
        name: data.name,
      });
    } else {
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

//fetch fetchPostDetails from MongoDB

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
      res.status(404).json({
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

export const uploadProfile = async (req, res) => {
  console.log("req", req.file.path);
  const id = req.params.id.trim();
  console.log("id",id);
  res.send(id);
  // try {
  //   console.log(_id);
  //   const data = await mongomodal.findAndModify(
  //     { _id: id },
  //     {
  //       img: req.file.path,
  //     }
  //   );

  //   if (data) {
  //     res.json({
  //       status: "successfully",
  //       success: true,
  //       message: "your profile pic change successfully !",
  //     });
  //   } else {
  //     res.json({
  //       status: "error",
  //       success: false,
  //       message: "please try again !",
  //     });
  //   }
  // } catch (error) {
  //   console.log("error", error);
  //   res.json({
  //     status: "error",
  //     success: false,
  //     message: "your profile pic change successfully !",
  //   });
  // }
};
