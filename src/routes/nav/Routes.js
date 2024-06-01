import React, { useContext, useEffect } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import Home from "../home/home";
import LoginForm from "../auth/LoginForm";
import SignupForm from "../auth/SignupForm";
import UserContext from "../auth/UserContext";
import CompanyList from "../companies/CompanyList";
import JobList from "../jobs/JobList";
import CompanyCard from "../companies/CompanyCard";
import CompanyDetail from "../companies/CompanyDetail";
import ProfileForm from "../profile/ProfileForm";

function RoutesList({ login, signup }) {
    const { currentUser } = useContext(UserContext);

    useEffect(() => {
        console.log("currentUser:", currentUser);
    }, [currentUser]);

    return (
        <div>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<LoginForm login={login} />} />
                <Route path="/signup" element={<SignupForm signup={signup} />} />
                <Route path="/companies" element={currentUser ? <CompanyList /> : <Navigate to='/login' />} />
                <Route path="/companies/:handle" element={currentUser ? <CompanyDetail /> : <Navigate to='/login' />} />
                <Route path="/jobs" element={currentUser ? <JobList /> : <Navigate to='/login' />} />
                <Route path="/profile" element={currentUser ? <ProfileForm /> : <Navigate to='/login' />} />

                {/* Add any other routes here */}
            </Routes>
        </div>
    );
}

export default RoutesList;
