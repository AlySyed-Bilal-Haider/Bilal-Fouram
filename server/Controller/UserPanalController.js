import pollModal from "../Schema/PollSchema.js";
import userModal from "../Schema/UserSchema.js";
import commentModal from "../Schema/CommentSchema.js";
export const FetchPosts = async (req, res) => {
  try {
    const id = req.params.id.trim();
    const data = await userModal
      .find({ _id: id })
      .populate("discussion.ref_id")
      .populate({
        path: "discussion.ref_id",
        populate: [
          {
            path: "comments",
            modal: commentModal,
            populate: [
              {
                path: "reply",
                modal: commentModal,
                populate: [
                  {
                    path: "reply",
                    modal: commentModal,
                  },
                ],
              },
            ],
          },
          {
            path: "user",
            select: "_id name email img",
            modal: userModal,
          },
          {
            path: "poll",
            modal: pollModal,
          },
        ],
      })
      .populate("like.ref_id")
      .populate({
        path: "like.ref_id",
        populate: [
          {
            path: "comments",
            modal: commentModal,
            populate: [
              {
                path: "reply",
                modal: commentModal,
                populate: [
                  {
                    path: "reply",
                    modal: commentModal,
                  },
                ],
              },
            ],
          },
          {
            path: "user",
            select: "_id name email img",
            modal: userModal,
          },
          {
            path: "poll",
            modal: pollModal,
          },
        ],
      })
      .populate("poll.ref_id")
      .populate({
        path: "poll.ref_id",
        populate: [
          {
            path: "comments",
            modal: commentModal,
            populate: [
              {
                path: "reply",
                modal: commentModal,
                populate: [
                  {
                    path: "reply",
                    modal: commentModal,
                  },
                ],
              },
            ],
          },
          {
            path: "user",
            select: "_id name email img",
            modal: userModal,
          },
          {
            path: "poll",
            modal: pollModal,
          },
        ],
      })
      .populate("comment.ref_id")
      .populate({
        path: "comment.ref_id",
        populate: [
          {
            path: "comments",
            modal: commentModal,
            populate: [
              {
                path: "reply",
                modal: commentModal,
                populate: [
                  {
                    path: "reply",
                    modal: commentModal,
                  },
                ],
              },
            ],
          },
          {
            path: "user",
            select: "_id name email img",
            modal: userModal,
          },
          {
            path: "poll",
            modal: pollModal,
          },
        ],
      })
      .populate("mention.ref_id")
      .populate({
        path: "mention.ref_id",
        populate: [
          {
            path: "comments",
            modal: commentModal,
            populate: [
              {
                path: "reply",
                modal: commentModal,
                populate: [
                  {
                    path: "reply",
                    modal: commentModal,
                  },
                ],
              },
            ],
          },
          {
            path: "user",
            select: "_id name email img",
            modal: userModal,
          },
          {
            path: "poll",
            modal: pollModal,
          },
        ],
      });

    const combined = data[0].discussion
      .concat(data[0].poll)
      .concat(data[0].like)
      .concat(data[0].comment)
      .concat(data[0].mention);
    console.log(combined.length);

    res.json({
      status: true,
      length: combined.length,
      data: combined,
    });
  } catch (error) {
    console.log(error);
    res.json({
      status: false,
      error: error,
    });
  }
};

export const FetchDatafrom = async (req, res) => {
  try {
    const id = req.params.id.trim();
    const data = await userModal
      .find({ _id: id })
      .populate("discussion.ref_id")
      .populate({
        path: "discussion.ref_id",
        populate: [
          {
            path: "comments",
            modal: commentModal,
            populate: [
              {
                path: "reply",
                modal: commentModal,
                populate: [
                  {
                    path: "reply",
                    modal: commentModal,
                  },
                ],
              },
            ],
          },
          {
            path: "user",
            select: "_id name email img",
            modal: userModal,
          },
          {
            path: "poll",
            modal: pollModal,
          },
        ],
      });

    return res.json(data);
  } catch (e) {
    return res.json(e);
  }
};

export const FetchDiscussion = async (req, res) => {
  try {
    const id = req.params.id.trim();
    console.log(id);
    const data = await userModal
      .find({ _id: id })
      .populate("discussion.ref_id")
      .populate({
        path: "discussion.ref_id",
        populate: [
          {
            path: "comments",
            modal: commentModal,
            populate: [
              {
                path: "reply",
                modal: commentModal,
                populate: [
                  {
                    path: "reply",
                    modal: commentModal,
                  },
                ],
              },
            ],
          },
          {
            path: "user",
            modal: userModal,
          },
          {
            path: "poll",
            modal: pollModal,
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
    const data = await userModal
      .find({ _id: id })
      .populate("like.ref_id")
      .populate({
        path: "like.ref_id",
        populate: [
          {
            path: "comments",
            modal: commentModal,
            populate: [
              {
                path: "reply",
                modal: commentModal,
                populate: [
                  {
                    path: "reply",
                    modal: commentModal,
                  },
                ],
              },
            ],
          },
          {
            path: "user",
            modal: userModal,
          },
          {
            path: "poll",
            modal: pollModal,
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
    const data = await userModal
      .find({ _id: id })
      .populate("poll.ref_id")
      .populate({
        path: "poll.ref_id",
        populate: [
          {
            path: "comments",
            modal: commentModal,
            populate: [
              {
                path: "reply",
                modal: commentModal,
                populate: [
                  {
                    path: "reply",
                    modal: commentModal,
                  },
                ],
              },
            ],
          },
          {
            path: "user",
            modal: userModal,
          },
          {
            path: "poll",
            modal: pollModal,
          },
        ],
      });
    const length = data[0].poll.length;

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
export const FetchMentionComments = async (req, res) => {
  try {
    const id = req.params.id.trim();
    console.log("id:", id);
    const data = await userModal
      .find({ _id: id })
      .populate("mention.ref_id")
      .populate({
        path: "mention.ref_id",
        populate: [
          {
            path: "comments",
            modal: commentModal,
            populate: [
              {
                path: "reply",
                modal: commentModal,
                populate: [
                  {
                    path: "reply",
                    modal: commentModal,
                  },
                ],
              },
            ],
          },
          {
            path: "user",
            modal: userModal,
          },
          {
            path: "poll",
            modal: pollModal,
          },
        ],
      });
    const length = data[0].mention.length;

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
