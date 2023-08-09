import React, { useState, useEffect } from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
} from '@mui/material';
import Pagination from '@mui/material/Pagination';
import './style.css';
import { Link } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';

const API_KEY = 'BChFdP9eJ8HgXJ1wRaktCYG5EI1ns55KaW49bcj8';
const ITEMS_PER_PAGE = 15; // Adjust as needed

const NEOList = () => {
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [neos, setNEOs] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (startDate && endDate) {
            const newEndDate = new Date(startDate);
            newEndDate.setDate(newEndDate.getDate() + 6);
            const formattedEndDate = formatDate(newEndDate);

            fetchNEOs(startDate, formattedEndDate);
        }
    }, [startDate, endDate]);

    const formatDate = (date) => {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    const fetchNEOs = async (start, end) => {
        try {
            setIsLoading(true)
            const response = await fetch(
                `https://api.nasa.gov/neo/rest/v1/feed?start_date=${start}&end_date=${end}&api_key=${API_KEY}`
            );
            const data = await response.json();
            const neoData = data.near_earth_objects;
            const neoList = Object.values(neoData).flat();
            setNEOs(neoList);
        } catch (error) {
            console.error('Error fetching NEO list:', error);
        } finally {
            setIsLoading(false)
        }
    };

    const handlePageChange = (event, newPage) => {
        setCurrentPage(newPage);
    };
    const getDangerLevelClass = (neo) => {
        const avgLunarDistance = 384400; // Average Lunar Distance in km
        const closestDistance = neo.close_approach_data[0].miss_distance.kilometers;
        const dangerThreshold1 = avgLunarDistance * 0.5;
        const dangerThreshold2 = avgLunarDistance;

        if (closestDistance >= dangerThreshold2) {
            return 'green'; // NEO's closest distance is greater than or equal to LD
        } else if (closestDistance >= dangerThreshold1 && closestDistance < dangerThreshold2) {
            return 'orange'; // NEO's closest distance is between LD and half of LD
        } else {
            return 'red'; // NEO's closest distance is below half of LD
        }
    };
    const paginatedNEOs = neos.slice(
        (currentPage - 1) * ITEMS_PER_PAGE,
        currentPage * ITEMS_PER_PAGE
    );

    return (
        <div className="wrapper">
            <h2 className="oswald header-title">Near Earth Objects List</h2>
            <div className="date-container">
                <div>
                    <label className="oswald">Start Date: </label>
                    <input
                        type="date"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                    />
                </div>
                <div>
                    <label className="oswald">End Date: </label>
                    <input
                        type="date"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                    />
                </div>
            </div>
            <TableContainer className='table-container' component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell className="oswald">Name</TableCell>
                            <TableCell className="oswald">Estimated Diameter (m)</TableCell>
                            <TableCell className="oswald">Closest Approach Date</TableCell>
                            <TableCell className="oswald">Distance to Earth (km)</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {isLoading ? ( // Display loader if isLoading is true
                            <div className="loader-container">
                                <CircularProgress className="loader" />
                            </div>
                        ) : paginatedNEOs.length === 0 ? (
                            <p className="no-data-placeholder roboto text-placeholder">No data available for the selected date.</p>
                        ) : (
                            paginatedNEOs.map((neo) => (
                                <TableRow
                                    key={neo.id}
                                    className={getDangerLevelClass(neo)}
                                >
                                    <TableCell className="roboto">  {neo.name}</TableCell>
                                    <TableCell className="roboto">{neo.estimated_diameter.meters.estimated_diameter_min}</TableCell>
                                    <TableCell className="roboto">{neo.close_approach_data[0].close_approach_date_full}</TableCell>
                                    <TableCell className="roboto">{neo.close_approach_data[0].miss_distance.kilometers}</TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
            <Pagination className='pagination' count={Math.ceil(neos.length / ITEMS_PER_PAGE)} page={currentPage} onChange={handlePageChange} />
        </div>
    );
};

export default NEOList;
