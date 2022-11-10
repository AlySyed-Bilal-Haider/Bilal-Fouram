import userModal from "../Schema/UserSchema.js";
import sgMail from "@sendgrid/mail";
import jwt from "jsonwebtoken";
import jwt_decode from "jwt-decode";
import { config } from "./config.js";
const API_KEY =
  "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";
sgMail.setApiKey(API_KEY);

export async function VerifyUser(req, res, next) {
  try {
    const id = req.params.id;
    const user = await userModal.findById({ _id: id });
    if (user) {
      next();
    } else {
      res.status(403).send("User not valid.");
    }
  } catch (error) {
    res.json({
      error: error,
    });
  }
}

export const ChangePassword = async (req, res) => {
  try {
    const id = req.params.id;
    const user = await userModal.findById({ _id: id });
    let userToken = { id: user._id };
    const token = jwt.sign(userToken, config.secret, { expiresIn: "15m" });
    const link = `/resetpassword/${user._id}/${token}`;
    const msg = {
      to: user.email, // Change to your recipient
      from: {
        name: "Miner DAO Forum",
        email: "hamza@minermoney.com",
      }, // Change to your verified sender
      subject: `Miner DAO Forum Change Password`,
      text: `Sending mail by send grid`,
      html: `<h2>Password Reset Link will be valid for 15 minutes </h2>               
                <div class="description">
                This is your password Reset Link 

                </div>
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
    res.json({
      status: "ok",
      message: "please check your email !",
    });
  } catch (error) {
    res.json({
      error: error,
      status: false,
    });
  }
};

export const ForgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await userModal.findOne({ email: email });
    console.log(user?.email);
    if (user !== null) {
      let userToken = { id: user._id };
      const token = jwt.sign(userToken, config.secret, { expiresIn: "15m" });
      const link = `/resetpassword/${user._id}/${token}`;
      console.log(link);
      const msg = {
        to: user.email, // Change to your recipient
        from: {
          name: "Miner DAO Forum",
          email: "hamza@minermoney.com",
        }, // Change to your verified sender
        subject: `Miner DAO Forum Change Password`,
        text: `Sending mail by send grid`,
        html: `<h2>Password Reset Link will be valid for 15 minutes </h2>               
                    <div class="description">
                    This is your password Reset Link 
    
                    </div>
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

      res.json({
        user: true,
        message: "email sent",
      });
    } else {
      res.json({
        status: "error",
        message: "SignUp First..!",
        user: false,
      });
    }
  } catch (error) {
    res.json({
      error: error,
      status: false,
    });
  }
};

export const ResetPassword = async (req, res) => {
  try {
    const { id, token } = req.params;
    const user = await userModal.findById({ _id: id });
    var decoded = jwt_decode(token);
    if (user._id.toString() !== decoded.id) {
      res.send("Invalid User...!");
    } else {
      res.json({
        status: true,
        message: "User Verified",
      });
    }
  } catch (error) {
    res.json({
      error: error,
      status: false,
    });
  }
};
export const PostResetPassword = async (req, res) => {
  try {
    const { id, token } = req.params;
    const { password } = req.body;
    const user = await userModal.findById({ _id: id });
    var decoded = jwt_decode(token);
    if (user._id.toString() !== decoded.id) {
      res.json({
        status: false,
        message: "Invalid User... !",
      });
    } else {
      let userToken = { password: password };
      let token = jwt.sign(userToken, config.secret);
      await userModal.findByIdAndUpdate(user._id, { password: token });
      res.json({
        status: true,
        message: "Password Successfully Reset... !",
      });
    }
  } catch (error) {
    res.json({
      error: error,
      status: false,
    });
  }
};
