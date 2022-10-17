import userModal from "../Schema/UserSchema.js";
import jwt from "jsonwebtoken";
import jwt_decode from "jwt-decode";
import { config } from "./config.js";
import postModal from "../Schema/PostSchema.js";
import commentModal from "../Schema/CommentSchema.js";
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
    if (user) {
      res.status(200).json({
        status: "warning",
        message: "Username Already Exist!",
        user: false,
      });
    } else if (user1) {
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
      } else {
        const usersignup = await new userModal({
          name: name,
          email: email,
          password: token,
        });
        await usersignup.save();
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

// ........Login routes start...jsonwebtoken.....

export const login = async (req, res) => {
  console.log(req.body);
  try {
    const user = await userModal.findOne({ email: req.body.email });
    console.log("user", user);
    if (user) {
      var decoded = jwt_decode(user.password);
      if (decoded.password === req.body.password) {
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
          });
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
    }
  } catch (e) {
    console.log(e);
  }
};

// try {

// await userModal.findOne({ email: req.body.email }, function (err, docs) {
//   if (docs) {
//     var decoded = jwt_decode(docs._doc.password);
//     if (decoded.password === req.body.password) {
//       let userToken = { id: docs._doc._id };
//       jwt.sign(
//         userToken,
//         config.secret,
//         {
//           expiresIn: "6d",
//         },
//         (err, token) => {
//           res.json({
//             status: "ok",
//             message: "User login Successfully!",
//             user: token,
//             name: docs._doc.name,
//             email: docs._doc.email,
//             role: docs._doc.role,
//           });
//         }
//       );
//     } else {
//       res.setHeader("Content-Type", "application/json");
//       res.json({
//         status: "error",
//         message: "Please try again! Password  not match",
//         user: false,
//       });
//     }
//   } else {
//     res.setHeader("Content-Type", "application/json");
//     res.status(404).json({
//       status: "error",
//       message: "SignUp First..!",
//       user: false,
//     });
//   }
// });

//  catch (error) {
//   console.log(error);
//   res.setHeader("Content-Type", "application/json");
//   res.status(404).json({
//     status: "error",
//     message: "Please wait server error!",
//     user: false,
//   });
// }
// };

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

//fetch specific data from server

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
    const key = req.params.key;
    console.log(key, "key");
    console.log("key", key);
    const result = await userModal.find({
      $or: [
        {
          name: { $regex: key },
        },
      ],
    }).select("-password");
    res.send(result);
  } catch (error) {
    console.log("search error", error);
    res.status(404).json({
      status: "error",
      message: "Please try again!",
    });
  }
};

export const searchHandleAll = async (req, res, next) => {
  try {
    const key = req.params.key;
    console.log("key", key);
    const user = await userModal.find({
      $or: [
        {
          name: { $regex: key },
        },
      ],
    }).select("-password");
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
      comments: comment
    })
  } catch (error) {
    console.log("search error", error);
    res.status(404).json({
      status: "error",
      message: "Please try again!",
    });
  }
};
