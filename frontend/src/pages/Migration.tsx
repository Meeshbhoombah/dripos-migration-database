import React, { useState } from 'react';
import api from '../services/api';

const Migration = () => {
    const [formData, setFormData] = useState({ name: '', email: '', stripeId: '' });
    const [response, setResponse] = useState(null);
   
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value})
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        try {
            const res = await api.post('/api/migrate', formData);
            setResponse(res.data);
        } catch (err) {
            console.error('Migration error:', err);
        }
    };

    
    return (
        <div>
            <h1>Customer Data Migration</h1>
            <form onSubmit={handleSubmit}>
                <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Name" required />
                <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" required />
                <input type="text" name="stripeId" value={formData.stripeId} onChange={handleChange} placeholder="Stripe ID" required />
                <button type="submit">Migrate Data</button>
            </form>
        
            {response && <pre>{JSON.stringify(response, null, 2)}</pre>}
        </div>
    ) 
};


export default Migration;

