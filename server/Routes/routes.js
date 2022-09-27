import express from "express";
import {
  signupHandler,
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
  handlerApproveORunApprove,
  commentHandler,
  fetchComment
} from "../Controller/Controller.js";
const router = express.Router();

router.post("/usersignup", signupHandler);
router.post("/login", login);
router.post("/verifytoken", tokenVerifyHandler);
router.post("/posts", discussion);
router.post("/getvotesdetails", handlerApproveORunApprove);
router.post("/approve", approveHandler);
router.post("/unapprove", unapproveHandler);
router.post("/comment", commentHandler);

router.get("/alldiscussion", fetchAlldiscussion);
router.get("/category/:tag", fetchcategory);
router.get("/fetchuser/:email", fetchuser);
router.get("/fetchspecificpost/:email", getSpecificdescussion);
router.get("/fetchPostDetails/:id", fetchPostDetails);
router.get("/fetchcomment/:id",fetchComment);
router.delete("/removePost/:id", removepost);
// edite post routes

router.put("/editepost/:id", editepostHandler);

export default router;
