import Admin from "../models/adminModel.js";

//Create an Admin

const createAdmin = async (req,res)=>{
    const { username,password} = req.body;
    try{
        const existingAdmin = await Admin.findOne({ username });
    if (existingAdmin) {
      return res.status(400).json({ success:false,message: 'Username already exists' });
    }
    const admin = new Admin({ username, password });
    await admin.save();
    res.status(201).json({ success:true,message: 'Admin created successfully' });
    }
    catch(error){
        res.status(500).json({ success:false,message: 'Failed to create admin' });
    }
}

export {createAdmin}