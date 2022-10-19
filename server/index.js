import express from "express";
import cors from "cors";
import multer from "multer";
import router from "./Routes/routes.js";
import connectDB from "./Database/ConnectDB.js";
import userModal from "./Schema/UserSchema.js";
import dotenv from "dotenv";
import fs from "fs";
import path from "path";
import timeout from "connect-timeout";
const __dirname = path.resolve();
dotenv.config();
const urlDB =
  "mongodb+srv://bilal:minerdao12345@cluster0.flytvry.mongodb.net/?retryWrites=true&w=majority";
const app = express();
app.use(timeout("60000s"));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.urlencoded({ extended: true }));
app.use(express.static("./build"));

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
app.use("/upload", express.static("./upload"));
// .......start route update of profile pic.........
app.post("/uploadimg", upload.single("file"), async (req, res) => {
  try {
    const _id = req.body.id;
    console.log(req);
    const previous = await userModal.findOne({ _id: _id });
    console.log("previous", previous);

    const data = await userModal.findByIdAndUpdate(_id, {
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

app.use((error, req, res, next) => {
  console.error(error);
  res.status(500).json({ status: false, data: error });
});

app.get("/*", function (req, res) {
  res.sendFile(path.join(__dirname, "./build/index.html"), function (err) {
    if (err) {
      res.status(500).send(err);
    }
  });
});

app.listen(process.env.PORT || 4000, function () {
  console.log("Server Start at live");
});
