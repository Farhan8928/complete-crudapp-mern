// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext'; 
import Dashboard from './components/Dashboard';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import RecordForm from './components/Record/RecordForm';
import RecordList from './components/Record/RecordList';
import Header from './components/Header'; 

const App = () => {
    return (
        <AuthProvider>
            <Router>
                <div className="App">
                    <Header /> 
                    <Routes>
                        <Route path="/" element={<Dashboard />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                        <Route path="/record/:id?" element={<RecordForm />} />
                        <Route path="/records" element={<RecordList />} />
                    </Routes>
                </div>
            </Router>
        </AuthProvider>
    );
};

export default App;
