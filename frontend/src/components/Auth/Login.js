import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext'; // Import useAuth hook
import "../../styles/login.css";

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const location = useLocation();
    const { isAuthenticated, login } = useAuth(); // Get isAuthenticated and login from useAuth

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`/api/auth/login`, { email, password });
            login(response.data);
            navigate('/records');
        } catch (err) {
            console.error('Error logging in', err);
        }
    };

    return (
        <div className="container">
            {location.pathname !== '/login' && !isAuthenticated && (
                <div className="alert">
                    <p>Please log in to see the results.</p>
                    <button onClick={() => navigate('/login')} className="button">
                        Login
                    </button>
                </div>
            )}
            <h2 className="header">Login</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Email</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="input-field"
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Password</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="input-field"
                        required
                    />
                </div>
                <button type="submit" className="button">Login</button>
            </form>
            <div className="register-prompt">
                <p>Don't have an account?</p>
                <button onClick={() => navigate('/register')} className="button">Register</button>
            </div>
        </div>
    );
};

export default Login;
