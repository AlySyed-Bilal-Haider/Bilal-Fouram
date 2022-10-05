
import { model, mongoose, Schema } from "mongoose";
const Poll = new Schema({
    question: {
        type: String,
        trim: true,
        required: true,
    },
    answers: [{
        title: String,
        vote: [{ type: Schema.Types.ObjectId, }]
    }],
    addedAt: {
        type: Date,
        default: new Date(),
    },
    enddate: {
        type: Date,
    },
    voteVisibility: Boolean,
    visibility: {
        type: Boolean,
        default: true
    },

    like: [{
        type: Schema.Types.ObjectId,
        ref: "user"
    }],
    totalvotes: {
        type: Number,
        default: 0,
    },
});
const pollModal = model("poll", Poll);
export default pollModal;
