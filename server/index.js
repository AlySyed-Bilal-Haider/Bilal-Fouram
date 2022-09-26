import express from "express";
import cors from "cors";
import multer from "multer";
import router from "./Routes/routes.js";
import connectDB from "./Database/ConnectDB.js";
import mongomodal from "./Schema/Signupschema.js";
const url =
  "mongodb+srv://bilal:minerdao12345@cluster0.flytvry.mongodb.net/?retryWrites=true&w=majority";
const app = express();
const port = process.env.port || 4000;
app.use(cors("*"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
connectDB(url);

// upload image and update
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "upload");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + Math.random() + "-" + file.originalname);
  },
});
const upload = multer({ storage: storage });

// .......start route update of profile pic.........
app.post("/uploadimg", upload.single("file"), async (req, res) => {
  const _id = req.body.id;
  try {
    const previous = await mongomodal.findOne({ _id });
    console.log("previous",previous)
    console.log("req.file.path:",req.file.path);
    const data = await mongomodal.findOneAndUpdate(_id, {
      img: req.file.path,
    });
    if (data) {
      res.status(202).json({
        status: "ok",
        success: true,
        message: "Update successfully",
      });
    } else {
      res.json({
        status: "error",
        success: false,
        message: "Not successfully update",
      });
    }
  } catch (error) {
    res.status(500).json({
      status: "error",
      success: false,
      message: "Server error or routesis not match !",
    });
  }
});

app.get("/", (req, res) => {
  res.send("server file");
});
app.use(router);
app.use("/upload", express.static("./upload"));
app.listen(port, (req, res) => {
  console.log("server start");
});
