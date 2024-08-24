import SuperadminModel from "../models/superModel";
import bcrypt from 'bcrypt'


// login superadmin

const superAdminLogin = async(req,res)=>{
    const {email,password} = req.body
    try{
        const superadmin = await SuperadminModel.findOne({email})
        if(!superadmin){
            return res.status(400).json({message:"Invalid email"})
        }
        const isMatch = await bcrypt.compare(password,superadmin.password)
        if(!isMatch){
            return res.status(400).json({message:"Invalid password"})
        }
        const payload ={
            
            superadmin:{
            id:superadmin._id,
            email:superadmin.email,
            }
        }

        const token = jwt.sign(payload,'jwt_sceret',{expires:'1h'})
        return res.status(200).send({token,message:"Sucessfully login"})
    }
    catch(err){
        res.status(500).send({
            message:"Server Error",
            success:false
        })
    }
}

export { superAdminLogin}