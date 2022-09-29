import express from "express";
import * as Users from '../Controller/Usercontroller.js';
import * as Post from '../Controller/Postcontroller.js';
import * as comments from '../Controller/CommentController.js';
import * as Voting from '../Controller/Approvecontroller.js';
import * as Poll from "../Controller/PollController.js";

const router = express.Router();

router.post("/usersignup", Users.signupHandler);
router.post("/login", Users.login);
router.post("/verifytoken", Users.tokenVerifyHandler);
router.post("/posts", Post.createPost);
router.post("/like", Post.likeHandler);
router.post("/unlike", Post.unlikeHandler);
router.post("/getvotesdetails", Voting.handlerApproveORunApprove);
router.post("/approve", Voting.approveHandler);
router.post("/unapprove", Voting.unapproveHandler);
router.post("/comment", comments.commentHandler);
router.post("/reply", comments.replyHandler);
router.post("/checkcommentlike", comments.CheckCommentLike);
router.post("/likecomment", comments.likeComment);
router.post("/unlikecomment", comments.unlikeComment);
router.post("/createpoll", Poll.CreatePoll);
router.post('/votepoll', Poll.VotePoll);



router.get("/alldiscussion", Post.fetchAlldiscussion);
router.get("/allpoll", Poll.FetchAllPoll);

router.get("/category/:tag", Post.fetchcategory);
router.get('/checklike/:post_id/:user_id', Post.CheckPostLike);
router.get("/fetchspecificpost/:email", Post.getSpecificdescussion);
router.get("/fetchPostDetails/:id", Post.fetchPostDetails);
router.get("/fetchuser/:email", Users.fetchuser);
router.get("/fetchcomment/:id", comments.fetchComment);



router.delete("/removePost/:id", Post.removepost);
router.delete("/removePoll/:id", Poll.DeletePoll);


// edite post routes

router.put("/editepost/:id", Post.editepostHandler);

export default router;
