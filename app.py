from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib

app = Flask(__name__)
CORS(app) 

print("[INFO] Loading Traitfusion AI Model 'traitfusion_model.pkl'...")
model = joblib.load('traitfusion_model.pkl')
print("[SUCCESS] Brain loaded! Server is ready to predict.")

@app.route('/predict', methods=['POST'])
def predict():
    data = request.json
    user_text = data.get('text', '')
    
    if not user_text:
        return jsonify({'error': 'Please provide some text!'}), 400
        
    prediction = model.predict([user_text])[0]
    
    result = {
        'Openness': round(prediction[0], 2),
        'Conscientiousness': round(prediction[1], 2),
        'Extraversion': round(prediction[2], 2),
        'Agreeableness': round(prediction[3], 2),
        'Neuroticism': round(prediction[4], 2)
    }
    
    return jsonify(result)

if __name__ == '__main__':
    print("[INFO] Starting the Server on Port 5000...")
    app.run(debug=True, port=5000)