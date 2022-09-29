import postmodal from "../Schema/Postschema.js";
import pollmodal from "../Schema/PollSchema.js";


export const CreatePoll = async (req, res) => {
    try {
        console.log(req.body);
        const { post_id } = req.body;
        const newPoll = new pollmodal(req.body);

        console.log(newPoll);
        await newPoll.save();

        // const pollLink = await postmodal.findByIdAndUpdate(post_id, { poll: newPoll._id });

        // console.log(pollLink);

        res.json({
            message: "ok",
            poll: newPoll._id
        })

    } catch (error) {
        res.json({
            message: error
        })
    }
}
export const DeletePoll = async (req, res) => {
    try {
        const id = req.params.id.trim();

        const data = await pollmodal.findByIdAndUpdate(id, { visibility: false });
        if (data) {
            res.status(200).json({
                status: "ok",
                success: true,
                message: "Poll remove successfully !",
            });
        } else {
            res.status(200).json({
                status: "error",
                success: false,
                message: "please try again ,poll not delete !",
            });
        }
    } catch (error) {
        res.status(505).json({
            status: "error",
            success: false,
            message: error,
        });
    }
};

export const CheckPollLike = async (req, res) => {


    try {
        const poll_id = req.params.poll_id;
        const user_id = req.params.user_id;
        const pollLike = await pollmodal.findById(poll_id);
        const check = pollLike.like.includes(user_id);
        console.log("check:", check);
        if (check) {
            res.json({
                status: true,
                message: 'ok'
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
        const poll = await pollmodal.findByIdAndUpdate(poll_id, {
            $push: { like: user_id },
        });
        const pollLike = await pollmodal.findById(poll_id);


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
        const poll = await pollmodal.findByIdAndUpdate(poll_id, {
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