import React from "react";
import Header from "../../../components/Header/Header";
import Sidebar from "../../../components/Drawer/Sidebar";
import ListOfFeedback from "../../../components/ScrollableTable/FeedbackList";

const FeedbackDetails:React.FC=()=>{
    const [drawerOpen, setDrawerOpen] = React.useState<any>(false);

    const toggleDrawer:any = (newOpen:boolean) => {
      setDrawerOpen(newOpen);
    };
    return(
        <>
        <Header toggleDrawer={toggleDrawer}/>
        <Sidebar open={drawerOpen} toggleDrawer={toggleDrawer}/>
        <ListOfFeedback/>
        </>
    )
}

export default FeedbackDetails