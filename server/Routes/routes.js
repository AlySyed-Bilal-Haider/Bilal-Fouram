import express from "express";
import multer from "multer";

import {
  post,
  login,
  tokenVerifyHandler,
  discussion,
  fetchAlldiscussion,
  fetchcategory,
  fetchuser,
  getSpecificdescussion,
  fetchPostDetails,
  removepost,
  editepostHandler,
  approveHandler,
  unapproveHandler,
  handlecheckuser
} from "../Controller/Post.js";
const router = express.Router();
router.get("/", (req, res) => {
  console.log("Server succfully");
});
router.post("/usersignup", post);
router.post("/login", login);
router.post("/verifytoken", tokenVerifyHandler);
router.post("/posts", discussion);
router.post("/getvotesdetails",handlecheckuser)

router.get("/alldiscussion", fetchAlldiscussion);
router.get("/category/:tag", fetchcategory);
router.get("/fetchuser/:email", fetchuser);
router.get("/fetchspecificpost/:email", getSpecificdescussion);
router.get("/fetchPostDetails/:id", fetchPostDetails);
router.delete("/removePost/:id", removepost);
// edite post routes

router.put("/editepost/:id",editepostHandler)
router.post("/approve",approveHandler);
router.post("/unapprove",unapproveHandler);
export default router;
