import formModel from "../models/formModel.js";
import QRCode from 'qrcode';
import mongoose from 'mongoose';

// storing the feedback data
const storeFeedback = async (req,res) =>{

    const form = new formModel(req.body)
    try {
        
        
        const formUrl= `https://feedback-form-user.vercel.app/?formId=${form._id}`
        console.log('Generated form URL:', formUrl); 
        const qrCode = await QRCode.toDataURL(formUrl)
        form.qrCode=qrCode;
        
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
        const updateData = req.body;
        const form = await formModel.findByIdAndUpdate(id,{ $set: updateData }, { new: true })
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

const deleteQuestion = async (req,res)=>{
    const {formId,questionIndex} =req.params;
     
    try {
        
        const result = await formModel.updateOne(
            { _id: formId },
            { $pull: { questions: { _id: questionIndex} } }
        );
        console.log(result)
        if (result.modifiedCount > 0) {
            res.json({
                success: true,
                message: "Question deleted successfully"
            });
        } else {
            res.status(404).json({
                success: false,
                message: "Question not found"
            });
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error deleting question"
        });
    }
}

// deleting a form based on form ID
const deleteForm = async (req, res) => {
    const { formId } = req.body;
    console.log(formId)
    try {
        const form = await formModel.findByIdAndDelete(formId);
        if (!form) {
            return res.status(404).json({
                success: false,
                message: "Form not found"
            });
        }
        res.json({
            success: true,
            message: "Form deleted successfully"
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Error deleting form"
        });
    }
}

export { storeFeedback , allFormsRetrieving ,feedbackBasedonId , updatingFormBasedonId ,deleteQuestion,deleteForm}