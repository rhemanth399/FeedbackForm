import Template from "../models/templateModel.js"
import FormModel from "../models/formModel.js";


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

// storing template in db
const storeTemplate = async (req,res)=>{
    const template = new Template(req.body);
    try {
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


export {storeTemplates,gettingTemplates,deletingTemplate,storeTemplate,updatingTemplatesBasedonId,templateBasedonId}