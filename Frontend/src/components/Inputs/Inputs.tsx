import React from 'react';
import { useFormContext } from '../../context/FormContext';
import './Inputs.css';

const Inputs: React.FC = () => {
  const { formData, setFormData } = useFormContext();

  const handleUserChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData({
      user: {
        ...formData.user,
        [name]: value, // Treat mobile as string
      },
    });
  };

  return (
    <div>
      <input
        type="text"
        name="name"
        value={formData.user.name}
        onChange={handleUserChange}
      />
      <input
        type="text"
        name="mobile" // Change type to text
        value={formData.user.mobile}
        onChange={handleUserChange}
      />
    </div>
  );
};

export default Inputs;
