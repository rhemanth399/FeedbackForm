import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import { useNavigate } from 'react-router';
import { jwtDecode } from 'jwt-decode';

type TemporaryDrawerProps = {
  open: boolean;
  toggleDrawer: (open: boolean) => void;
};

export default function Sidebar({ open, toggleDrawer }: TemporaryDrawerProps) {
  const navigate = useNavigate();

  // Example token; in practice, you'd retrieve this from local storage or an API
  const token = localStorage.getItem('token'); // Replace with actual token retrieval
  let permissions = { canCreateForm: false, canEditForm: false };

  if (token) {
    const decodedToken: any = jwtDecode(token);
    permissions = decodedToken.permissions;
  }

  const DrawerList = (
    <Box sx={{ width: 250 }} role="presentation">
      <List>
        {['Dashboard','Feedback Statistics', 'Issue Tracking'].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton onClick={() => navigate(text.replace(" ", ''))}>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}

        {/* Conditional rendering based on permissions */}
        {permissions.canCreateForm && (
          <ListItem disablePadding>
            <ListItemButton onClick={() => navigate('CreateForm')}>
              <ListItemIcon>
                <InboxIcon />
              </ListItemIcon>
              <ListItemText primary="Create Form" />
            </ListItemButton>
          </ListItem>
        )}

        {permissions.canEditForm && (
          <ListItem disablePadding>
            <ListItemButton onClick={() => navigate('EditForm')}>
              <ListItemIcon>
                <MailIcon />
              </ListItemIcon>
              <ListItemText primary="Edit Form" />
            </ListItemButton>
          </ListItem>
        )}
      </List>
      <Divider />
      
    </Box>
  );

  return (
    <div>
      <Drawer open={open} onClose={() => toggleDrawer(false)}>
        {DrawerList}
      </Drawer>
    </div>
  );
}
