from flask import Flask, request, jsonify
from flask_cors import CORS
from datasets import load_dataset
from sentence_transformers import SentenceTransformer, util
import pandas as pd

# Initialize app
app = Flask(__name__)
CORS(app)

# Load dataset
dataset = load_dataset("QuyenAnhDE/Diseases_Symptoms")["train"]
df = pd.DataFrame(dataset)

# Load sentence transformer model
model = SentenceTransformer("all-MiniLM-L6-v2")

# Generate embeddings for all symptoms
df['embedding'] = df['Symptoms'].apply(lambda x: model.encode(x, convert_to_tensor=True))

# Matching function
def get_disease_treatment(user_input, top_n=1):
    input_emb = model.encode(user_input, convert_to_tensor=True)
    similarities = [util.pytorch_cos_sim(input_emb, emb)[0][0].item() for emb in df['embedding']]
    df['score'] = similarities
    top = df.sort_values(by='score', ascending=False).head(top_n)
    return top[['Name', 'Symptoms', 'Treatments', 'score']]

# Flask route for chatbot
@app.route('/chat', methods=['POST'])
def chat():
    data = request.get_json()
    message = data.get("message", "")

    if not message.strip():
        return jsonify({"reply": "Please describe your symptoms."})

    try:
        results = get_disease_treatment(message, top_n=1)
        row = results.iloc[0]
        reply = (
            f"🤖 Based on your symptoms, you may have **{row['Name']}**.\n\n"
            f"🩺 Suggested Treatment: {row['Treatments']}.\n\n"
            f"⚠️ Please consult a healthcare provider for accurate diagnosis."
        )
    except Exception as e:
        reply = f"Error processing your request: {str(e)}"

    return jsonify({"reply": reply})

if __name__ == "__main__":
    app.run(port=8000)
