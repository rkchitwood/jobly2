import React from "react";
import JobCard from "./JobCard";

/** shows a list of job cards */

function JobCardList({ jobs, apply}){
    return(
        <div className="JobCardList">
        {jobs.map(job => (
            <JobCard
                key={job.id}
                id={job.id}
                title={job.title}
                salary={job.salary}
                equity={job.equity}
                companyName={job.companyName}
            />
        ))}
      </div>
    );
}

export default JobCardList;