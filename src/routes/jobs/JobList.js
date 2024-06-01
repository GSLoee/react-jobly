import React, { useState, useEffect} from "react";
import JoblyApi from "../../api/api";
import JobCardList from "./JobCardList";
import SearchForm from "../../components/SearchForm";

function JobList(){
    const [jobs, setJobs] = useState([]);

    useEffect(function getAllJobs() {
        search()
    }, [])

    async function search(title) {
        let jobs = await JoblyApi.getJobs(title);
        setJobs(jobs)
    }

    return(
        <div className="JobList col-md-8 offset-md-2">
            <SearchForm searchFor={search} />
            {jobs.length
            ? <JobCardList jobs={jobs} />
            : <p className="lead">Sorry no results found.</p>
            }
        </div>
    )
}

export default JobList;