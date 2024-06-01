// JobCard.js
import React, { useState, useEffect } from "react";
import JoblyApi from "../../api/api";

function JobCard({ id, title, salary, equity, companyName }) {
    const [applied, setApplied] = useState(false);

    useEffect(() => {
        const checkAppliedStatus = async () => {
            try {
                const username = "testuser"; // Replace with the actual username
                const currentUser = await JoblyApi.getCurrentUser(username);
                if (currentUser.appliedJobs.includes(id)) {
                    setApplied(true);
                }
            } catch (error) {
                console.error("Error checking if applied:", error);
            }
        };

        checkAppliedStatus();
    }, [id]);

    const handleApply = async () => {
        try {
            const username = "testuser"; // Replace with the actual username
            await JoblyApi.applyToJob(username, id);
            setApplied(true);
        } catch (error) {
            console.error("Error applying to job:", error);
        }
    };

    return (
        <div className="JobCard card">
            <div className="card-body">
                <h5 className="card-title">{title}</h5>
                <p>{companyName}</p>
                {salary && <div><small>Salary: {salary}</small></div>}
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

export default JobCard;
