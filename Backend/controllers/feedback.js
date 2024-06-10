import formModel from "../models/formModel.js";


// storing the feedback data
const storeFeedback = async (req,res) =>{

    const form = new formModel(req.body)
    try {
        
        await form.save();
        res.json({success:true,message:"Form stored successfully"})
        
    } catch (error) {
        console.log(error)
        res.json({success:false,message:"Error"})
    }
}

export { storeFeedback }