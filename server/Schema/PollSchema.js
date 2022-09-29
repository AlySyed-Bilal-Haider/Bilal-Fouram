import { model, mongoose, Schema } from "mongoose";
const Poll = new Schema({
    question: {
        type: String,
        trim: true,
        required: true,
    },
    answers: [{
        title: String,
        vote: []
    }],
    addedAt: {
        type: Date,
        default: new Date(),
    },
    endDate: {
        type: Date,
    },
    visible: Boolean,
    // user: {
    //     type: Schema.Types.ObjectId,
    //     ref: "user"
    // },
    // comments: [{
    //     type: Schema.Types.ObjectId,
    //     ref: "comment"
    // }],
    // like: [{
    //     type: Schema.Types.ObjectId,
    //     ref: "user"
    // }],
});
const pollmodal = model("poll", Poll);
export default pollmodal;
