import pollModal from "../Schema/PollSchema.js";
import userModal from "../Schema/UserSchema.js";
import commentModal from "../Schema/CommentSchema.js";
export const FetchPosts = async (req, res) => {
  try {
    const id = req.params.id.trim();
    const data = await userModal
      .find({ _id: id })
      .select("-password")
      .populate({
        path: "discussion.ref_id",
        match: { visibility: true },
        populate: [
          {
            path: "comments",
            modal: commentModal,
            match: { visibility: true },
            populate: [
              {
                path: "user",
                select: "_id name email img",
                modal: userModal,
              },
              {
                path: "reply",
                modal: commentModal,
                match: { visibility: true },
                populate: [
                  {
                    path: "user",
                    select: "_id name email img",
                    modal: userModal,
                  },
                  {
                    path: "reply",
                    modal: commentModal,
                    match: { visibility: true },
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
            match: { visibility: true },
          },
        ],
      })
      .populate({
        path: "like.ref_id",
        match: { visibility: true },
        populate: [
          {
            path: "comments",
            modal: commentModal,
            match: { visibility: true },
            populate: [
              {
                path: "user",
                select: "_id name email img",
                modal: userModal,
              },
              {
                path: "reply",
                modal: commentModal,
                match: { visibility: true },
                populate: [
                  {
                    path: "user",
                    select: "_id name email img",
                    modal: userModal,
                  },
                  {
                    path: "reply",
                    modal: commentModal,
                    match: { visibility: true },
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
            match: { visibility: true },
          },
        ],
      })
      .populate({
        path: "poll.ref_id",
        match: { visibility: true },
        populate: [
          {
            path: "comments",
            modal: commentModal,
            match: { visibility: true },
            populate: [
              {
                path: "user",
                select: "_id name email img",
                modal: userModal,
              },
              {
                path: "reply",
                modal: commentModal,
                match: { visibility: true },
                populate: [
                  {
                    path: "user",
                    select: "_id name email img",
                    modal: userModal,
                  },
                  {
                    path: "reply",
                    modal: commentModal,
                    match: { visibility: true },
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
            match: { visibility: true },
          },
        ],
      })
      .populate({
        path: "comment.ref_id",
        match: { visibility: true },
        populate: [
          {
            path: "comments",
            modal: commentModal,
            match: { visibility: true },
            populate: [
              {
                path: "user",
                select: "_id name email img",
                modal: userModal,
              },
              {
                path: "reply",
                modal: commentModal,
                match: { visibility: true },
                populate: [
                  {
                    path: "user",
                    select: "_id name email img",
                    modal: userModal,
                  },
                  {
                    path: "reply",
                    modal: commentModal,
                    match: { visibility: true },
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
            match: { visibility: true },
          },
        ],
      })
      .populate({
        path: "mention.ref_id",
        match: { visibility: true },
        populate: [
          {
            path: "comments",
            modal: commentModal,
            match: { visibility: true },
            populate: [
              {
                path: "user",
                select: "_id name email img",
                modal: userModal,
              },
              {
                path: "reply",
                modal: commentModal,
                match: { visibility: true },
                populate: [
                  {
                    path: "user",
                    select: "_id name email img",
                    modal: userModal,
                  },
                  {
                    path: "reply",
                    modal: commentModal,
                    match: { visibility: true },
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
            match: { visibility: true },
          },
        ],
      });

    // const combined = data[0].discussion
    //   .concat(data[0].poll)
    //   .concat(data[0].like)
    //   .concat(data[0].comment)
    //   .concat(data[0].mention);

    const discussionLength = data[0].discussion.length;
    const likedLength = data[0].like.length;
    const pollLength = data[0].poll.length;
    const mentionLength = data[0].mention.length;
    const commentLength = data[0].comment.length;

    res.json({
      status: true,
      discussion: discussionLength,
      like: likedLength,
      poll: pollLength,
      mention: mentionLength,
      comment: commentLength,
      data: data,
    });
  } catch (error) {
    res.json({
      status: false,
      error: error,
    });
  }
};