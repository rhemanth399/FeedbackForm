import Template from "../models/templateModel.js"
import FormModel from "../models/formModel.js";
import QRCode from 'qrcode';


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
    const { formId, questionIndex } = req.params;
  
    try{
        const form = await Template.findById(formId);
        if(!form){
            return res.json({success:false,message:"Form not Found"})
        }
        form.questions.splice(questionIndex,1);
        await form.save();
        res.json({
            success:true,message:"Question Deleted Successfully",form
        })
    }
    catch(error){
        res.json({
            success:false,message:"Error deleting question"
        })
    }
  };


// storing template in db
const storeTemplate = async (req,res)=>{
    console.log('Hi')
    const template = new Template(req.body);
    try {
        const formUrl= `https://feedback-form-user.vercel.app/?formId=${template._id}`
        const qrCode = await QRCode.toDataURL(formUrl)
        console.log(qrCode)
        template.qrCode=qrCode;
        await template.save();
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