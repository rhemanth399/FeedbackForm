import Admin from "../models/adminModel.js";

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

export {createAdmin,getListOfAdmins}