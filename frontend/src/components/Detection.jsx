import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import './Detection.css';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const ImageUpload = () => {
    const [image, setImage] = useState(null);
    const [model, setModel] = useState('cnn');
    const [prediction, setPrediction] = useState(null);
    const [accuracy, setAccuracy] = useState(null);
    const [error, setError] = useState(null);
    const [accuracies, setAccuracies] = useState({
        cnn: null,
        denseNet : null,
        mobileNet: null,
        efficient: null,
    });

    const navigate = useNavigate();  // useNavigate hook for navigation

    const handleImageChange = (e) => {
        setImage(e.target.files[0]);
    };

    const handleModelChange = (e) => {
        setModel(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!image) {
            setError("Please upload an image.");
            return;
        }

        setError(null);
        const formData = new FormData();
        formData.append('file', image);
        formData.append('model', model);

        try {
            const response = await axios.post('https://garbage-prediction-1.onrender.com/predict', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            const newAccuracies = { ...accuracies, [model]: response.data.accuracy };

            setPrediction(response.data.prediction);
            setAccuracy(response.data.accuracy);
            setAccuracies(newAccuracies);
        } catch (error) {
            setError("An error occurred: " + (error.response?.data?.error || error.message));
        }
    };

    const chartData = {
        labels: ['CNN', 'Densenet', 'MobileNet','efficientNet'],
        datasets: [
            {
                label: 'Model Accuracy (%)',
                data: [accuracies.cnn,accuracies.denseNet, accuracies.mobileNet,accuracies.efficient],
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 1,
            },
        ],
    };

    const handleShowGraph = () => {
        navigate('/graph', { state: { chartData } });  // Passing chartData to the graph page
    };

    return (
        <div className="container">
            <h1>Garbage Classification</h1>
            <h3>Select the Model</h3>
            <div>
                <button className="model-button" onClick={() => setModel('cnn')}>CNN</button>
                <button className="model-button" onClick={() => setModel('denseNet')}>denseNet</button>           
                <button className="model-button" onClick={() => setModel('mobileNet')}>MobileNet</button>
                <button className="model-button" onClick={() => setModel('efficient')}>efficientNet</button>
            </div>
    
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Select Image:</label>
                    <input type="file" onChange={handleImageChange} />
                </div>
                <div>
                    <label>Select Model:</label>
                    <select 
                      onChange={handleModelChange} 
                      value={model} 
                      className='select' 
                      style={{ backgroundColor: 'White', color: 'black' }} >
                     <option value="cnn">CNN</option>
                     <option value="denseNet">denseNet</option>
                     <option value="mobileNet">MobileNet</option>
                     <option value="efficient">efficientNet</option>
                  </select>

                </div>
                <button type="submit">Submit</button>
            </form>
    
            {prediction && (
                <div className="prediction-result">
                    <h2>Prediction: {prediction}</h2>
                    <h3>Accuracy: {accuracy}%</h3>
                </div>
            )}
    
            {error && <div className="error-message">{error}</div>}
    
            <button className="graph-button" onClick={handleShowGraph}>Show Graph</button>
        </div>
    );    
}

export default ImageUpload;
