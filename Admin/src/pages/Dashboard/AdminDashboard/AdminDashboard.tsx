import React from "react";
import Header from "../../../components/Header/Header";
import Sidebar from "../../../components/Drawer/Sidebar";
import MainContent from "../MainContent/MainContent";
import { DrawerProvider } from "../../../useContext/DrawerProvider";


const AdminDashboard: React.FC = () => {
  const [drawerOpen, setDrawerOpen] = React.useState<any>(false);

  const toggleDrawer:any = (newOpen:boolean) => {
    setDrawerOpen(newOpen);
  };
    return (
      <DrawerProvider>
      <div className="dashboard-container">
        <Header toggleDrawer={toggleDrawer}/>
        <Sidebar open={drawerOpen} toggleDrawer={toggleDrawer}/>
        <div className="main-content">
            <MainContent/>
        </div>
      </div>
      </DrawerProvider>
    );
  };
  
  export default AdminDashboard;