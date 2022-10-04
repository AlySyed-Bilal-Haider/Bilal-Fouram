import pollmodal from "../Schema/PollSchema.js";
import postmodal from "../Schema/PostSchema.js";
import usermodal from "../Schema/UserSchema.js";
import commentModal from "../Schema/CommentSchema.js";

export const FetchPosts = async (req, res) => {
  try {
    const id = req.params.id.trim();
    console.log(id);
    const data = await usermodal
      .find({ _id: id })
      .populate("post")
      .populate({
        path: "post",
        populate: [
          {
            path: "comments",
            modal: commentModal,
            populate: [
              {
                path: "reply",
                modal: commentModal,
              },
            ],
          },
          {
            path: "poll",
            modal: pollmodal,
          },
        ],
      });
    const length = data[0].post.length;
    res.json({
      status: true,
      length: length,
      data: data,
    });
  } catch (error) {
    console.log(error);
    res.json({
      status: false,
      error: error,
    });
  }
};

export const FetchDiscussion = async (req, res) => {
  try {
    const id = req.params.id.trim();
    console.log(id);
    const data = await usermodal
      .find({ _id: id })
      .populate("discussion")
      .populate({
        path: "discussion",
        populate: [
          {
            path: "comments",
            modal: commentModal,
            populate: [
              {
                path: "reply",
                modal: commentModal,
              },
            ],
          },
          {
            path: "poll",
            modal: pollmodal,
          },
        ],
      });
    const length = data[0].discussion.length;

    res.json({
      status: true,
      length: length,
      data: data,
    });
  } catch (error) {
    console.log(error);
    res.json({
      status: false,
      error: error,
    });
  }
};
export const FetchLiked = async (req, res) => {
  try {
    const id = req.params.id.trim();
    console.log(id);
    const data = await usermodal
      .find({ _id: id })
      .populate("like")
      .populate({
        path: "like",
        populate: [
          {
            path: "comments",
            modal: commentModal,
            populate: [
              {
                path: "reply",
                modal: commentModal,
              },
            ],
          },
          {
            path: "poll",
            modal: pollmodal,
          },
        ],
      });
    console.log(data[0].like.length);
    const length = data[0].like.length;
    res.json({
      status: true,
      length: length,
      data: data,
    });
  } catch (error) {
    console.log(error);
    res.json({
      status: false,
      error: error,
    });
  }
};

export const FetchPollPosts = async (req, res) => {
    try {
        const id = req.params.id.trim();
        const data = await usermodal.find({ _id: id }).populate("poll").populate({
            path: "poll",
            populate: [
                {
                    path: "comments",
                    modal: commentModal,
                    populate: [
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
        const length = data[0].poll.length;

        res.json({
            status: true,
            length: length,
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