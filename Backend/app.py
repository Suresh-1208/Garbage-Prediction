from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib
from tensorflow.keras.preprocessing.image import load_img, img_to_array
import numpy as np
import os

# Suppress TensorFlow logs
os.environ['TF_CPP_MIN_LOG_LEVEL'] = '3'
os.environ['TF_ENABLE_ONEDNN_OPTS'] = '0'

app = Flask(__name__)

# Enable CORS for all routes
CORS(app)

# Load your trained models (saved as .pkl files)
models = {
    "cnn": joblib.load("models/cnn_model.pkl"),
    "efficient": joblib.load("models/efficientnet_model.pkl"),
    "mobileNet": joblib.load("models/mobilenet_model.pkl"),
    "denseNet": joblib.load("models/DenseNet_model.pkl"),
}

# Define class labels
class_labels = ['Cardboard', 'Glass', 'Metal', 'Paper', 'Plastic', 'Trash']

@app.route('/predict', methods=['POST'])
def predict():
    if 'file' not in request.files or 'model' not in request.form:
        return jsonify({"error": "File or model not provided"}), 400

    file = request.files['file']
    model_name = request.form['model']

    if file.filename == '':
        return jsonify({"error": "No selected file"}), 400

    if model_name not in models:
        return jsonify({"error": f"Model {model_name} not found"}), 400

    # Save the uploaded file temporarily
    filepath = os.path.join("temp", file.filename)
    os.makedirs("temp", exist_ok=True)
    file.save(filepath)

    try:
        # Set target size based on the model
        if model_name == "cnn":
            target_size = (150, 150)  # CNN expects input shape (150, 150, 3)
        elif model_name == "efficient":
            target_size = (224, 224)  # EfficientNet expects input shape (224, 224, 3)
        else:
            target_size = (224, 224)  # Other models use 224x224 by default

        # Preprocess the image
        img = load_img(filepath, target_size=target_size)  # Resize image
        img_array = img_to_array(img) / 255.0  # Normalize the image
        img_array = np.expand_dims(img_array, axis=0)  # Add batch dimension

        # Perform prediction
        model = models[model_name]
        predictions = model.predict(img_array)  # Predict based on the processed input
        predicted_class = class_labels[np.argmax(predictions)]  # Find the predicted class
        accuracy = float(np.max(predictions)) * 100  # Calculate the accuracy

        # Remove the temporary file
        os.remove(filepath)

        return jsonify({"prediction": predicted_class, "accuracy": accuracy})

    except Exception as e:
        return jsonify({"error": str(e)}), 500


if __name__ == '__main__':
    app.run(debug=True)
