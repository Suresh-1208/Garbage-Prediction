// import React, { useState } from 'react';
// import axios from 'axios';
// import { Bar } from 'react-chartjs-2';
// import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

// ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

// const ImageUpload = () => {
//     const [image, setImage] = useState(null);
//     const [model, setModel] = useState('cnn');
//     const [prediction, setPrediction] = useState(null);
//     const [accuracy, setAccuracy] = useState(null);
//     const [error, setError] = useState(null);
//     const [accuracies, setAccuracies] = useState({
//         cnn: null,
//         vgg16: null,
//         resnet50: null,
//         mobileNet: null
//     });
//     const [showGraph, setShowGraph] = useState(false);  // To toggle chart display

//     const handleImageChange = (e) => {
//         setImage(e.target.files[0]);
//     };

//     const handleModelChange = (e) => {
//         setModel(e.target.value);
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();

//         if (!image) {
//             setError("Please upload an image.");
//             return;
//         }

//         setError(null);
//         const formData = new FormData();
//         formData.append('file', image);
//         formData.append('model', model);

//         try {
//             const response = await axios.post('http://127.0.0.1:5000/predict', formData, {
//                 headers: {
//                     'Content-Type': 'multipart/form-data',
//                 },
//             });

//             const newAccuracies = { ...accuracies, [model]: response.data.accuracy };

//             setPrediction(response.data.prediction);
//             setAccuracy(response.data.accuracy);
//             setAccuracies(newAccuracies);
//         } catch (error) {
//             setError("An error occurred: " + (error.response?.data?.error || error.message));
//         }
//     };

//     // Prepare data for the chart
//     const chartData = {
//         labels: ['CNN', 'VGG16', 'ResNet50', 'MobileNet'],
//         datasets: [
//             {
//                 label: 'Model Accuracy (%)',
//                 data: [accuracies.cnn, accuracies.vgg16, accuracies.resnet50, accuracies.mobileNet],
//                 backgroundColor: 'rgba(255, 99, 132, 0.2)',  // Color of bars
//                 borderColor: 'rgba(255, 99, 132, 1)',  // Border color of bars
//                 borderWidth: 1,
//             },
//         ],
//     };

//     return (
//         <div>
//             <h1>Model Image Prediction</h1>

//             {/* Model Selection Buttons */}
//             <div>
//                 <button onClick={() => setModel('cnn')}>CNN</button>
//                 <button onClick={() => setModel('vgg16')}>VGG16</button>
//                 <button onClick={() => setModel('resnet50')}>ResNet50</button>
//                 <button onClick={() => setModel('mobileNet')}>MobileNet</button>
//             </div>

//             {/* Image Upload Form */}
//             <form onSubmit={handleSubmit}>
//                 <div>
//                     <label>Select Image:</label>
//                     <input type="file" onChange={handleImageChange} />
//                 </div>

//                 {/* Model Selection Dropdown */}
//                 <div>
//                     <label>Select Model:</label>
//                     <select onChange={handleModelChange} value={model}>
//                         <option value="cnn">CNN</option>
//                         <option value="vgg16">VGG16</option>
//                         <option value="resnet50">ResNet50</option>
//                         <option value="mobileNet">MobileNet</option>
//                     </select>
//                 </div>

//                 <button type="submit">Submit</button>
//             </form>

//             {/* Display Prediction */}
//             {prediction && (
//                 <div>
//                     <h2>Prediction: {prediction}</h2>
//                     <h3>Accuracy: {accuracy}%</h3>
//                 </div>
//             )}

//             {/* Display Error */}
//             {error && <div style={{ color: 'red' }}>{error}</div>}

//             {/* Button to Toggle Chart */}
//             <button onClick={() => setShowGraph(!showGraph)}>
//                 {showGraph ? 'Hide Graph' : 'Show Graph'}
//             </button>

//             {/* Display Accuracy Chart */}
//             {showGraph && (accuracies.cnn !== null || accuracies.vgg16 !== null || accuracies.resnet50 !== null || accuracies.mobileNet !== null) && (
//                 <div style={{ width: '50%', height: '400px' }}> {/* Resize chart */}
//                     <h3>Model Accuracy Comparison</h3>
//                     <Bar data={chartData} options={{ responsive: true, maintainAspectRatio: false }} />
//                 </div>
//             )}
//         </div>
//     );
// };

// export default ImageUpload;

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Use Routes instead of Switch
import Home from './components/Home';
import Detection from './components/Detection';
import Details from './components/Details';
import Authors from './components/Authors';
import Graph from './components/Graph';

const App = () => {
  return (
    <Router>
      <Routes>  {/* Replace Switch with Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/detection" element={<Detection />} />
        <Route path="/details" element={<Details />} />
        <Route path="/authors" element={<Authors />} />
        <Route path="/graph" element={<Graph />} />
      </Routes>
    </Router>
  );
};

export default App;

