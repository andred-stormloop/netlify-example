// src/components/MessageList.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Message from './Message';
import CreateMessage from './CreateMessage';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
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

    const fetchMessages = () => {
        axios.get('https://ted-yak-backend-57083191e68a.herokuapp.com/api/messages/')
            .then(response => {
                setMessages(response.data);
            })
            .catch(error => {
                console.error('Error fetching messages:', error);
            });
    };

    const handleDelete = (messageId) => {
        // Add a confirmation dialog or any other logic based on your requirements
        if (window.confirm('Are you sure you want to delete this message?')) {
            axios.delete(`https://ted-yak-backend-57083191e68a.herokuapp.com/api/messages/${messageId}/delete/`)
                .then(response => {
                    // Handle success, e.g., refresh the message list
                    console.log(response.data);
                    fetchMessages();
                })
                .catch(error => {
                    // Handle error
                    console.error('Error deleting message:', error);
                });
        }
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
                    <button onClick={() => handleDelete(message.id)} className="delete-button">
                    <FontAwesomeIcon icon={faTimes}></FontAwesomeIcon>
                </button>
                </Message>)}
                
            </div>
        </div>
    );
};

export default MessageList;
