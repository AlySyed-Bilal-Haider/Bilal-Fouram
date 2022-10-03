import postmodal from "../Schema/Postschema.js";
import commentModal from "../Schema/CommentSchema.js";
import pollmodal from "../Schema/PollSchema.js";
import usermodal from "../Schema/UserSchema.js";

export const FetchApprovedPosts = async (req, res) => {
    try {
        const id = req.headers.id;
        console.log(id);
        const admin = await usermodal.findOne({ _id: id, role: "admin" });
        console.log(admin._id);
        // if ( admin && admin._id && id === admin._id.toString()) {
        const data = await postmodal.find({ status: "Approved" })
        res.json({
            status: "ok",
            posts: data
        })
        // } else {
        //     res.status(403).send("Access denied.");
        // }
    } catch (error) {
        // res.status(403).send("Access denied.");
        res.json({
            status: "error",
            message: error
        })
    }
}

export const FetchPendingPosts = async (req, res) => {
    try {

        const data = await postmodal.find({ status: "Pending" })
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

        const data = await postmodal.find({ status: "Rejected" })
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
        const id = req.params.id;
        const data = await postmodal.findByIdAndUpdate(id, { status: "Approved" })
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