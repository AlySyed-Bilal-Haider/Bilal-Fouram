import mongomodal from "../Schema/Signupschema.js";
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
