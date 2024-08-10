import Admin from "../models/adminModel.js";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken';
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
const payload ={id:admin._id,username:admin.username,email:admin.email}
// Sign token
const token = jwt.sign(payload,'jwt_secret',{expiresIn:'1h'})

return res.json({message:"Login Successfull",success:true,token})
}
catch(err){
   return res.json({message:"Server Side Error",success:false})
}

}

export {createAdmin,getListOfAdmins,loginAdmin}