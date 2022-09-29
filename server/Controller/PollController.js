import postmodal from "../Schema/Postschema.js";
import pollmodal from "../Schema/PollSchema.js";


export const CreatePoll = async (req,res)=>{
    try{
        console.log(req.body);
        const {post_id} = req.body;
        const newPoll = new pollmodal(req.body);

        console.log(newPoll);

    //   await newPoll.save();

        res.json({
            message: "ok"
        })

    }catch(error){
        res.json({
            message: error
        })
    }
}