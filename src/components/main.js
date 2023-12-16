// src/App.js
import React from 'react';
import MessageList from './MessageList';
import CreateMessage from './CreateMessage';
import '../styles.css'; // Import the styles



function Main() {
    return (
        <div className="app-container">
            <h1>Teddy-Yak</h1>
            <div className="message-list">
                <MessageList />
            </div>
        </div>
    );
}

export default Main;
