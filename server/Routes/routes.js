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
  uploadProfile,
} from "../Controller/Post.js";
const router = express.Router();
router.get("/", (req, res) => {
  console.log("Server succfully");
});
router.post("/usersignup", post);
router.post("/login", login);
router.post("/verifytoken", tokenVerifyHandler);
router.post("/posts", discussion);

router.get("/alldiscussion", fetchAlldiscussion);
router.get("/category/:tag", fetchcategory);
router.get("/fetchuser/:email", fetchuser);
router.get("/fetchspecificpost/:email", getSpecificdescussion);
router.get("/fetchPostDetails/:id", fetchPostDetails);
router.delete("/removePost/:id", removepost);
var storage = multer.diskStorage({
  destination: "upload/",
  filename: function (req, file, cb) {
    cb(null, file.originalname+ '-' + Date.now());
  },
});
router.use("/upload", express.static("./upload"));
var upload = multer({ storage: storage }).single("file");
router.put("/uploadimg/:id",upload,async (req, res) => {
    console.log("req", req.files);
    const id = req.params.id.trim();
    console.log("id",id);
    res.send(id);
    // try {
    //   console.log(_id);
    //   const data = await mongomodal.findAndModify(
    //     { _id: id },
    //     {
    //       img: req.file.path,
    //     }
    //   );
  
    //   if (data) {
    //     res.json({
    //       status: "successfully",
    //       success: true,
    //       message: "your profile pic change successfully !",
    //     });
    //   } else {
    //     res.json({
    //       status: "error",
    //       success: false,
    //       message: "please try again !",
    //     });
    //   }
    // } catch (error) {
    //   console.log("error", error);
    //   res.json({
    //     status: "error",
    //     success: false,
    //     message: "your profile pic change successfully !",
    //   });
    // }
  });

export default router;
