import React, { useState, useEffect } from 'react';
import './style.css';
import CircularProgress from '@mui/material/CircularProgress';

const API_KEY = 'BChFdP9eJ8HgXJ1wRaktCYG5EI1ns55KaW49bcj8';

const AstronomyPictureOfTheDay = () => {
    const [apod, setAPOD] = useState(null);

    const fetchRandomAPOD = async () => {
        try {
            const response = await fetch(
                `https://api.nasa.gov/planetary/apod?api_key=${API_KEY}`
            );
            const data = await response.json();
            setAPOD(data);
        } catch (error) {
            console.error('Error fetching APOD:', error);
        }
    };

    useEffect(() => {
        fetchRandomAPOD();

        // Update APOD every 60 seconds
        const interval = setInterval(fetchRandomAPOD, 60000);

        return () => {
            clearInterval(interval);
        };
    }, []);

    if (!apod) {
        return <div className="loading-container">
            <CircularProgress />
        </div>;
    }

    return (
        <div className="apod-container">
            <img
                src={apod.url}
                alt={apod.title}
                className="apod-image"
            />
            <div className="apod-details">
                <h2 className="oswald">{apod.title}</h2>
                <p className="roboto">{apod.explanation}</p>
            </div>
        </div>
    );
};

export default AstronomyPictureOfTheDay;



