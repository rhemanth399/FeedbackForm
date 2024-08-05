import React from "react"
const IssueTracking:React.FC=()=>{

    return(
        <div className="card">
      <h2>Issue Tracking</h2>
      <div className="issue-list">
        {/* List repeated issues here */}
        <p>List of repeated issues for deeper analysis and action.</p>
      </div>
      <div className="comments-section">
        {/* Add comment functionality here */}
        <p>Add comments to individual feedback submissions.</p>
      </div>
    </div>
    )
}

export default IssueTracking