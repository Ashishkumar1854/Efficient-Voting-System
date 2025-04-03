from flask import Flask, request, jsonify
import cv2
import numpy as np
import face_recognition

app = Flask(__name__)

@app.route('/detect', methods=['POST'])
def detect_face():
    image = request.files['image'].read()
    npimg = np.frombuffer(image, np.uint8)
    img = cv2.imdecode(npimg, cv2.IMREAD_COLOR)

    faces = face_recognition.face_locations(img)
    return jsonify({"message": "Face detected" if faces else "No face detected"})

if __name__ == '__main__':
    app.run(debug=True, port=5002) # Changed to 5002 to avoid conflict

