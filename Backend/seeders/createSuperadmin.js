import SuperadminModel from "../models/superModel.js";

export const createSuperadmin = async () => {
    const superadmin = await SuperadminModel.findOne({ email: 'superadmin@example.com' });
    if (!superadmin) {
      const newSuperadmin = new SuperadminModel({
        email: 'rhemanth3999@gmail.com',
        password: '123456'
      });
      await newSuperadmin.save();
      console.log('Superadmin created with email: superadmin@example.com');
    } else {
      console.log('Superadmin already exists.');
    }
  };
  
  //createSuperadmin().catch(console.error);
