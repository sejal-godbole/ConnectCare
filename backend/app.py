from flask import Flask, request, jsonify
from pymongo import MongoClient
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# MongoDB setup
client = MongoClient("mongodb+srv://srinidhi762005:nidhi2005@cluster0.kllhsyp.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
db = client["geo_healthcare"]
collection = db["doctors"]

@app.route("/get_doctor_by_place")
def get_doctor_by_place():
    place = request.args.get("place")
    if not place:
        return jsonify({"error": "Missing place parameter"}), 400
    
    doc = collection.find_one({"formatted": {"$regex": place, "$options": "i"}})
    
    if not doc:
        return jsonify({"error": "Doctor not found"}), 404

    # Only return selected fields
    result = {
        "name": doc.get("name", "Doctor"),
        "specialization": "Dentist",  # or fetch from doc if stored
        "location": doc.get("formatted"),
        "experience": "10+ years",  # hardcoded or derive from another field
        "photo": "/default-doctor.jpg",  # static or dynamic
        "languages": ["English"],
        "about": "Experienced healthcare provider listed via Geoapify."
    }
    return jsonify(result)
