import React, { useState } from 'react';
import axios from 'axios';

const Register = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/register', {
                email,
                password
            });
            alert(response.data.message);
        } catch (error) {
            console.error(error);
            alert('×¢²áÊ§°Ü');
        }
    };

    return (
        <div>
            <h2>×¢²á</h2>
            <form onSubmit={handleSubmit}>
                <label>Email:</label>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                <label>Password:</label>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                <button type="submit">×¢²á</button>
            </form>
        </div>
    );
};

export default Register;
