import requests
from pymongo import MongoClient

# --- CONFIG ---
API_KEY = "7ae563c90ecd437f9a9760c15ab9470e"  # Replace with your Geoapify key
CATEGORY = 'healthcare'
LIMIT = 20

MONGO_URI = "mongodb+srv://srinidhi762005:nidhi2005@cluster0.kllhsyp.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
DB_NAME = "geo_healthcare"
COLLECTION_NAME = "doctors"

# --- Connect to MongoDB ---
try:
    client = MongoClient(MONGO_URI)
    db = client[DB_NAME]
    collection = db[COLLECTION_NAME]
    print("✅ Connected to MongoDB")
except Exception as e:
    print(f"❌ MongoDB connection error: {e}")
    exit()

# --- Geocoding Function ---
def get_coordinates(location):
    geocode_url = "https://api.geoapify.com/v1/geocode/search"
    params = {
        "text": location,
        "apiKey": API_KEY
    }
    try:
        response = requests.get(geocode_url, params=params)
        response.raise_for_status()
        data = response.json()
        features = data.get("features", [])
        if features:
            coords = features[0]["geometry"]["coordinates"]
            return coords[0], coords[1]  # lon, lat
    except Exception as e:
        print(f"❗ Error during geocoding: {e}")
    return None, None

# --- Doctor Search + Insert ---
def find_doctors(location):
    lon, lat = get_coordinates(location)
    if not lon or not lat:
        print("❗ Could not geocode location.")
        return []

    print(f"📍 Coordinates for {location}: {lat}, {lon}")
    
    url = "https://api.geoapify.com/v2/places"
    params = {
        "categories": CATEGORY,
        "filter": f"circle:{lon},{lat},10000",  # 10km radius
        "limit": LIMIT,
        "apiKey": API_KEY
    }

    try:
        response = requests.get(url, params=params)
        response.raise_for_status()
        places = response.json().get("features", [])
        
        results = []
        for place in places:
            props = place["properties"]
            doc = {
                "name": props.get("name"),
                "street": props.get("street"),
                "city": props.get("city"),
                "postcode": props.get("postcode"),
                "country": props.get("country"),
                "lat": place["geometry"]["coordinates"][1],
                "lon": place["geometry"]["coordinates"][0],
                "formatted": props.get("formatted"),
                "website": props.get("website"),
                "phone": props.get("phone")
            }
            collection.insert_one(doc)
            results.append(doc)
        return results
    except Exception as e:
        print(f"❗ Error fetching doctors: {e}")
        return []

# --- Chatbot Interface ---
def chatbot():
    print("🤖 Hello! Do you want to find doctors near you? (yes/no)")
    reply = input("You: ").strip().lower()

    if reply == "yes":
        location = input("🤖 Please enter your city and country (e.g., Pune, India): ").strip()
        print("🤖 Searching for nearby doctors...")
        doctors = find_doctors(location)
        if doctors:
            print(f"✅ Found {len(doctors)} doctors near {location}:")
            for i, doc in enumerate(doctors, 1):
                print(f"{i}. {doc['name']} - {doc['formatted']} - {doc.get('phone', 'N/A')}")
        else:
            print("❌ No doctors found.")
    elif reply == "no":
        print("🤖 Alright! Have a healthy day.")
    else:
        print("🤖 I didn't understand. Please type 'yes' or 'no'.")

# --- Run the Chatbot ---
if __name__ == "__main__":
    chatbot()
