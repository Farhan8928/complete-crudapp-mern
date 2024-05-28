import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../styles/header.css';

const Header = () => {
    const { isAuthenticated, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <header className="header">
            <div className="logo">
                <Link to="/records">Record List</Link>
            </div>
            <nav className="nav-links">
                <Link to="/">Dashboard</Link>
                <Link to="/records">Records</Link>
                <Link to="/hireme">Hire Me</Link>
                {isAuthenticated ? (
                    <button onClick={handleLogout} className="auth-button">Logout</button>
                ) : (
                    <button onClick={() => navigate('/login')} className="auth-button">Login</button>
                )}
            </nav>
        </header>
    );
};

export default Header;
