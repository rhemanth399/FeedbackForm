import FeedbackOverview from "../FeedbackOverview/FeedbackOverview";
import IssueTracking from "../IssueTracking/IssueTracking";
import TaskManagement from "../TaskManagement/TaskManagement";

const AdminDashboard: React.FC = () => {
    return (
      <div className="dashboard-container">
        <header className="header">
          <h1>Admin Dashboard</h1>
          <input type="text" className="search-bar" placeholder="Search feedback..." />
        </header>
        <main className="main-content">
          <section className="feedback-overview">
            <FeedbackOverview />
          </section>
          <section className="issue-tracking">
            <IssueTracking />
          </section>
          <section className="task-management">
            <TaskManagement />
          </section>
        </main>
      </div>
    );
  };
  
  export default AdminDashboard;