import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TextField, CircularProgress } from '@mui/material';
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

  useEffect(() => {
    const fetchAdmins = async () => {
      try {
        const response = await axios.get('http://localhost:4000/api/admin/listofadmins');
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

  const filteredAdmins = admins.filter((admin) =>
    (admin.name.toLowerCase() + admin.email.toLowerCase() + admin.phone + admin.designation.toLowerCase() ).includes(searchTerm.toLowerCase())
  );

  if (loading) return <div className="loading"><CircularProgress /></div>;
  if (error) return <p>{error}</p>;

  return (
    <div className="admin-list-container">
      <h1>List of Admins</h1>
      <TextField
        id="search"
        label="Search by Name"
        variant="outlined"
        value={searchTerm}
        onChange={handleSearchChange}
        className="search-input"
      />
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
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredAdmins.map((admin) => (
              <TableRow key={admin._id}>
                <TableCell>{admin.name}</TableCell>
                <TableCell>{admin.email}</TableCell>
                <TableCell>{admin.phone}</TableCell>
                <TableCell>{admin.designation}</TableCell>
                <TableCell>{admin.permissions.canCreateForm ? 'Yes' : 'No'}</TableCell>
                <TableCell>{admin.permissions.canEditForm ? 'Yes' : 'No'}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default ListOfAdmin;
