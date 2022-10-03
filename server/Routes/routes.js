import express from "express";
import * as Users from '../Controller/Usercontroller.js';
import * as Post from '../Controller/Postcontroller.js';
import * as Comment from '../Controller/CommentController.js';
import * as Poll from "../Controller/PollController.js";
import * as Admin from "../Controller/AdminController.js";

const router = express.Router();

router.post("/usersignup", Users.signupHandler);
router.post("/login", Users.login);
router.post("/verifytoken", Users.tokenVerifyHandler);
router.post("/posts", Post.createPost);
router.post("/like", Post.likeHandler);
router.post("/unlike", Post.unlikeHandler);
router.post("/comment", Comment.commentHandler);
router.post("/reply", Comment.replyHandler);
router.post("/checkcommentlike", Comment.CheckCommentLike);
router.post("/likecomment", Comment.likeComment);
router.post("/unlikecomment", Comment.unlikeComment);
router.post("/createpoll", Poll.CreatePoll);
router.post('/votepoll', Poll.VotePoll);


router.get("/alldiscussion", Post.fetchAlldiscussion);
router.get("/allpoll", Poll.FetchAllPoll);

router.get("/category/:tag", Post.fetchcategory);
router.get('/checklike/:post_id/:user_id', Post.CheckPostLike);
router.get("/fetchuserpost/:id", Post.getSpecificDiscussion);
router.get("/fetchPostDetails/:id", Post.fetchPostDetails);
router.get("/fetchuser/:id", Users.fetchuser);


router.delete("/removePost/:id", Post.removepost);
router.delete("/removePoll/:id", Poll.DeletePoll);
router.delete("/removeComment/:id", Comment.removeComment);


// edite post routes

router.put("/editpost", Post.EditepostHandler);
router.put("/editcomment", Comment.EditComment);
router.put("/restorecomment/:id", Comment.restoreComment);


//admin related routes

router.get("/fetchapprovedposts", Admin.FetchApprovedPosts);
router.get("/fetchpendingposts", Admin.FetchPendingPosts);
router.get("/fetchrejectedposts", Admin.FetchRejectedPosts);
router.get("/approvepost/:id", Admin.ApprovePost);
router.get("/rejectpost/:id", Admin.RejectPost);




export default router;
