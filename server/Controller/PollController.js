import pollModal from "../Schema/PollSchema.js";
import userModal from "../Schema/UserSchema.js";
import postModal from "../Schema/PostSchema.js";

export const FetchAllPoll = async (req, res) => {
  try {
    const data = await pollModal.find({ visibility: true });
    res.json({
      status: "ok",
      success: true,
      message: "all poll",
      allPoll: data,
    });
  } catch (error) {
    res.status(404).json({
      status: "error",
      success: false,
      message: error,
    });
  }
};

export const CreatePoll = async (req, res) => {
  try {
    const newPoll = await new pollModal(req.body);
    newPoll.save();
    res.json({
      message: "ok",
      poll: newPoll._id,
    });
  } catch (error) {
    res.json({
      message: error,
    });
  }
};
// export const DeletePoll = async (req, res) => {
//   try {
//     const id = req.params.id.trim();

//     const data = await pollmodal.findByIdAndUpdate(id, { visibility: false });
//     if (data) {
//       res.status(200).json({
//         status: "ok",
//         success: true,
//         message: "Poll remove successfully !",
//       });
//     } else {
//       res.status(200).json({
//         status: "error",
//         success: false,
//         message: "please try again ,poll not delete !",
//       });
//     }
//   } catch (error) {
//     res.status(505).json({
//       status: "error",
//       success: false,
//       message: error,
//     });
//   }
// };

export const VotePoll = async (req, res, next) => {
  console.log("vote", req.body);
  try {
    // console.log("vote", req.body);
    const { poll_id, answer_id, user_id } = req.body;
    const voteAnswer = await pollModal.findOneAndUpdate(
      { _id: poll_id, "answers._id": answer_id },
      { $push: { "answers.$.vote": user_id } }
    );
    const increaseVote = await pollModal.findByIdAndUpdate(voteAnswer._id,{totalvote: voteAnswer.totalvote+1});
    
    const post = await postModal.find({poll: poll_id});
    // console.log(post[0]._id);

    const ref = {ref_id: post[0]._id};
    const votepoll = await userModal.findByIdAndUpdate(user_id, {
      $push: { poll: ref },
    });

    const data = await pollModal.find({ _id: poll_id,visibility: true});
    // console.log("Poll data:", data);
    res.status(200).json({
      status: "ok",
      success: true,
      message: "Answer has been voted..!",
    });
  } catch (error) {
    next(error);
  }
};

export const CheckPollLike = async (req, res) => {
  try {
    const poll_id = req.params.poll_id;
    const user_id = req.params.user_id;
    const pollLike = await pollModal.findById(poll_id);
    const check = pollLike.like.includes(user_id);
    console.log("check:", check);
    if (check) {
      res.json({
        status: true,
        message: "ok",
      });
    } else {
      res.json({
        status: false,
      });
    }
  } catch (error) {
    res.json({
      message: error,
    });
  }
};

export const likeHandler = async (req, res) => {
  try {
    const { poll_id, user_id } = req.body;
    const poll = await pollModal.findByIdAndUpdate(poll_id, {
      $push: { like: user_id },
    });
    const pollLike = await pollModal.findById(poll_id);

    // console.log(pollLike.like);
    res.json({
      message: "ok",
    });
  } catch (error) {
    res.json({
      message: error,
    });
  }
};

export const unlikeHandler = async (req, res) => {
  try {
    const { poll_id, user_id } = req.body;
    const poll = await pollModal.findByIdAndUpdate(poll_id, {
      $pull: { like: user_id },
    });
    res.json({
      message: "ok",
    });
  } catch (error) {
    res.json({
      message: "error",
      error: error,
    });
  }
};
