// src/components/Login.js
import React, { useState } from 'react';
import axios from 'axios';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleUsernameChange = (e) => {
        setUsername(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleLogin = () => {
        axios.post('https://ted-yak-backend-57083191e68a.herokuapp.comapi/token/', {
            username,
            password,
        })
            .then(response => {
                // Save the access token to use in future requests
                const accessToken = response.data.access_token;
                localStorage.setItem('access_token', accessToken);

                // Redirect the user or perform other actions upon successful login
            })
            .catch(error => console.error('Error logging in:', error));
    };

    return (
        <div>
            <h2>Login</h2>
            <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={handleUsernameChange}
            />
            <br />
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={handlePasswordChange}
            />
            <br />
            <button onClick={handleLogin}>Login</button>
        </div>
    );
};

export default Login;
