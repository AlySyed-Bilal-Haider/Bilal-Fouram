import express from 'express';
import {post,login,tokenVerifyHandler,discussion,fetchAlldiscussion
} from '../Controller/Post.js';
const router=express.Router();
router.get('/',(req,res)=>{
 console.log("Server succfully");
});
router.post("/usersignup", post);
router.post("/login",login);
router.post("/verifytoken",tokenVerifyHandler);
router.post('/posts',discussion);
router.get('/alldiscussion',fetchAlldiscussion);
export default router;