import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ps_logo from '../../assets/ps_logo.png';
import axios from 'axios';
import './Login.css'; 
import jsCookie from 'js-cookie';

export default function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);

        try {
            console.log('Sending request to API with:', { username, password });
            const response = await axios.post('https://api-dev.sparquer.com/validate', {
                username,
                password,
            }, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            console.log('Received response:', response);
            if (response.status === 200) {
                const res = response.data; // Assuming response.data is already an object

                jsCookie.set('token', res.accessToken, { expires: 1 }); // Set the cookie to expire in 1 days
                jsCookie.set('user', JSON.stringify(res.user), { expires: 1 }); // Set the cookie to expire in 1 days
                jsCookie.set('role', 'SHO', { expires: 1 });
                navigate('/dashboard', { replace: true }); 
                // window.location.reload();              
            } else {
                throw new Error('Login failed');
            }
        } catch (error) {
            console.error('Error:', error);
            setError('Invalid username or password');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className='main'>
            <div className='container'>
                <div className='login'>
                    <h4>We are NettLINX Technology Pvt. Ltd.</h4>
                    <h1>MATERIAL MANAGEMENT SYSTEM</h1>
                    <p>With unwavering commitment and expertise, we create spaces that stand as a testament to our dedication and craftsmanship</p>
                </div>
                <div className='login-form'>
                    <div className='ps_logo'>
                        <img src={ps_logo} alt='PS Logo'/>
                    </div>
                    <form className='form-container' onSubmit={handleSubmit}>
                        <h1>Sign In</h1>
                        {error && <p className='error'>{error}</p>}
                        <div className='form-group'>
                            <label htmlFor='username'></label>
                            <input
                                type='text'
                                id='username'
                                name='username'
                                placeholder='User name'
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                        </div>
                        <div className='form-group'>
                            <label htmlFor='password'></label>
                            <input
                                type='password'
                                id='password'
                                name='password'
                                placeholder='Password'
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <p className='forgot-psw'>Forgot your password?</p>
                        <button type='submit' disabled={loading}>{loading ? 'Signing In...' : 'Sign In'}</button>
                    </form>
                </div>
            </div>
        </div>
    );
}
