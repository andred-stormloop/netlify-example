// src/components/MessageList.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Message from './Message';
import CreateMessage from './CreateMessage';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp } from '@fortawesome/free-solid-svg-icons';

const MessageList = () => {
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        axios.get('https://ted-yak-backend-57083191e68a.herokuapp.com/api/messages/')
            .then(response => setMessages(response.data))
            .catch(error => console.error('Error fetching messages:', error));
    }, []);

    const handleNewMessage = (newMessage) => {
        setMessages([newMessage, ...messages]);
    };

    const handleUpvote = (id) => {
        axios.patch(`https://ted-yak-backend-57083191e68a.herokuapp.com/api/messages/${id}/upvote/`)
            .then(response => {
                const updatedMessages = messages.map(message => (
                    message.id === response.data.id ? response.data : message
                ));
                setMessages(updatedMessages);
            })
            .catch(error => console.error('Error upvoting message:', error));
    };

    const handleComment = (messageId, commentContent) => {
        axios.post(`https://ted-yak-backend-57083191e68a.herokuapp.com/api/messages/${messageId}/comments/`, {
            content: commentContent,
        })
            .then(response => {
                const updatedMessages = messages.map(message => (
                    message.id === response.data.id ? response.data : message
                ));
                setMessages(updatedMessages);
            })
            .catch(error => console.error('Error adding comment:', error));
    };

    return (
        <div>
            <CreateMessage onMessageCreated={handleNewMessage} />
            <div>
                {messages.map(message => 
                <Message key={message.id} message={message}>
                    <button className='upvote-button' onClick={() => handleUpvote(message.id)}><FontAwesomeIcon icon={faArrowUp} /></button>
                </Message>)}
            </div>
        </div>
    );
};

export default MessageList;
