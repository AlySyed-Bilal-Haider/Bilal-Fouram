import postModal from "../Schema/PostSchema.js";
import userModal from "../Schema/UserSchema.js";

export async function VerifyAdmin(req, res, next) {
  try {
    const id = req.headers["x-access-token"];
    console.log(id);
    const admin = await userModal.findOne({ _id: id, role: "admin" });
    if (admin) {
      next();
    } else {
      res.status(403).send("Access denied.");
    }
  } catch (error) {
    res.json({
      error: error,
    });
  }
}

export const FetchApprovedPosts = async (req, res) => {
  try {
    const data = await postModal
      .find({ status: "Approved", visibility: true })
      .populate("poll")
      .populate("user");
    res.json({
      status: "ok",
      posts: data,
    });
  } catch (error) {
    res.json({
      status: "error",
      message: error,
    });
  }
};

export const FetchPendingPosts = async (req, res) => {
  try {
    const data = await postModal
      .find({ status: "Pending", visibility: true })
      .populate("poll")
      .populate("user");
    res.json({
      status: "ok",
      posts: data,
    });
  } catch (error) {
    res.json({
      status: "error",
      message: error,
    });
  }
};
export const FetchRejectedPosts = async (req, res) => {
  try {
    const data = await postModal
      .find({ status: "Rejected", visibility: true })
      .populate("poll")
      .populate("user");
    res.json({
      status: "ok",
      posts: data,
    });
  } catch (error) {
    res.json({
      status: "error",
      message: error,
    });
  }
};

export const ApprovePost = async (req, res) => {
  try {
    const id = req.params.id;
    console.log("Approve id", id);
    const data = await postModal.findByIdAndUpdate(id, { status: "Approved" });
    console.log(data);
    await userModal.findByIdAndUpdate(data.user, {
      $push: { discussion: data._id },
    });
    res.json({
      status: "ok",
      message: "Post has been Approved",
    });
  } catch (error) {
    res.json({
      status: "error",
      message: error,
    });
  }
};
export const RejectPost = async (req, res) => {
  try {
    const id = req.params.id;
    console.log("reject id", id);
    await postModal.findByIdAndUpdate(id, { status: "Rejected" });
    res.json({
      status: "ok",
      message: "Post has been Rejected",
    });
  } catch (error) {
    res.json({
      status: "error",
      message: error,
    });
  }
};