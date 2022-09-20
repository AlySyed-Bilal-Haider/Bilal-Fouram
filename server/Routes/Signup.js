import express from 'express';
import mongomodal from '../Schema/Signupschema.js';
const router=express.Router();
router.get('/',(req,res)=>{
 console.log("Server succfully");
});

// signup user using by signup schema

router.post("/usersignup", async (req, res) => {

    try {
      console.log(req.body);
      // const usersignup = await new mongomodal({
      //   name: req.body.fname,
      //   email: req.body.email,
      //   password:req.body.password
      // });
      // await usersignup.save();
      // res.json({
      //   status:'ok',
      //   success: true,
      //   message: "User register Successfully!",
      // });
    } catch (error) {
      console.log(error);
    }
  });

export default router;