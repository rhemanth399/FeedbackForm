import React from "react";
import Sidebar from "../../../components/Drawer/Sidebar";
import Header from "../../../components/Header/Header";
import CreateForm from "../../../components/CreateForm/CreateForm";

const CreateFeedback:React.FC=()=>{
    const [drawerOpen, setDrawerOpen] = React.useState<any>(false);
    const toggleDrawer:any = (newOpen:boolean) => {
      setDrawerOpen(newOpen);
    };
    return(
        <>
        <Header toggleDrawer={toggleDrawer}/>
        <Sidebar open={drawerOpen} toggleDrawer={toggleDrawer}/>
        <CreateForm/>
        </>
    )
}

export default CreateFeedback