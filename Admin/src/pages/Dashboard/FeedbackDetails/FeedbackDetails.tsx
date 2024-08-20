import React from "react";
import Header from "../../../components/Header/Header";
import Sidebar from "../../../components/Drawer/Sidebar";
import ListOfFeedback from "../../../components/ScrollableTable/FeedbackList";

const FeedbackDetails: React.FC = () => {
  const [drawerOpen, setDrawerOpen] = React.useState<boolean>(false);
  const [searchQuery, setSearchQuery] = React.useState<string>("");

  const toggleDrawer = (newOpen: boolean) => {
    setDrawerOpen(newOpen);
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query); // Set the search query for filtering feedback
  };

  return (
    <>
      <Header toggleDrawer={toggleDrawer} onSearch={handleSearch} />
      <Sidebar open={drawerOpen} toggleDrawer={toggleDrawer} />
      <div>
        <h1>List Of Assigned Feedback</h1>
        <ListOfFeedback searchQuery={searchQuery} />
      </div>
    </>
  );
};

export default FeedbackDetails;
