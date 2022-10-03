import postmodal from "../Schema/PostSchema.js";
import commentModal from "../Schema/CommentSchema.js";
import pollmodal from "../Schema/PollSchema.js";
import usermodal from "../Schema/UserSchema.js";


export async function VerifyAdmin(req, res, next) {
    try {
        const id = req.headers.id;
        const admin = await usermodal.findOne({ _id: id, role: "admin" });
        if (admin) {
            next();
        } else {
            res.status(403).send("Access denied.");
        }
    } catch (error) {
        res.json({
            error: error
        })
    }
}

export const FetchApprovedPosts = async (req, res) => {
    try {
        const data = await postmodal.find({ status: "Approved" }).populate("poll").populate("user");
        res.json({
            status: "ok",
            posts: data
        })
    } catch (error) {
        res.json({
            status: "error",
            message: error
        })
    }
}

export const FetchPendingPosts = async (req, res) => {
    try {

        const data = await postmodal.find({ status: "Pending" }).populate("poll").populate("user");
        res.json({
            status: "ok",
            posts: data
        })

    } catch (error) {
        res.json({
            status: "error",
            message: error
        })
    }
}
export const FetchRejectedPosts = async (req, res) => {
    try {

        const data = await postmodal.find({ status: "Rejected" }).populate("poll").populate("user");
        res.json({
            status: "ok",
            posts: data
        })

    } catch (error) {

        res.json({
            status: "error",
            message: error
        })
    }
}

export const ApprovePost = async (req, res) => {
    try {
        // console.log(req);
        const id = req.params.id;
        const data = await postmodal.findByIdAndUpdate(id, { status: "Approved" });
        console.log(data);
        const userdiscussion = await usermodal.findByIdAndUpdate(data.user, {
            $push: { discussion: data._id },
          });
        res.json({
            status: "ok",
            message: "Post has been Approved"
        })
    } catch (error) {

        res.json({
            status: "error",
            message: error
        })
    }
}
export const RejectPost = async (req, res) => {
    try {
        const id = req.params.id;
        const data = await postmodal.findByIdAndUpdate(id, { status: "Rejected" })
        res.json({
            status: "ok",
            message: "Post has been Rejected"
        })
    } catch (error) {

        res.json({
            status: "error",
            message: error
        })
    }
}