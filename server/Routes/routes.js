import express from 'express';
import {post,login,tokenVerifyHandler} from '../Controller/Post.js';
const router=express.Router();
router.get('/',(req,res)=>{
 console.log("Server succfully");
});
router.post("/usersignup", post);
router.post("/login",login);
router.post("/verifytoken",tokenVerifyHandler);

export default router;