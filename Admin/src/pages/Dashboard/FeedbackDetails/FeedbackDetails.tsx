import React from "react";
import ScrollableTable from "../../../components/ScrollableTable/ScrollableTable";
import Header from "../../../components/Header/Header";
import Sidebar from "../../../components/Drawer/Sidebar";

const FeedbackDetails:React.FC=()=>{
    const [drawerOpen, setDrawerOpen] = React.useState<any>(false);

    const toggleDrawer:any = (newOpen:boolean) => {
      setDrawerOpen(newOpen);
    };
    return(
        <>
        <Header toggleDrawer={toggleDrawer}/>
        <Sidebar open={drawerOpen} toggleDrawer={toggleDrawer}/>
        <ScrollableTable/>
        </>
    )
}

export default FeedbackDetails