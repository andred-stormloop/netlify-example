// src/components/Message.js
import React, { useState }  from 'react';
import '../styles.css'; // Import the styles


const Message = ({ message , children }) => (

   

    <div className ="message">
        <div className='message-content'>
        <p>{message.content}</p>
        <p>{message.timestamp}</p>
        <p>Upvotes: {message.upvotes}</p>
        </div>
        {children}
    </div>
);

export default Message;
