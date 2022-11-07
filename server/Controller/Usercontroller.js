import userModal from "../Schema/UserSchema.js";
import jwt from "jsonwebtoken";
import jwt_decode from "jwt-decode";

import { config } from "./config.js";
import postModal from "../Schema/PostSchema.js";
import sgMail from "@sendgrid/mail";
import commentModal from "../Schema/CommentSchema.js";

const API_KEY =
  "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";
sgMail.setApiKey(API_KEY);

// ......Signup here routes start..............

export const signupHandler = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    let user = await userModal.findOne({
      name: name,
    });
    let user1 = await userModal.findOne({
      email: email,
    });
    console.log("user:", user);
    if (user !== null) {
      res.status(200).json({
        status: "warning",
        message: "Username Already Exist!",
        user: false,
      });
    } else if (user1 !== null) {
      res.status(200).json({
        status: "warning",
        message: "Email Already Exist!",
        user: false,
      });
    } else {
      let userToken = { password: password };
      let token = jwt.sign(userToken, config.secret);

      if (email === "nabiha3802izhar@gmail.com") {
        const usersignup = await new userModal({
          name: name,
          email: email,
          password: token,
          role: "admin",
        });
        await usersignup.save();
        const link = `http://localhost:3000/verifyemail/${usersignup._id}`;
        const msg = {
          to: email, // Change to your recipient
          from: {
            name: "Miner DAO Forum",
            email: "skillway17@gmail.com",
          }, // Change to your verified sender
          subject: `Miner DAO Forum Verify Email`,
          text: `Sending mail by send grid`,
          html: `<h2>Email verification link </h2>               
                  
                  <p>${link} </p>`,
        };
        sgMail
          .send(msg)
          .then(() => {
            console.log("Email sent");
          })
          .catch((error) => {
            console.error(error.message);
          });
      } else {
        const usersignup = await new userModal({
          name: name,
          email: email,
          password: token,
        });
        await usersignup.save();
        const link = `http://localhost:3000/verifyemail/${usersignup._id}`;
        const msg = {
          to: email, // Change to your recipient
          from: {
            name: "Miner DAO Forum",
            email: "skillway17@gmail.com",
          }, // Change to your verified sender
          subject: `Miner DAO Forum Verify Email`,
          text: `Sending mail by send grid`,
          html: `<h2>Email verification link </h2>               
                  
                  <p>${link} </p>`,
        };
        sgMail
          .send(msg)
          .then(() => {
            console.log("Email sent");
          })
          .catch((error) => {
            console.error(error.message);
          });
        console.log("User savedi");
      }

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

// ........Login routes start...jsonwebtoken.....(

export const verifyemail = async (req, res) => {
  try {
    const id = req.params.id;
    console.log("verify email", id);
    await userModal.findByIdAndUpdate(id, { verified: true });
    const user = userModal.findById(id);
    console.log(user);
    res.json({
      status: "ok",
      message: "User Verified!",
      name: user.name,
      email: user.email,
      role: user.role,
    });
  } catch (error) {
    res.status(404).json({
      status: "error",
      message: "Please try again!",
      user: false,
    });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userModal.findOne({ email: email });
    if (user) {
      var decoded = jwt_decode(user.password);
      if (decoded.password === password) {
        let userToken = { id: user._id };
        let sign = await jwt.sign(userToken, config.secret, {
          expiresIn: "6d",
        });
        if (sign) {
          res.json({
            status: "ok",
            message: "User login Successfully!",
            user: sign,
            name: user.name,
            email: user.email,
            role: user.role,
            varify: user.verified,
          });
        } else {
          // res.setHeader("Content-Type", "application/json");
          // res.json({
          //   status: "error",
          //   message: "Please try again! Password  not match",
          //   user: false,
          // });
        }
      } else {
        res.setHeader("Content-Type", "application/json");
        res.json({
          status: "error",
          message: "Please try again! Password  not match",
          user: false,
        });
      }
    } else {
      res.setHeader("Content-Type", "application/json");
      res.status(404).json({
        status: "error",
        message: "SignUp First..!",
        user: false,
      });
    }
  } catch (e) {
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
    var decoded = jwt_decode(token);
    if (decoded.id) {
      userModal.findOne({ _id: decoded.id }, function (err, docs) {
        res.json({
          status: "ok",
          name: docs.name,
          email: docs.email,
          id: docs._id,
          role: docs.role,
        });
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

export const fetchuser = async (req, res) => {
  try {
    const id = req.params.id;
    const data = await userModal.findOne({ _id: id }).select("-password");
    console.log("data user", data);
    return res.send(data);
  } catch (error) {
    console.log(error);
  }
};

export const searchHandle = async (req, res, next) => {
  try {
    const name = req.params.key;
    if (name == null) {
      userModal
        .find({}, function (err, data) {
          res.send(data);
        })
        .select("-password");
    } else {
      const regex = new RegExp(name, "i");
      userModal
        .find({ name: regex }, function (err, data) {
          res.send(data);
        })
        .select("-password");
    }
  } catch (error) {
    res.status(505).json({
      status: "error",
      success: false,
      message: error,
    });
  }
};

export const searchHandleAll = async (req, res, next) => {
  try {
    const key = req.params.key;
    const user = await userModal
      .find({
        $or: [
          {
            name: { $regex: key },
          },
        ],
      })
      .select("-password");
    const discussion = await postModal.find({
      $or: [
        {
          description: { $regex: key },
        },
      ],
    });
    const comment = await commentModal.find({
      $or: [
        {
          comment: { $regex: key },
        },
      ],
    });
    res.json({
      status: "success",
      users: user,
      discussions: discussion,
      comments: comment,
    });
  } catch (error) {
    res.status(404).json({
      status: "error",
      message: "Please try again!",
    });
  }
};
