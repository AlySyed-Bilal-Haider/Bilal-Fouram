import express from "express";
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
  handlercheckuser,
  commentHandler
} from "../Controller/Controller.js";
const router = express.Router();
router.get("/", (req, res) => {
  console.log("Server succfully");
});
router.post("/usersignup", post);
router.post("/login", login);
router.post("/verifytoken", tokenVerifyHandler);
router.post("/posts", discussion);
router.post("/getvotesdetails",handlercheckuser)
router.post("/approve",approveHandler);
router.post("/unapprove",unapproveHandler);
router.post("/comment",commentHandler)

router.get("/alldiscussion", fetchAlldiscussion);
router.get("/category/:tag", fetchcategory);
router.get("/fetchuser/:email", fetchuser);
router.get("/fetchspecificpost/:email", getSpecificdescussion);
router.get("/fetchPostDetails/:id", fetchPostDetails);

router.delete("/removePost/:id", removepost);
// edite post routes

router.put("/editepost/:id",editepostHandler)

export default router;
