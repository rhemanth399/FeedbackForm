import React from "react"
const FeedbackOverview:React.FC=()=>{

    return(
        <div className="card">
      <h2>Feedback Overview</h2>
      <div className="feedback-details">
        {/* Add your feedback details here */}
        <p>Feedback details categorized by star rating numbers.</p>
      </div>
      <div className="feedback-stats">
        {/* Add your feedback statistics and trends here */}
        <p>Feedback statistics and trends.</p>
      </div>
    </div>
    )
}

export default FeedbackOverview