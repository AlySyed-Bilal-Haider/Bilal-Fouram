import express from "express";
import {
  signupHandler,
  login,
  tokenVerifyHandler,
  fetchuser,
} from "../Controller/Usercontroller.js";
import {
  discussion,
  fetchAlldiscussion,
  fetchcategory,
  getSpecificdescussion,
  fetchPostDetails,
  removepost,
  editepostHandler,
  likeHandler,
  unlikeHandler,
  CheckPostLike
} from "../Controller/Postcontroller.js";
import {
  commentHandler,
  likeComment,
  unlikeComment,
  fetchComment
} from "../Controller/CommentController.js";
import {
  approveHandler,
  unapproveHandler,
  handlerApproveORunApprove,
} from "../Controller/Votingcontroller.js";
const router = express.Router();

router.post("/usersignup", signupHandler);
router.post("/login", login);
router.post("/verifytoken", tokenVerifyHandler);
router.post("/posts", discussion);
router.post("/getvotesdetails", handlerApproveORunApprove);
router.post("/approve", approveHandler);
router.post("/unapprove", unapproveHandler);
router.post("/comment", commentHandler);
router.post("/checkpostlike",CheckPostLike);
router.post("/like", likeHandler);
router.post("/unlike", unlikeHandler);
router.post("/likecomment", likeComment);
router.post("/unlikecomment", unlikeComment);



router.get("/alldiscussion", fetchAlldiscussion);
router.get("/category/:tag", fetchcategory);
router.get("/fetchuser/:email", fetchuser);
router.get("/fetchspecificpost/:email", getSpecificdescussion);
router.get("/fetchPostDetails/:id", fetchPostDetails);
router.get("/fetchcomment/:id", fetchComment);
router.delete("/removePost/:id", removepost);
// edite post routes

router.put("/editepost/:id", editepostHandler);

export default router;
