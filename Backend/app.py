# from flask import Flask, request, jsonify
# from flask_cors import CORS
# import joblib
# from tensorflow.keras.preprocessing.image import load_img, img_to_array
# import numpy as np
# import os

# os.environ['TF_CPP_MIN_LOG_LEVEL'] = '3'
# os.environ['TF_ENABLE_ONEDNN_OPTS'] = '0'

# app = Flask(__name__)

# CORS(app)

# models = {
#     "cnn": joblib.load("models/cnn_model.pkl"),
#     "efficient": joblib.load("models/efficientnet_model.pkl"),
#     "mobileNet": joblib.load("models/mobilenet_model.pkl"),
#     "denseNet": joblib.load("models/DenseNet_model.pkl"),
# }

# class_labels = ['Cardboard', 'Glass', 'Metal', 'Paper', 'Plastic', 'Trash']

# @app.route('/predict', methods=['POST'])
# def predict():
#     if 'file' not in request.files or 'model' not in request.form:
#         return jsonify({"error": "File or model not provided"}), 400

#     file = request.files['file']
#     model_name = request.form['model']

#     if file.filename == '':
#         return jsonify({"error": "No selected file"}), 400

#     if model_name not in models:
#         return jsonify({"error": f"Model {model_name} not found"}), 400

#     filepath = os.path.join("temp", file.filename)
#     os.makedirs("temp", exist_ok=True)
#     file.save(filepath)

#     try:
#         if model_name == "cnn":
#             target_size = (150, 150)  
#         elif model_name == "efficient":
#             target_size = (224, 224)  
#         else:
#             target_size = (224, 224)  

       
#         img = load_img(filepath, target_size=target_size)  
#         img_array = img_to_array(img) / 255.0  
#         img_array = np.expand_dims(img_array, axis=0)  

        
#         model = models[model_name]
#         predictions = model.predict(img_array)  
#         predicted_class = class_labels[np.argmax(predictions)]  
#         accuracy = float(np.max(predictions)) * 100 
        
#         os.remove(filepath)

#         return jsonify({"prediction": predicted_class, "accuracy": accuracy})

#     except Exception as e:
#         return jsonify({"error": str(e)}), 500


# if __name__ == '__main__':
#     app.run(debug=True)

from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib
from tensorflow.keras.preprocessing.image import load_img, img_to_array
import numpy as np
import os

# Suppress TensorFlow logs for cleaner console output
os.environ['TF_CPP_MIN_LOG_LEVEL'] = '3'
os.environ['TF_ENABLE_ONEDNN_OPTS'] = '0'

# Initialize Flask app
app = Flask(__name__)
CORS(app)

# Load all models into a dictionary
try:
    models = {
        "cnn": joblib.load("models/cnn_model.pkl"),
        "efficient": joblib.load("models/efficientnet_model.pkl"),
        "mobileNet": joblib.load("models/mobilenet_model.pkl"),
        "denseNet": joblib.load("models/DenseNet_model.pkl"),
    }
except Exception as e:
    print(f"Error loading models: {e}")
    models = {}

# Define the class labels
class_labels = ['Cardboard', 'Glass', 'Metal', 'Paper', 'Plastic', 'Trash']

# Endpoint to predict the image class
@app.route('/predict', methods=['POST'])
def predict():
    try:
        # Check if file and model name are provided
        if 'file' not in request.files or 'model' not in request.form:
            return jsonify({"error": "File or model not provided"}), 400

        file = request.files['file']
        model_name = request.form['model']

        if file.filename == '':
            return jsonify({"error": "No selected file"}), 400

        if model_name not in models:
            return jsonify({"error": f"Model {model_name} not found"}), 400

        # Save the uploaded file temporarily
        temp_dir = "temp"
        os.makedirs(temp_dir, exist_ok=True)
        filepath = os.path.join(temp_dir, file.filename)
        file.save(filepath)

        # Resize image based on model type
        if model_name == "cnn":
            target_size = (150, 150)
        else:
            target_size = (224, 224)

        # Preprocess the image
        img = load_img(filepath, target_size=target_size)
        img_array = img_to_array(img) / 255.0
        img_array = np.expand_dims(img_array, axis=0)

        # Get predictions
        model = models[model_name]
        predictions = model.predict(img_array)
        predicted_class = class_labels[np.argmax(predictions)]
        accuracy = float(np.max(predictions)) * 100

        # Cleanup: Remove the temporary file
        os.remove(filepath)

        # Return prediction result
        return jsonify({"prediction": predicted_class, "accuracy": accuracy})

    except Exception as e:
        return jsonify({"error": str(e)}), 500


if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))  # Bind to PORT environment variable for deployment
    app.run(host='0.0.0.0', port=port, debug=True)
