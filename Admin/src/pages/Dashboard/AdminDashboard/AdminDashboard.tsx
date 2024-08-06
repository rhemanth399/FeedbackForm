import React from "react";
import Header from "../../../components/Header/Header";
import Sidebar from "../../../components/Drawer/Sidebar";


const AdminDashboard: React.FC = () => {
  const [drawerOpen, setDrawerOpen] = React.useState<any>(false);

  const toggleDrawer:any = (newOpen:boolean) => {
    setDrawerOpen(newOpen);
  };
    return (
      <div className="dashboard-container">
        <Header toggleDrawer={toggleDrawer}/>
        <Sidebar open={drawerOpen} toggleDrawer={toggleDrawer}/>
        <div className="main-content">
            main
        </div>
      </div>
    );
  };
  
  export default AdminDashboard;