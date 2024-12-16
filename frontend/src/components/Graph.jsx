import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Bar } from 'react-chartjs-2';
import './Graph.css'; // Import CSS file for styling
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Graph = () => {
    const location = useLocation(); // Retrieve passed state
    const navigate = useNavigate(); // Navigate programmatically
    const chartData = location.state?.chartData; // Extract chart data from state

    // Handle back button click
    const handleBack = () => {
        navigate(-1); // Go back to the previous page
    };

    return (
        <div className="chart-container">
            <h1>Model Accuracy Comparison</h1>

            {chartData ? (
                <div>
                    <Bar
                        data={chartData}
                        options={{
                            responsive: true,
                            maintainAspectRatio: false,
                            plugins: {
                                legend: {
                                    position: 'top',
                                    labels: {
                                        color: '#ffffff', // White legend text
                                    },
                                },
                                title: {
                                    display: true,
                                    text: 'Accuracy of Models',
                                    color: '#f9c74f', // Mustard yellow title
                                    font: {
                                        size: 18,
                                    },
                                },
                            },
                            scales: {
                                x: {
                                    ticks: {
                                        color: 'black', // White x-axis labels
                                    },
                                },
                                y: {
                                    ticks: {
                                        color: 'black', // White y-axis labels
                                    },
                                },
                            },
                        }}
                    />
                </div>
            ) : (
                <p>No chart data available</p>
            )}

            <button onClick={handleBack}>Back</button>
        </div>
    );
};

export default Graph;
