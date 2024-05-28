import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext'; // Import useAuth hook
import '../../styles/recordform.css';

const RecordForm = () => {
    const { id } = useParams();
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');
    const [active, setActive] = useState(true);
    const [categories, setCategories] = useState([]);
    const navigate = useNavigate();
    const { isAuthenticated } = useAuth(); 

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const res = await axios.get(`/api/category`, {
                    headers: {
                        'x-auth-token': localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')).token : null
                    }
                });
                setCategories(res.data);
            } catch (err) {
                console.error('Error fetching categories', err);
            }
        };

        const fetchRecord = async () => {
            try {
                const user = JSON.parse(localStorage.getItem('user'));
                const res = await axios.get(`/api/records/${id}`, {
                    headers: { 'x-auth-token': user ? user.token : null }
                });
                setName(res.data.name);
                setDescription(res.data.description);
                setCategory(res.data.category._id);
                setActive(res.data.active);
            } catch (err) {
                console.error('Error fetching record', err);
            }
        };

        if (isAuthenticated) {
            fetchCategories();

            if (id) {
                fetchRecord();
            }
        }
    }, [id, isAuthenticated]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const record = { name, description, category, active };
        try {
            const user = JSON.parse(localStorage.getItem('user'));
            if (id) {
                await axios.put(`/api/records/${id}`, record, {
                    headers: { 'x-auth-token': user ? user.token : null }
                });
            } else {
                await axios.post(`/api/records`, record, {
                    headers: { 'x-auth-token': user ? user.token : null }
                });
            }
            navigate('/records');
        } catch (err) {
            console.error('Error saving the record', err);
        }
    };

    return (
        <div className="container">
            {!isAuthenticated ? (
                <div className="alert">
                    <p>Please log in to save changes.</p>
                    <button onClick={() => navigate('/login')} className="button">Login</button>
                </div>
            ) : (
                <>
                    <h2>{id ? 'Edit Record' : 'Create Record'}</h2>
                    <form onSubmit={handleSubmit}>
                        <div>
                            <label>Name</label>
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                            />
                        </div>
                        <div>
                            <label>Description</label>
                            <textarea
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                required
                            />
                        </div>
                        <div>
                            <label>Category</label>
                            <select
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                                required
                            >
                                <option value="">Select</option>
                                {categories.map((cat) => (
                                    <option key={cat._id} value={cat._id}>
                                        {cat.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label>Active</label>
                            <input
                                type="checkbox"
                                checked={active}
                                onChange={(e) => setActive(e.target.checked)}
                            />
                        </div>
                        <button type="submit">Save</button>
                    </form>
                </>
            )}
        </div>
    );
};

export default RecordForm;
