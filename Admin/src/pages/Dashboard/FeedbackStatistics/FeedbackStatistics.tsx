import React from "react";
import StatusDistributionChart from "../../../components/StatusDistributionChart/StatusDistributionChart";
import Sidebar from "../../../components/Drawer/Sidebar";
import Header from "../../../components/Header/Header";

const Feedback:React.FC=()=>{
    const [drawerOpen, setDrawerOpen] = React.useState<any>(false);
    const toggleDrawer:any = (newOpen:boolean) => {
      setDrawerOpen(newOpen);
    };
    return(
        <>
        <Header toggleDrawer={toggleDrawer}/>
        <Sidebar open={drawerOpen} toggleDrawer={toggleDrawer}/>
        <StatusDistributionChart/>
        </>
    )
}

export default Feedback