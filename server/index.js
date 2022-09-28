import express from "express";
import cors from "cors";
import multer from "multer";
import router from "./Routes/routes.js";
import connectDB from "./Database/ConnectDB.js";
import mongomodal from "./Schema/Signupschema.js";
import dotenv from "dotenv";
import fs from "fs";
import path from "path";

const __dirname = path.resolve();

dotenv.config();
const urlDB =
  "mongodb+srv://bilal:minerdao12345@cluster0.flytvry.mongodb.net/?retryWrites=true&w=majority";
const app = express();
const port = process.env.PORT || 4000;
app.use(cors(""));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

connectDB(urlDB);

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
    console.log("previous", previous);

    const data = await mongomodal.findByIdAndUpdate(_id, {
      img: req.file.filename,
    });

    if (previous.img !== "" && req.file && req.file.path) {
      if (data.img !== req.file.path) {
        console.log("not equal");
        try {
          fs.unlink("upload/" + data.img, (err) => {
            console.log(err);
          });
        } catch (error) {
          console.log(error);
        }
      }
    }
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

app.use(router);
app.use("/upload", express.static("./upload"));
app.use(express.static("./build"));

app.get("/*", function (req, res) {
  res.sendFile(path.join(__dirname, "./build/index.html"), function (err) {
    if (err) {
      res.status(500).send(err);
    }
  });
});
app.listen(port, (req, res) => {
  console.log("server start");
});
