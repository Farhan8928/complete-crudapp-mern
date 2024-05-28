import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {  useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext'; 
import '../../styles/recordlist.css';

const RecordList = () => {
    const [records, setRecords] = useState([]);
    const [active, setActive] = useState('');
    const [search, setSearch] = useState('');
    const [selectedRecords, setSelectedRecords] = useState([]); // State to keep track of selected records
    const navigate = useNavigate();
    const { isAuthenticated } = useAuth(); // Get isAuthenticated from useAuth

    useEffect(() => {
        const fetchRecords = async () => {
            try {
                const user = JSON.parse(localStorage.getItem('user'));
                const token = user ? user.token : null;
                const config = {
                    headers: {
                        'x-auth-token': token
                    },
                    params: {
                        active,
                        search
                    }
                };
                const res = await axios.get('/api/records', config);
                setRecords(res.data);
            } catch (err) {
                console.error('Error fetching records', err);
            }
        };
        if (isAuthenticated) {
            fetchRecords();
        }
    }, [isAuthenticated, active, search]);

    const handleDelete = async (id) => {
        try {
            const user = JSON.parse(localStorage.getItem('user'));
            const token = user ? user.token : null;
            const config = {
                headers: {
                    'x-auth-token': token
                }
            };
            await axios.delete(`/api/records/${id}`, config);
            setRecords(records.filter((record) => record._id !== id));
            setSelectedRecords(selectedRecords.filter((record) => record._id !== id)); // Remove deleted record from selectedRecords
        } catch (err) {
            console.error('Error deleting the record', err);
        }
    };

    const handleBulkDelete = async () => {
        try {
            const user = JSON.parse(localStorage.getItem('user'));
            const token = user ? user.token : null;
            const config = {
                headers: {
                    'x-auth-token': token
                },
                data: { ids: selectedRecords.map(record => record._id) } // Send selected record IDs for bulk delete
            };
            await axios.delete('/api/records', config);
            setRecords(records.filter((record) => !selectedRecords.find(selectedRecord => selectedRecord._id === record._id)));
            setSelectedRecords([]); // Clear selectedRecords after bulk delete
        } catch (err) {
            console.error('Error deleting the records', err);
        }
    };

    const toggleSelect = (id) => {
        const updatedSelectedRecords = selectedRecords.includes(records.find(record => record._id === id))
            ? selectedRecords.filter(record => record._id !== id)
            : [...selectedRecords, records.find(record => record._id === id)];
        setSelectedRecords(updatedSelectedRecords);
    };

    const handleUpdate = (id) => {
        navigate(`/record/${id}`);
    };

    return (
        <div className="container">
            {!isAuthenticated ? (
                <div className="alert">
                    <p>Please log in to see the results.</p>
                    <button onClick={() => navigate('/login')} className="button">Login</button>
                </div>
            ) : (
                <>
                    <h2 className="header">Records</h2>
                    <button className="button" onClick={() => navigate('/record')}>Create New Record</button>
                    <div className="filters">
                        <label className="label">Active</label>
                        <select className="select" value={active} onChange={(e) => setActive(e.target.value)}>
                            <option value="">All</option>
                            <option value="true">Active</option>
                            <option value="false">Inactive</option>
                        </select>
                        <input
                            type="text"
                            className="input"
                            placeholder="Search by name"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>
                    <button className="button" onClick={handleBulkDelete}>Bulk Delete</button>
                    <table className="record-table">
                        <thead>
                            <tr>
                                <th></th>
                                <th>Name</th>
                                <th>Description</th>
                                <th>Category</th>
                                <th>Active</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {records.map((record) => (
                                <tr key={record._id}>
                                    <td>
                                        <input
                                            type="checkbox"
                                            checked={selectedRecords.includes(record)} // Check if record is selected
                                            onChange={() => toggleSelect(record._id)}
                                        />
                                    </td>
                                    <td>{record.name}</td>
                                    <td>{record.description}</td>
                                    <td>{record.category.name}</td>
                                    <td>{record.active ? 'Active' : 'Inactive'}</td>
                                    <td>
                                        <button className="button" onClick={() => handleUpdate(record._id)}>Update</button>
                                        <button className="button" onClick={() => handleDelete(record._id)}>Delete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </>
            )}
        </div>
    );
};

export default RecordList;
