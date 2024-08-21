import Template from "../models/templateModel.js"
import FormModel from "../models/formModel.js";
import QRCode from 'qrcode';
import mongoose from "mongoose";


// Storing the templates 
const storeTemplates = async (req,res)=>{
    const template = new Template(req.body)
    try {
        await template.save();
        res.json({
            success:true,
            message:template
        })
    } catch (error) {
        console.log(error)
        res.json({
            success:false,
            message:"Error"
        })
    }   
}

// Retrieving template
const gettingTemplates = async (req,res)=>{
    try {
        const templates = await Template.find();
        res.json({success:true,message:templates})
    } catch (error) {
        console.log(error)
        res.json({
            success:false,
            message:"Error"
        })
    }
}

// deleting the template

const deletingTemplate = async (req,res)=>{
    try {
        await Template.findByIdAndDelete(req.params.id)
        res.json({
            success:true,
            message:"Deleted Templete"
        })
    } catch (error) {
        console.log(error)
        res.json({
            success:false,
            message:"Error"
        })
    }
}

const deleteQuestion = async (req, res) => {
    const { templateId, questionId } = req.params;
    console.log('hi',templateId,questionId)

  try {
    
    const template = await Template.findById(templateId);
    if (!template) {
      console.log('Template not found.');
      return;
    }

    // Find the index of the question to be removed
    const questionIndex = template.questions.findIndex(q => q._id.toString() === questionId);
    
    if (questionIndex === -1) {
      console.log('Question not found.');
      return;
    }

    // Remove the question from the array
    template.questions.splice(questionIndex, 1);

    // Save the updated template
    await template.save();
    console.log('Question deleted successfully.');
  } catch (error) {
    console.log('hieli',error)
    res.status(500).json({ message: 'Error deleting question.', error });
  }
  };


// storing template in db
const storeTemplate = async (req,res)=>{
    console.log('Hi')
    
    try {
        const template = new Template(req.body);
        const formUrl= `https://feedback-form-user.vercel.app/?formId=${template._id}`
        const qrCode = await QRCode.toDataURL(formUrl)
        console.log(qrCode)
        template.qrCode=qrCode;
        console.log("Before",template)
        await template.save();
        console.log('After',template)
        res.json({
            success:true,
            message:"Form Stored Successfully"
        })
    } catch (error) {
        console.log(error)
        res.json({
            success:false,
            message:"Error"
        })
    }
}


// updating the templates based on form id
const updatingTemplatesBasedonId = async (req,res) =>{
    const {id} =req.params;
    try {
        const template = await Template.findByIdAndUpdate(id,req.body)
        if(!template){
            return res.json({
                success:false,message:"Not Found"
            })
        }
        res.json({
            success:true,message:template
        })
    } catch (error) {
        console.log(error)
        res.json({
            success:false,message:"Error"
        })
    }
}

// getting the feedback based on id
const templateBasedonId = async (req,res) =>{
    const {id} =req.params;
    try {
       const template = await Template.findById(id);
       if(!template){
        return res.json({
            success:false, message:"Not found"
        })
       }
       res.json({
        success:true,message:template
       })
    } catch (error) {
        console.log(error)
        res.json({
            success:false,message:"Server Error"
        })
    }
}


export {storeTemplates,gettingTemplates,deletingTemplate,storeTemplate,updatingTemplatesBasedonId,templateBasedonId,deleteQuestion}