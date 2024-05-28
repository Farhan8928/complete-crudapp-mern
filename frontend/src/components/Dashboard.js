import React from 'react';
import { Link } from 'react-router-dom';
import "../styles/dashboard.css";
const Dashboard = () => {
    return (
        <div className="container"> 
            <h1 className="header">Welcome to the Dashboard</h1> 
            <div className="links"> 
                <Link to="/login" className="link">Login</Link> 
                <Link to="/register" className="link">Register</Link> 
            </div>
        </div>
    );
};

export default Dashboard;
