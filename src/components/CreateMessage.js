// src/components/CreateMessage.js
import React, { useState } from 'react';
import axios from 'axios';
import '../styles.css'; // Import the styles

const CreateMessage = ({ onMessageCreated }) => {
    const [content, setContent] = useState('');

    // Add state for latitude and longitude
    const [latitude, setLatitude] = useState(null);
    const [longitude, setLongitude] = useState(null);

    // Assuming you have a function to get the user's location
    const getUserLocation = () => {
        // Example using the browser's geolocation API
        navigator.geolocation.getCurrentPosition(
            position => {
                setLatitude(position.coords.latitude);
                setLongitude(position.coords.longitude);
            },
            error => console.error('Error getting location:', error)
        );
    };

    const handleContentChange = (e) => {
        setContent(e.target.value);
    };

    const handleCreateMessage = () => {
        // Basic validation
        if (content.trim() === '') {
            alert('Please enter a message.');
            return;
        }

        // Make sure latitude and longitude are set before making the request
        if (latitude === null || longitude === null) {
            alert('Location information is missing.');
            return;
        }

        // Make API request to create a new message
        axios.post('https://ted-yak-backend-57083191e68a.herokuapp.com/api/messages/', {
            content,
            latitude,
            longitude,
        })
            .then(response => {
                onMessageCreated(response.data);
                setContent('');
            })
            .catch(error => console.error('Error creating message:', error));
    };

    return (
        <div  className="create-message">
            <textarea className='textarea'
                rows="4"
                placeholder="Enter your message..."
                value={content}
                onChange={handleContentChange}
            ></textarea>
            <br />
            {/* Add a button to get user's location */}
            <button onClick={getUserLocation}>Get Location</button>
            <button onClick={handleCreateMessage}>Post Message</button>
        </div>
    );
};

export default CreateMessage;
