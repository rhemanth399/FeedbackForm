import mongoose from "mongoose";
import bcrypt from 'bcrypt'

const superadminSchema = new mongoose.Schema({
    email:{type:String,required:true,unique:true},
    password:{type:String,required:true},
})

superadminSchema.pre('save',async function(next){
    if(!this.isModified('password')) return next()
        const salt = await bcrypt.genSalt(12);
    this.password = await bcrypt.hash(this.password,salt)
    next();
})


const SuperadminModel = mongoose.model('superadmin',superadminSchema);

export default SuperadminModel