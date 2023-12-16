// src/App.js
import React from 'react';
import MessageList from './components/MessageList';
import CreateMessage from './components/CreateMessage';
import './styles.css'; // Import the styles



function App() {
    return (
        <div className="app-container">
            <h1>Teddy-Yak</h1>
            <div className="message-list">
                <MessageList />
            </div>
        </div>
    );
}

export default App;
