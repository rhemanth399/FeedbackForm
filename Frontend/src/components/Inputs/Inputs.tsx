import React, { useState } from 'react';
import { useFormContext } from '../../context/FormContext';
import { validateEmail, validatePhone } from '../../utils/validation'
import './Inputs.css';

const Inputs: React.FC = () => {
  const { formData, setFormData } = useFormContext();
  const [errors, setErrors] = useState({ email: '', phone: '' });

  const handleUserChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    // Validation for email and phone
    let newErrors = { ...errors };
    if (name === 'email') {
      newErrors.email = validateEmail(value) ? '' : 'Invalid email address';
    }
    if (name === 'phone') {
      newErrors.phone = validatePhone(value) ? '' : 'Invalid phone number';
    }
    
    setErrors(newErrors);
    setFormData({
      user: {
        ...formData.user,
        [name]: value, // Treat mobile as string
      },
    });
  };

  return (
    <div className='inputs'>
       <div className="form-group">
       <label>Name</label>
      <input
        type="text"
        name="name"
        value={formData.user.name}
        onChange={handleUserChange}
      />
      </div>
      <div className="form-group">
      <label>Phone Number</label>
      <input
        type="text"
        name="phone" 
        value={formData.user.phone}
        onChange={handleUserChange}
      />
       {errors.phone && <span className="error">{errors.phone}</span>}
      </div>
      <div className="form-group">
      <label>Email</label>
      <input
        type="email"
        name="email" // Change type to text
        value={formData.user.email}
        onChange={handleUserChange}
      />
      {errors.email && <span className="error">{errors.email}</span>}
      </div>
    </div>
  );
};

export default Inputs;