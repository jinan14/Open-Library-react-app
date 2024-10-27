

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const navigate = useNavigate();
    
    // State for inputs and error message
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = () => {
        // Reset error message
        setError('');

        // Validate inputs
        if (!username || !password) {
            setError('Please enter both username and password.');
            return;
        }
        if (password.length < 5) {
            setError('Password must be at least 5 characters long.');
            return;
        }

        // Handle successful login logic
        navigate('/home');
    };

    return (
        <div className="flex items-center w-full justify-between h-screen">
            <div className='w-[60%]'>
                <img className='object-cover w-full h-full' src="/book.jpeg" alt="" />
            </div>
            <div className='w-[40%] h-full m-auto flex flex-col gap-3 p-6 items-center justify-center'>
                <div className='w-full flex flex-col gap-3 items-center justify-center'>
                    <h1 className="text-4xl font-semibold mb-2">Login Page</h1>
                    <div className='flex flex-col'>
                        <label htmlFor="username" className='mb-2'>Name</label>
                        <input 
                            id='username' 
                            type="text" 
                            placeholder="Username" 
                            className="border p-2 mb-6" 
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                        <label htmlFor="password" className='mb-2'>Enter Password</label>
                        <input 
                            id='password' 
                            type="password" 
                            placeholder='Password' 
                            className="border p-2 mb-2" 
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    {error && <p className="text-red-500 mb-2">{error}</p>} {/* Display error message */}
                    <button onClick={handleLogin} className="bg-slate-500 text-white p-2 w-32 rounded-3xl hover:bg-cyan-800 focus:ring-4">
                        Login
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Login;