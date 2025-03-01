# from flask import Flask, request, jsonify
# from flask_cors import CORS
# import joblib
# from tensorflow.keras.preprocessing.image import load_img, img_to_array
# import numpy as np
# from tensorflow.keras.models import Sequential
# import os

# # Suppress TensorFlow logs for cleaner console output
# os.environ['TF_CPP_MIN_LOG_LEVEL'] = '3'
# os.environ['TF_ENABLE_ONEDNN_OPTS'] = '0'

# # Initialize Flask app
# app = Flask(__name__)
# CORS(app)

# # Load all models into a dictionary
# models = {}
# model_paths = {
#     "cnn": "cnn_model.pkl",
#     "efficient": "efficientnet_model.pkl",
#     "mobileNet": "mobilenet_model.pkl",
#     "denseNet": "DenseNet_model.pkl",
# }

# # Attempt to load models and handle errors
# for model_name, path in model_paths.items():
#     try:
#         models[model_name] = joblib.load(path)
#         print(f"Loaded {model_name} model successfully.")
#     except Exception as e:
#         print(f"Error loading {model_name} model: {e}")

# # Define the class labels
# class_labels = ['Cardboard', 'Glass', 'Metal', 'Paper', 'Plastic', 'Trash']

# # Prediction endpoint
# @app.route('/predict', methods=['POST'])
# def predict():
#     try:
#         # Validate request input
#         if 'file' not in request.files or 'model' not in request.form:
#             return jsonify({"error": "File or model not provided"}), 400

#         file = request.files['file']
#         model_name = request.form['model']

#         if file.filename == '':
#             return jsonify({"error": "No selected file"}), 400

#         if model_name not in models:
#             return jsonify({"error": f"Model {model_name} not found"}), 400

#         # Save the uploaded file temporarily
#         temp_dir = "temp"
#         os.makedirs(temp_dir, exist_ok=True)
#         filepath = os.path.join(temp_dir, file.filename)
#         file.save(filepath)

#         # Resize image based on model type
#         target_size = (150, 150) if model_name == "cnn" else (224, 224)

#         # Preprocess the image
#         img = load_img(filepath, target_size=target_size)
#         img_array = img_to_array(img) / 255.0
#         img_array = np.expand_dims(img_array, axis=0)

#         # Get predictions
#         model = models[model_name]
#         predictions = model.predict(img_array)
#         predicted_class = class_labels[np.argmax(predictions)]
#         accuracy = float(np.max(predictions)) * 100

#         # Cleanup: Remove the temporary file safely
#         if os.path.exists(filepath):
#             os.remove(filepath)

#         # Return prediction result
#         return jsonify({"prediction": predicted_class, "accuracy": accuracy})

#     except Exception as e:
#         return jsonify({"error": str(e)}), 500

# # Main entry point
# if __name__ == '__main__':
#     port = int(os.environ.get('PORT', 5000))  # Bind to PORT provided by Render
#     app.run(host='0.0.0.0', port=port, debug=False)


from flask import Flask, request, jsonify
from flask_cors import CORS
import numpy as np
import os
import tensorflow as tf
from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing.image import load_img, img_to_array

# Suppress TensorFlow warnings
os.environ['TF_CPP_MIN_LOG_LEVEL'] = '3'
os.environ['TF_ENABLE_ONEDNN_OPTS'] = '0'

# Initialize Flask app
app = Flask(__name__)
CORS(app)

# Load models into a dictionary
models = {}
model_paths = {
    "cnn": "Cnn_model.keras",
    "efficient": "efficitent.keras",
    "mobileNet": "mobilenet.keras",
    "denseNet": "DenseNet.keras",
}

# Attempt to load models and handle errors
for model_name, path in model_paths.items():
    try:
        if os.path.exists(path):
            models[model_name] = load_model(path)
            print(f"Loaded {model_name} model successfully.")
        else:
            print(f"Model file {path} not found. Skipping {model_name}.")
    except Exception as e:
        print(f"Error loading {model_name} model: {e}")

# Define the class labels
class_labels = ['Cardboard', 'Glass', 'Metal', 'Paper', 'Plastic', 'Trash']

# Prediction endpoint
@app.route('/predict', methods=['POST'])
def predict():
    try:
        # Validate request input
        if 'file' not in request.files or 'model' not in request.form:
            return jsonify({"error": "File or model not provided"}), 400

        file = request.files['file']
        model_name = request.form['model']

        if file.filename == '':
            return jsonify({"error": "No selected file"}), 400

        if model_name not in models:
            return jsonify({"error": f"Model '{model_name}' not found or failed to load"}), 400

        # Save the uploaded file temporarily
        temp_dir = "temp"
        os.makedirs(temp_dir, exist_ok=True)
        filepath = os.path.join(temp_dir, file.filename)
        file.save(filepath)

        # Resize image based on model type
        target_size = (150, 150) if model_name == "cnn" else (224, 224)

        # Preprocess the image
        img = load_img(filepath, target_size=target_size)
        img_array = img_to_array(img) / 255.0
        img_array = np.expand_dims(img_array, axis=0)

        # Get predictions
        model = models[model_name]
        predictions = model.predict(img_array)
        predicted_class = class_labels[np.argmax(predictions)]
        accuracy = float(np.max(predictions)) * 100

        # Cleanup: Remove the temporary file safely
        os.remove(filepath)

        # Return prediction result
        return jsonify({"prediction": predicted_class, "accuracy": accuracy})

    except Exception as e:
        return jsonify({"error": str(e)}), 500

# Main entry point
if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))  # Bind to PORT provided by Render
    app.run(host='0.0.0.0', port=port, debug=False)
