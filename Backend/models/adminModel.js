import mongoose from "mongoose";
import bcrypt from 'bcrypt'

const adminSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    name: { type : String, required : true},
    email: {type: String, required: true, unique: true},
    phone:{type:String,required:true},
    designation:{type:String,required:true},
    permissions: {
        canCreateForm: { type: Boolean, default: false },
        canEditForm: { type: Boolean, default: false }
    },
    feedbacksAssigned: [{ type: mongoose.Schema.ObjectId, ref: 'Feedback' }]
  });

  adminSchema.pre('save', async function(next) {
    if (!this.isModified('password')) return next();
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  });
  
  const Admin = mongoose.model('Admin', adminSchema);

export default Admin