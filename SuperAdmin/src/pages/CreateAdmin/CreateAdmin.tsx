// // CreateAdmin.tsx
// import React, { useState } from 'react';
// import { Checkbox, FormControlLabel } from '@mui/material';
// import axios from 'axios';
// import './CreateAdmin.css';

// const CreateAdmin: React.FC = () => {
//   const [username, setUsername] = useState<string>('');
//   const [password, setPassword] = useState<string>('');
//   const [designation,setDesignation] =useState<string>('')
//   const [phone,setPhone] = useState<string>('')
//   const [name,setName] =useState<string>("")
//   const [email,setEmail] = useState<string>('')
//   const [message, setMessage] = useState<string>('');
//   const [canCreateForm, setCanCreateForm] = useState(false);
//   const [canEditForm, setCanEditForm] = useState(false);

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     try {
//       const newAdmin = {
//         username,
//         password,
//         name,
//         email,
//         phone,
//         designation,
//         permissions: {
//           canCreateForm,
//           canEditForm
//         }
//       };
      
      
//       const response = await axios.post('https://feedbackform-backend-ao0d.onrender.com/api/admin/create',  newAdmin);
//       console.log('hemanth')
//       setMessage(response.data.message);
//       setUsername('');
//       setPassword('');
//       setEmail("");
//       setName("");
//       setPhone("");
//       setDesignation("")
//       setCanCreateForm(false)
//       setCanEditForm(false)
      
//     } catch (error) {
//       setMessage('Failed to create admin');
//       setUsername('');
//       setPassword('');
//       setEmail("");
//       setName("");
//       setPhone("");
//       setDesignation("");
//       setCanCreateForm(false)
//       setCanEditForm(false)
//     }
//   };

//   return (
//     <div className="create-admin">
//       <h1>Create Admin</h1>
//       <form onSubmit={handleSubmit} className='form'>
//         <div className="form-group">
//           <label>Username:</label>
//           <input
//             type="text"
//             value={username}
//             onChange={(e) => setUsername(e.target.value)}
//             required
//           />
//         </div>
//         <div className="form-group">
//           <label>Name:</label>
//           <input
//             type="name"
//             value={name}
//             onChange={(e) => setName(e.target.value)}
//             required
//           />
//         </div>
//         <div className="form-group">
//           <label>Email:</label>
//           <input
//             type="email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             required
//           />
//         </div>
//         <div className="form-group">
//           <label>Phone:</label>
//           <input
//             type="phone"
//             value={phone}
//             onChange={(e) => setPhone(e.target.value)}
//             required
//           />
//         </div>
//         <div className="form-group">
//           <label>Password:</label>
//           <input
//             type="password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             required
//           />
//         </div>
//         <div className="form-group">
//           <label>Designation:</label>
//           <input
//             type="text"
//             value={designation}
//             onChange={(e) => setDesignation(e.target.value)}
//             required
//           />
//         </div>
//         <FormControlLabel
//         control={
//           <Checkbox
//             checked={canCreateForm}
//             onChange={(e) => setCanCreateForm(e.target.checked)}
//           />
//         }
//         label="Able to Create Form"
//       />
//       <FormControlLabel
//         control={
//           <Checkbox
//             checked={canEditForm}
//             onChange={(e) => setCanEditForm(e.target.checked)}
//           />
//         }
//         label="Able to Edit Form"
//       />
        
//         <button type="submit">Create</button>
//       </form>
//       {message && <p>{message}</p>}
//     </div>
//   );
// };

// export default CreateAdmin;





import React, { useState } from 'react';
import { Checkbox, FormControlLabel } from '@mui/material';
import axios from 'axios';
import './CreateAdmin.css';
import { validateEmail, validatePhone } from '../../utils/validation';  // Adjust the path if needed

const CreateAdmin: React.FC = () => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [designation, setDesignation] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const [canCreateForm, setCanCreateForm] = useState(false);
  const [canEditForm, setCanEditForm] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate email and phone
    if (!validateEmail(email)) {
      setMessage('Invalid email format');
      return;
    }
    if (!validatePhone(phone)) {
      setMessage('Phone number should be 10 digits');
      return;
    }

    try {
      const newAdmin = {
        username,
        password,
        name,
        email,
        phone,
        designation,
        permissions: {
          canCreateForm,
          canEditForm,
        },
      };

      const response = await axios.post('https://feedbackform-backend-ao0d.onrender.com/api/admin/create', newAdmin);
      setMessage(response.data.message);
      setUsername('');
      setPassword('');
      setEmail('');
      setName('');
      setPhone('');
      setDesignation('');
      setCanCreateForm(false);
      setCanEditForm(false);
    } catch (error) {
      setMessage('Failed to create admin');
    }
  };

  return (
    <div className="create-admin">
      <h1>Create Admin</h1>
      <form onSubmit={handleSubmit} className="form">
        {/* Form fields */}
        <div className="form-group">
          <label>Username:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Name:</label>
          <input
            type="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Phone:</label>
          <input
            type="phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Designation:</label>
          <input
            type="text"
            value={designation}
            onChange={(e) => setDesignation(e.target.value)}
            required
          />
        </div>
        <FormControlLabel
          control={<Checkbox checked={canCreateForm} onChange={(e) => setCanCreateForm(e.target.checked)} />}
          label="Able to Create Form"
        />
        <FormControlLabel
          control={<Checkbox checked={canEditForm} onChange={(e) => setCanEditForm(e.target.checked)} />}
          label="Able to Edit Form"
        />
        <button type="submit">Create</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default CreateAdmin;
