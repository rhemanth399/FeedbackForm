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
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TextField, CircularProgress, Box, Checkbox } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
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

interface EditAdminData {
  name: string;
  email: string;
  phone: string;
  designation: string;
}

const ListOfAdmin: React.FC = () => {
  const [admins, setAdmins] = useState<Admin[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [editMode, setEditMode] = useState<boolean>(false);
  const [editAdminData, setEditAdminData] = useState<EditAdminData | null>(null);

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

  const handleEditClick = (admin: Admin) => {
    setEditAdminData({
      name: admin.name,
      email: admin.email,
      phone: admin.phone,
      designation: admin.designation,
    });
    setEditMode(true);
  };

  const handleDeleteClick = async (adminId: string) => {
    try {
      await axios.delete(`https://feedbackform-backend-ao0d.onrender.com/api/admin/delete/${adminId}`);
      setAdmins(prevAdmins => prevAdmins.filter(admin => admin._id !== adminId));
    } catch (error) {
      console.error('Error deleting admin', error);
    }
  };

  const handleSaveClick = async (adminId: string) => {
    if (!editAdminData) return;

    try {
      await axios.put(`https://feedbackform-backend-ao0d.onrender.com/api/admin/update/${adminId}`, {
        ...editAdminData,
      });

      setAdmins(prevAdmins =>
        prevAdmins.map(admin =>
          admin._id === adminId
            ? { ...admin, ...editAdminData }
            : admin
        )
      );

      setEditMode(false);
      setEditAdminData(null);
    } catch (error) {
      console.error('Error updating admin data', error);
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
          label="Search Admin"
          variant="outlined"
          fullWidth
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </Box>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Phone</TableCell>
              <TableCell>Designation</TableCell>
              <TableCell>Can Create Form</TableCell>
              <TableCell>Can Edit Form</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredAdmins.map((admin) => (
              <TableRow key={admin._id}>
                <TableCell>
                  {editMode && editAdminData ? (
                    <TextField
                      value={editAdminData.name}
                      onChange={(e) => setEditAdminData({ ...editAdminData, name: e.target.value })}
                    />
                  ) : (
                    admin.name
                  )}
                </TableCell>
                <TableCell>
                  {editMode && editAdminData ? (
                    <TextField
                      value={editAdminData.email}
                      onChange={(e) => setEditAdminData({ ...editAdminData, email: e.target.value })}
                    />
                  ) : (
                    admin.email
                  )}
                </TableCell>
                <TableCell>
                  {editMode && editAdminData ? (
                    <TextField
                      value={editAdminData.phone}
                      onChange={(e) => setEditAdminData({ ...editAdminData, phone: e.target.value })}
                    />
                  ) : (
                    admin.phone
                  )}
                </TableCell>
                <TableCell>
                  {editMode && editAdminData ? (
                    <TextField
                      value={editAdminData.designation}
                      onChange={(e) => setEditAdminData({ ...editAdminData, designation: e.target.value })}
                    />
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
                  <EditIcon onClick={() => handleEditClick(admin)} />
                  <DeleteIcon onClick={() => handleDeleteClick(admin._id)} />
                  {editMode && editAdminData && (
                    <button onClick={() => handleSaveClick(admin._id)}>Save</button>
                  )}
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
