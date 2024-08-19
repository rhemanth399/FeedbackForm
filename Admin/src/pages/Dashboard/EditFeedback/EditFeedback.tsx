import React from "react";
import Sidebar from "../../../components/Drawer/Sidebar";
import Header from "../../../components/Header/Header";
import EditForm from "../../../components/EditForm/EditForm";

const EditFeedback:React.FC=()=>{
    const [drawerOpen, setDrawerOpen] = React.useState<any>(false);
    const toggleDrawer:any = (newOpen:boolean) => {
      setDrawerOpen(newOpen);
    };
    return(
        <>
        <Header toggleDrawer={toggleDrawer}/>
        <Sidebar open={drawerOpen} toggleDrawer={toggleDrawer}/>
        <EditForm/>
        </>
    )
}

export default EditFeedback