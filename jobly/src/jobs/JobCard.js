import React, { useContext, useState } from "react";
import "./JobCard.css";
import UserContext from "../auth/UserContext";

/** show limited job info in a card format */

function JobCard({ id, title, salary, equity, companyName }){
    const { hasAppliedToJob, applyToJob } = useContext(UserContext);
    const [applied, setApplied] = useState();
    React.useEffect(function updateAppliedStatus(){
        setApplied(hasAppliedToJob(id));
    }, [id, hasAppliedToJob]);

    /** handle job apply */
    async function handleApply(evt){
        if(hasAppliedToJob(id)) return;
        applyToJob(id);
        setApplied(true);
    }
    return(
        <div className="JobCard card"> {applied}
        <div className="card-body">
          <h6 className="card-title">{title}</h6>
          <p>{companyName}</p>
          {salary && <div><small>Salary: {formatSalary(salary)}</small></div>}
          {equity !== undefined && <div><small>Equity: {equity}</small></div>}
          <button
              className="btn btn-danger font-weight-bold text-uppercase float-right"
              onClick={handleApply}
              disabled={applied}
          >
            {applied ? "Applied" : "Apply"}
          </button>
        </div>
      </div>        
    );
}

function formatSalary(num) {
    let str = num.toString();
    let digits = 0;
    let isNegative = "";
    if(str[0]=== '-'){
        isNegative = '-';
        str = str.slice(1);
    }
    for(let i = str.length-1; i>=0; i--){
        digits +=1;
        if(digits%3===0 && i!==0){
            str = str.slice(0,i) + "," + str.slice(i, str.length);
        }
    }
    return isNegative + str;
}
export default JobCard;