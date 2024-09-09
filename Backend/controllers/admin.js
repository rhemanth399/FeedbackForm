import Admin from "../models/adminModel.js";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken';
import 'dotenv/config.js'
//Create an Admin


const createAdmin = async (req,res)=>{
    const { username,password ,name,email,phone ,designation,permissions} = req.body;
    console.log(password,name,email,phone,designation,permissions,username)
    try{
        const existingAdmin = await Admin.findOne({ username });
    if (existingAdmin) {
      return res.status(400).json({ success:false,message: 'Username already exists' });
    }
    const admin = new Admin({ username, password ,email, name ,phone,permissions,designation});
    await admin.save();
    res.status(201).json({ success:true,message: 'Admin created successfully' });
    }
    catch(error){
        res.status(500).json({ success:false,message: 'Failed to create admin' });
    }
}

const getListOfAdmins = async (req,res)=>{
    
        try {
            const admins = await Admin.find();
            res.json({ success: true, admins });
        } catch (error) {
            console.error(error);
            res.status(500).json({ success: false, message: 'Server Error' });
        
    };
}

//Login Function
const loginAdmin = async(req,res)=>{
    const {email,password} =req.body;
    
    try{
    const admin = await Admin.findOne({email})
    
    if(!admin){
       return res.status(400).json({message:"Invalid Email",success:false})
    }
    
    const isPasswordValid = await bcrypt.compare(password, admin.password);
    console.log(isPasswordValid)
    if(!isPasswordValid){
       return res.status(400).json({message:"Invalid Password",success:false})
    }

//Create a JWT payload
const payload ={id:admin._id,username:admin.username,email:admin.email,permissions:admin.permissions}
// Sign token
const token = jwt.sign(payload,process.env.JWT_SCERET,{expiresIn:'1h'})

return res.json({message:"Login Successfull",success:true,token})
}
catch(err){
   return res.json({message:"Server Side Error",success:false})
}

}

const updateAdminCanCreateForm= async(req,res)=>{
    const {adminId,canCreateForm}= req.body;
    const canCreateFormBoolean = canCreateForm.toLowerCase() ==="yes"?true:false;
    try{
        
        let admin = await Admin.findByIdAndUpdate(adminId,{'permissions.canCreateForm':canCreateFormBoolean},{new:true,runValidators:true});
        if(!admin){  
            return res.status(400).json({message:"Admin not Found",success:false})
        }
        return res.status(200).json({ message: "Permission updated successfully", success: true });
 
    }
    catch(err){
        return res.status(500).json({message:"Server Error",success:false})
    }
}

const updateAdminCanEditForm = async(req,res)=>{
    const {adminId,canEditForm}= req.body;
    const canEditFormBoolean = canEditForm.toLowerCase() ==="yes"?true:false;
    try{

    let admin = await Admin.findByIdAndUpdate(adminId,{'permissions.canEditForm':canEditFormBoolean},{new:true,runValidators:true});
    if(!admin){
        return res.status(400).json({message:"Admin not found",success:false})
    }
    return res.status(200).json({message:"Permission updated successfully",success:true})
}
catch(err){
    return res.status(500).json({message:"Server Error",success:false})
}
}

const deleteAdmin = async(req,res)=>{
    try{
        const admin = await Admin.findByIdAndDelete(req.params.id);
        if(!admin){
            return res.status(404).json({message:'Admin Not Found'})
        }
        res.status(200).json({message:'Admin deleted successfully'})
    }
    catch(error){
        res.status(500).json({message:'Server error',error})
    }
}

const updateAdmin = async(req,res)=>{
    try{
        const updatedAdmin = await Admin.findByIdAndUpdate(
            req.params.id,
            req.body,{new:true,runValidators:true}
        )
        if(!updatedAdmin){
            return res.status(404).json({message:'Admin not found'})
        }
        res.status(200).json({message:'Admin Updated Successfully',admin:updateAdmin})
    }
    catch(error){
        res.status(500).json({ message: 'Server error', error });
    }
}

export {createAdmin,getListOfAdmins,loginAdmin,updateAdminCanCreateForm , updateAdminCanEditForm ,deleteAdmin ,updateAdmin}