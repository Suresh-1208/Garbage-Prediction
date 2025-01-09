import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Details.css';

const Details = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate('/');
  };

  return (
    <div className="details-container">
      <div className="details-content">
        <h1>Project Overview</h1>
        <h2>Garbage Prediction Application</h2>
        <p>
          This web app classifies images using pre-trained models: CNN, denseNet, MobileNet,efficient. Users can upload an image, select a model, and view predictions along with accuracy.
        </p>
        <h3>Key Features:</h3>
        <ul>
          <li>Choose from four machine learning models.</li>
          <li>Upload images in various formats.</li>
          <li>View predictions and model accuracy.</li>
          <li>Graphically compare model performance.</li>
        </ul>
        <h3>Technologies:</h3>
        <ul>
          <li><strong>Frontend:</strong> React, Chart.js</li>
          <li><strong>Backend:</strong> Flask, TensorFlow</li>
          <li><strong>Models:</strong> CNN, denseNet, MobileNet,efficient</li>
        </ul>
        <h3>Contact and Support:</h3>
        <p>
          If you have any questions or need support, feel free to contact the development team at:
        </p>
        <ul>
          <li>
            <strong>Email:</strong> varshinishilins.22aid@kongu.edu, 
            sureshbabuk.22aid@kongu.edu, 
            jananisivakumar005@gmail.com
          </li>
          <li>
            <strong>GitHub:</strong>{' '}
            <a
              href="https://github.com/Suresh-1208/Garbage-Prediction"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub Repository
            </a>
          </li>
        </ul>
        <button className="back-button" onClick={handleBack}>
          Back to Home
        </button>
      </div>
    </div>
  );
};

export default Details;
