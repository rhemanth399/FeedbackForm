import feedbackModel from "../models/feedbackModel.js";


// storing feedback data

const storingFeedback= async(req,res)=>{
    const {rating,comment,yesNo,name,user}=req.body;
    try {
        const newfeedback = new feedbackModel({
            rating:rating,
            comment:comment,
            yesNo:yesNo,
            name:name,
            user:user
        })
        const feedback = await newfeedback.save()
        res.json({success:true,message:"Feedback created"})
    } catch (error) {
        console.log(error)
        res.json({success:false,message:"Error"})
    }
}



export {storingFeedback}