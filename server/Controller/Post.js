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
  try {
    const data = await mongomodal.findOne({
      email: req.body.email,
      password: req.body.password,
    });
    if (data) {
      const token = jsonwebtoken.sign(
        { email: data.email, name: data.name },
        "secret123"
      );
      res.json({
        status: "ok",
        message: "User login Successfully!",
        user: token,
      });
    } else {
      res.json({
        status: "erorr",
        message: "User signin Successfully!",
        user: false,
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

// .........verify token here start here...........

export const tokenVerifyHandler = async (req, res) => {
  const token = req.headers["x-access-token"];
  try {
    const decoded = jsonwebtoken.verify(token, "secret123");
    const email = decoded.email;
    const data = await jsonwebtoken.findOne({
      email: email,
    });
    if (data) {
      res.json({
        status: "ok",
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
      description: req.body.description,
      status: req.body.status,
      question: req.body.question,
      ans1: req.body.ans1,
      ans2: req.body.ans2,
      enddate: req.body.enddate,
    });
    await addpost.save();
    res.json({
      status: "ok",
      success: true,
      message: "post add Successfully!",
    });
  } catch (error) {
    res.status(404).json({
      status: "error",
      message: "Please try again!",
      user: false,
    });
  }
};
