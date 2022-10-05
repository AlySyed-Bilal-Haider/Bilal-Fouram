import pollModal from "../Schema/PollSchema.js";
import postModal from "../Schema/PostSchema.js";
import userModal from "../Schema/UserSchema.js";
import commentModal from "../Schema/CommentSchema.js";
export const FetchPosts = async (req, res) => {
  try {
    const id = req.params.id.trim();
    const data = await userModal
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
            path: "poll",
            modal: pollModal,
          },
        ],
      })
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
            path: "poll",
            modal: pollModal,
          },
        ],
      })
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
            path: "poll",
            modal: pollModal,
          },
        ],
      })
      .populate("poll")
      .populate({
        path: "poll",
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
            path: "poll",
            modal: pollModal,
          },
        ],
      })
      .populate("mention")
      .populate({
        path: "mention",
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
      });
    const combined = data[0].post
      .concat(data[0].discussion)
      .concat(data[0].poll)
      .concat(data[0].like)
      .concat(data[0].mention);
    // console.log(combined);
    // const arr= {
    //     "DATA": combined
    // }

    // const sortByDate = arr => {
    //     const sorter = (a, b) => {
    //        return new Date(a.addedAt).getTime() - new Date(b.addedAt).getTime();
    //     };
    //     arr["DATA"].sort(sorter);
    //     return arr;
    //  };
    //  console.log(sortByDate(arr));

    res.json({
      status: true,
      // length: length,
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

export const FetchDiscussion = async (req, res) => {
  try {
    const id = req.params.id.trim();
    console.log(id);
    const data = await userModal
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
      .populate("poll")
      .populate({
        path: "poll",
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
      .populate("mention")
      .populate({
        path: "mention",
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
