import pollmodal from "../Schema/PollSchema.js";
import postmodal from "../Schema/PostSchema.js";
import usermodal from "../Schema/UserSchema.js";
import commentModal from "../Schema/CommentSchema.js";


export const FetchPosts = async (req, res) => {
    try {
        const id = req.params.id.trim();
        console.log(id);
        const data = await usermodal.find({_id:id}).populate("post").populate({
            path: "post",
            populate: [
              {
                path: "comments",
                modal: commentModal,
                populate:[
                    {
                        path: "reply",
                        modal: commentModal,
                    }
                ]
              },
              {
                path: "poll",
                modal: pollmodal,
              },
            ],
          });
        res.json({
            status: true,
            data: data
        })

    } catch (error) {
        console.log(error);
        res.json({
            status: false,
            error: error
        })
    }
}

export const FetchDiscussion = async (req, res) => {
    try {
        const id = req.params.id.trim();
        console.log(id);
        const data = await usermodal.find({_id:id}).populate("discussion").populate({
            path: "post",
            populate: [
              {
                path: "comments",
                modal: commentModal,
                populate:[
                    {
                        path: "reply",
                        modal: commentModal,
                    }
                ]
              },
              {
                path: "poll",
                modal: pollmodal,
              },
            ],
          });
       
        res.json({
            status: true,
            data: data
        })

    } catch (error) {
        console.log(error);
        res.json({
            status: false,
            error: error
        })
    }
}
export const FetchLiked = async (req, res) => {
    try {
        const id = req.params.id.trim();
        console.log(id);
        const data = await usermodal.find({_id:id}).populate("like").populate({
            path: "post",
            populate: [
              {
                path: "comments",
                modal: commentModal,
                populate:[
                    {
                        path: "reply",
                        modal: commentModal,
                    }
                ]
              },
              {
                path: "poll",
                modal: pollmodal,
              },
            ],
          });
        res.json({
            status: true,
            data: data
        })

    } catch (error) {
        console.log(error);
        res.json({
            status: false,
            error: error
        })
    }
}