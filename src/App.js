// src/App.js
import React from 'react';
import MessageList from './components/MessageList';
import CreateMessage from './components/CreateMessage';
import Login from './components/Login';
import Main from './components/main';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom'; // Make sure to import Routes
import './styles.css'; // Import the styles



function App() {
    return(
    <main>
        <Router>
            <div>
            <Routes>
                <Route path ="/login" element={<Login />}></Route>
                <Route path='/' element={<Main />}></Route>
            </Routes>
            </div>
        </Router>
     </main>
    )
}

export default App;
