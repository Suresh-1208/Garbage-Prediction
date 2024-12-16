import React from 'react';
import { useNavigate } from 'react-router-dom';  // Import useNavigate
import './Home.css'; 

const Home = () => {
    const navigate = useNavigate();  // useNavigate hook for navigation

    // Function to navigate to the corresponding pages
    const handleNavigation = (path) => {
        navigate(path);  // Use navigate instead of history.push
    };

    return (
        <div className="container">
            <h1 >Welcome to the Garbage Prediction website</h1>
            
            <div className="button-container">
                <button 
                    className="button" 
                    onClick={() => handleNavigation('/detection')}
                >
                    Detection
                </button>
    
                <button 
                    className="button" 
                    onClick={() => handleNavigation('/details')}
                >
                    Details
                </button>
    
                <button 
                    className="button" 
                    onClick={() => handleNavigation('/authors')}
                >
                    Authors
                </button>
            </div>
    
            <p className="description">
                Use the buttons above to navigate through the website and explore its features.
            </p>
        </div>
    );
    
};

export default Home;
 