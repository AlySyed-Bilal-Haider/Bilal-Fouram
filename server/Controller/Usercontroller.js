import mongomodal from "../Schema/Signupschema.js";
import jwt from "jsonwebtoken";
import jwt_decode from "jwt-decode";
import { config } from "./config.js";

import mongoose from "mongoose";
// ......Signup here routes start..............

export const signupHandler = async (req, res) => {
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
    let user = mongomodal.findOne(
      { email: req.body.email },
      function (err, docs) {
        if (docs) {
          // console.log(docs._doc.name);
          var decoded = jwt_decode(docs._doc.password);
          // console.log(decoded);
          if (decoded.password == req.body.password) {
            // console.log("Password");

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
                  name: docs._doc.name,
                  email: docs._doc.email,
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
      }
    );
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
          email: docs.email,
          id: docs._id,
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





