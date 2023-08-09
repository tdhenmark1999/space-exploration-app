import React, { useState, useEffect } from 'react';
import Modal from './Modal';
import './style.css';
import CircularProgress from '@mui/material/CircularProgress';
import Pagination from '@mui/material/Pagination';

const YOUR_API_KEY = 'BChFdP9eJ8HgXJ1wRaktCYG5EI1ns55KaW49bcj8';
const PHOTOS_PER_PAGE = 30; // Adjust the number of photos per page as needed

const MarsRoverPhotos = () => {
    const [roverPhotos, setRoverPhotos] = useState([]);
    const [selectedPhoto, setSelectedPhoto] = useState(null);
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [isLoading, setIsLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        const fetchRoverPhotos = async () => {
            try {
                setIsLoading(true);
                const formattedDate = formatDate(selectedDate);
                const response = await fetch(`https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?earth_date=${formattedDate}&api_key=${YOUR_API_KEY}`);
                const data = await response.json();
                setRoverPhotos(data.photos);

            } catch (error) {
                console.error('Error fetching rover photos:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchRoverPhotos();
    }, [selectedDate]);

    const formatDate = (date) => {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    const handleThumbnailClick = (photo) => {
        setSelectedPhoto(photo);
    };

    const handleCloseModal = () => {
        setSelectedPhoto(null);
    };

    const handlePageChange = (event, newPage) => {
        setCurrentPage(newPage);
    };

    const startIndex = (currentPage - 1) * PHOTOS_PER_PAGE;
    const endIndex = startIndex + PHOTOS_PER_PAGE;
    const visiblePhotos = roverPhotos.slice(startIndex, endIndex);

    return (
        <div className="wrapper">
            <h2 className="oswald header-title">Mars Rover Photos</h2>
            <input
                type="date"
                value={formatDate(selectedDate)}
                onChange={(e) => setSelectedDate(new Date(e.target.value))}
            />
            <div className="photo-list">
                {isLoading ? (
                    <CircularProgress className="loader" />
                ) : roverPhotos.length === 0 ? (
                    <p className="no-data-placeholder roboto">No rover photos available for the selected date.</p>
                ) : (
                    visiblePhotos.map(photo => (
                        <div
                            key={photo.id}
                            className="photo thumbnail"
                            onClick={() => handleThumbnailClick(photo)}
                        >
                            <img src={photo.img_src} alt={`Rover Curiosity on Mars`} />
                        </div>
                    ))
                )}
            </div>
            {roverPhotos.length !== 0 && (
                <Pagination
                    count={Math.ceil(roverPhotos.length / PHOTOS_PER_PAGE)}
                    page={currentPage}
                    onChange={handlePageChange}
                    className="pagination"
                />
            )}

            {selectedPhoto && (
                <Modal onClose={handleCloseModal}>
                    <img src={selectedPhoto.img_src} alt={`Rover Curiosity on Mars`} />
                </Modal>
            )}
        </div>
    );
};

export default MarsRoverPhotos;
