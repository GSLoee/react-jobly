import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import JoblyApi from "../../api/api";
import JobCardList from "../jobs/JobCardList";

function CompanyDetail() {
    const { handle } = useParams();
    const [company, setCompany] = useState(null);

    useEffect(() => {
        async function getCompany() {
            try {
                const fetchedCompany = await JoblyApi.getCompany(handle);
                setCompany(fetchedCompany);
            } catch (error) {
                console.error("Error fetching company:", error);
            }
        }
        getCompany();
    }, [handle]);

    if (!company) {
        return <div>Loading...</div>;
    }

    return (
        <div className="CompanyDetail">
            <h4>{company.name}</h4>
            <p>{company.description}</p>
            <JobCardList jobs={company.jobs} />
        </div>
    );
}

export default CompanyDetail;
