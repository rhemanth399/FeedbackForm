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

// getting the feedback forms

const allFormsRetrieving = async (req,res) =>{
    try {
        const forms = await formModel.find();
        res.json({success:true,message:forms})
    } catch (error) {
        console.log(error)
        res.json({success:false,message:"Error"})
    }
}

// getting the feedback based on id
const feedbackBasedonId = async (req,res) =>{
    const {id} =req.params;
    try {
       const form = await formModel.findById(id);
       if(!form){
        return res.json({
            success:false, message:"Not found"
        })
       }
       res.json({
        success:true,message:form
       })
    } catch (error) {
        console.log(error)
        res.json({
            success:false,message:"Server Error"
        })
    }
}


// updating the forms based on form id
const updatingFormBasedonId = async (req,res) =>{
    const {id} =req.params;
    try {
        const form = await formModel.findByIdAndUpdate(id,req.body)
        if(!form){
            return res.json({
                success:false,message:"Not Found"
            })
        }
        res.json({
            success:true,message:form
        })
    } catch (error) {
        console.log(error)
        res.json({
            success:false,message:"Error"
        })
    }
}

export { storeFeedback , allFormsRetrieving ,feedbackBasedonId , updatingFormBasedonId}