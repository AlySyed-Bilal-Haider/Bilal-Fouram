import { model, mongoose, Schema } from "mongoose";
const Poll = new Schema({
    question: {
        type: String,
        trim: true,
        required: true,
    },
    answers: [{
        title: String,
        vote: [String]
    }],
    addedAt: {
        type: Date,
        default: new Date(),
    },
    endDate: {
        type: Date,
    },
    visible: Boolean,
    
    like: [{
        type: Schema.Types.ObjectId,
        ref: "user"
    }],
});
const pollmodal = model("poll", Poll);
export default pollmodal;
