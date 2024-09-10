// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TextField, CircularProgress, Box, Checkbox } from '@mui/material';
// import './ListOfAdmin.css';

// interface Admin {
//   _id: string;
//   name: string;
//   email: string;
//   phone: string;
//   designation: string;
//   permissions: {
//     canCreateForm: boolean;
//     canEditForm: boolean;
//   };
// }

// const ListOfAdmin: React.FC = () => {
//   const [admins, setAdmins] = useState<Admin[]>([]);
//   const [loading, setLoading] = useState<boolean>(true);
//   const [error, setError] = useState<string | null>(null);
//   const [searchTerm, setSearchTerm] = useState<string>('');

//   useEffect(() => {
//     const fetchAdmins = async () => {
//       try {
//         const response = await axios.get('https://feedbackform-backend-ao0d.onrender.com/api/admin/listofadmins');
//         setAdmins(response.data.admins);
//         setLoading(false);
//       } catch (error) {
//         setError('Error fetching admin data');
//         setLoading(false);
//       }
//     };

//     fetchAdmins();
//   }, []);

//   const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     setSearchTerm(event.target.value);
//   };

//   const handlePermissionChange = async (adminId: string, permissionType: 'canCreateForm' | 'canEditForm', currentValue: boolean) => {
//     try {
//       const updatedValue = !currentValue;
//       await axios.put(`https://feedbackform-backend-ao0d.onrender.com/api/admin/update${permissionType === 'canCreateForm' ? 'CanCreateForm' : 'CanEditForm'}`, {
//         adminId,
//         [permissionType]: updatedValue ? 'Yes' : 'No',
//       });
      
//       setAdmins(prevAdmins =>
//         prevAdmins.map(admin =>
//           admin._id === adminId
//             ? { ...admin, permissions: { ...admin.permissions, [permissionType]: updatedValue } }
//             : admin
//         )
//       );
//     } catch (error) {
//       console.error('Error updating permission', error);
//       // Optionally, handle the error with a message to the user
//     }
//   };

//   const filteredAdmins = admins.filter((admin) =>
//     (admin.name.toLowerCase() + admin.email.toLowerCase() + admin.phone + admin.designation.toLowerCase()).includes(searchTerm.toLowerCase())
//   );

//   if (loading) return <div className="loading"><CircularProgress /></div>;
//   if (error) return <p>{error}</p>;

//   return (
//     <div className="admin-list-container">
//       <h1>List of Admins</h1>
//       <Box mb={2}>
//         <TextField
//           id="search"
//           label="Search by Name"
//           variant="outlined"
//           value={searchTerm}
//           onChange={handleSearchChange}
//           className="search-input"
//         />
//       </Box>
//       <TableContainer component={Paper} className="table-container">
//         <Table>
//           <TableHead>
//             <TableRow>
//               <TableCell>Name</TableCell>
//               <TableCell>Email</TableCell>
//               <TableCell>Phone</TableCell>
//               <TableCell>Designation</TableCell>
//               <TableCell>Create Form</TableCell>
//               <TableCell>Edit Form</TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {filteredAdmins.map((admin) => (
//               <TableRow key={admin._id}>
//                 <TableCell>{admin.name}</TableCell>
//                 <TableCell>{admin.email}</TableCell>
//                 <TableCell>{admin.phone}</TableCell>
//                 <TableCell>{admin.designation}</TableCell>
//                 <TableCell>
//                   <Checkbox
//                     checked={admin.permissions.canCreateForm}
//                     onChange={() => handlePermissionChange(admin._id, 'canCreateForm', admin.permissions.canCreateForm)}
//                   />
//                 </TableCell>
//                 <TableCell>
//                   <Checkbox
//                     checked={admin.permissions.canEditForm}
//                     onChange={() => handlePermissionChange(admin._id, 'canEditForm', admin.permissions.canEditForm)}
//                   />
//                 </TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </TableContainer>
//     </div>
//   );
// };

// export default ListOfAdmin;





import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TextField, CircularProgress, Box, Checkbox, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import SaveIcon from '@mui/icons-material/Save';
import './ListOfAdmin.css';

interface Admin {
  _id: string;
  name: string;
  email: string;
  phone: string;
  designation: string;
  permissions: {
    canCreateForm: boolean;
    canEditForm: boolean;
  };
}

const ListOfAdmin: React.FC = () => {
  const [admins, setAdmins] = useState<Admin[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [editRowId, setEditRowId] = useState<string | null>(null); // Track the row in edit mode
  const [editFormValues, setEditFormValues] = useState<Partial<Admin>>({});

  useEffect(() => {
    const fetchAdmins = async () => {
      try {
        const response = await axios.get('https://feedbackform-backend-ao0d.onrender.com/api/admin/listofadmins');
        setAdmins(response.data.admins);
        setLoading(false);
      } catch (error) {
        setError('Error fetching admin data');
        setLoading(false);
      }
    };

    fetchAdmins();
  }, []);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleEditClick = (admin: Admin) => {
    setEditRowId(admin._id);
    setEditFormValues(admin);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditFormValues({ ...editFormValues, [name]: value });
  };

  const handleSaveClick = async (adminId: string) => {
    try {
      await axios.put(`https://feedbackform-backend-ao0d.onrender.com/api/admin/${adminId}`, editFormValues);
      setAdmins(prevAdmins =>
        prevAdmins.map(admin =>
          admin._id === adminId ? { ...admin, ...editFormValues } : admin
        )
      );
      setEditRowId(null); // Exit edit mode
    } catch (error) {
      console.error('Error updating admin', error);
    }
  };

  const handlePermissionChange = async (adminId: string, permissionType: 'canCreateForm' | 'canEditForm', currentValue: boolean) => {
    try {
      const updatedValue = !currentValue;
      await axios.put(`https://feedbackform-backend-ao0d.onrender.com/api/admin/update${permissionType === 'canCreateForm' ? 'CanCreateForm' : 'CanEditForm'}`, {
        adminId,
        [permissionType]: updatedValue ? 'Yes' : 'No',
      });
      
      setAdmins(prevAdmins =>
        prevAdmins.map(admin =>
          admin._id === adminId
            ? { ...admin, permissions: { ...admin.permissions, [permissionType]: updatedValue } }
            : admin
        )
      );
    } catch (error) {
      console.error('Error updating permission', error);
    }
  };

  const filteredAdmins = admins.filter((admin) =>
    (admin.name.toLowerCase() + admin.email.toLowerCase() + admin.phone + admin.designation.toLowerCase()).includes(searchTerm.toLowerCase())
  );

  if (loading) return <div className="loading"><CircularProgress /></div>;
  if (error) return <p>{error}</p>;

  return (
    <div className="admin-list-container">
      <h1>List of Admins</h1>
      <Box mb={2}>
        <TextField
          id="search"
          label="Search by Name"
          variant="outlined"
          value={searchTerm}
          onChange={handleSearchChange}
          className="search-input"
        />
      </Box>
      <TableContainer component={Paper} className="table-container">
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Phone</TableCell>
              <TableCell>Designation</TableCell>
              <TableCell>Create Form</TableCell>
              <TableCell>Edit Form</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredAdmins.map((admin) => (
              <TableRow key={admin._id}>
                <TableCell>
                  {editRowId === admin._id ? (
                    <TextField name="name" value={editFormValues.name || ''} onChange={handleInputChange} />
                  ) : (
                    admin.name
                  )}
                </TableCell>
                <TableCell>
                  {editRowId === admin._id ? (
                    <TextField name="email" value={editFormValues.email || ''} onChange={handleInputChange} />
                  ) : (
                    admin.email
                  )}
                </TableCell>
                <TableCell>
                  {editRowId === admin._id ? (
                    <TextField name="phone" value={editFormValues.phone || ''} onChange={handleInputChange} />
                  ) : (
                    admin.phone
                  )}
                </TableCell>
                <TableCell>
                  {editRowId === admin._id ? (
                    <TextField name="designation" value={editFormValues.designation || ''} onChange={handleInputChange} />
                  ) : (
                    admin.designation
                  )}
                </TableCell>
                <TableCell>
                  <Checkbox
                    checked={admin.permissions.canCreateForm}
                    onChange={() => handlePermissionChange(admin._id, 'canCreateForm', admin.permissions.canCreateForm)}
                  />
                </TableCell>
                <TableCell>
                  <Checkbox
                    checked={admin.permissions.canEditForm}
                    onChange={() => handlePermissionChange(admin._id, 'canEditForm', admin.permissions.canEditForm)}
                  />
                </TableCell>
                <TableCell>
                  {editRowId === admin._id ? (
                    <IconButton onClick={() => handleSaveClick(admin._id)}>
                      <SaveIcon />
                    </IconButton>
                  ) : (
                    <IconButton onClick={() => handleEditClick(admin)}>
                      <EditIcon />
                    </IconButton>
                  )}
                  <IconButton>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default ListOfAdmin;
