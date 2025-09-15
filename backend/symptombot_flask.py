
from flask import Flask, request, jsonify
from transformers import AutoTokenizer, AutoModelForCausalLM, pipeline
from sentence_transformers import SentenceTransformer, util
from datasets import load_dataset
import PyPDF2
import torch
import io
import pandas as pd

app = Flask(__name__)

# Load dataset and embeddings
ds = load_dataset("QuyenAnhDE/Diseases_Symptoms")
df = pd.DataFrame(ds['train'])

embed_model = SentenceTransformer('all-MiniLM-L6-v2')
df['embedding'] = df['Symptoms'].apply(lambda x: embed_model.encode(x, convert_to_tensor=True))

# Load language model
tokenizer = AutoTokenizer.from_pretrained("microsoft/phi-2")
llm_model = AutoModelForCausalLM.from_pretrained("microsoft/phi-2", torch_dtype="auto", device_map="auto")
chat_generator = pipeline("text-generation", model=llm_model, tokenizer=tokenizer)

def get_disease_treatment(user_input, top_n=1):
    input_emb = embed_model.encode(user_input, convert_to_tensor=True)
    sims = [util.pytorch_cos_sim(input_emb, emb)[0][0].item() for emb in df['embedding']]
    df['score'] = sims
    best = df.sort_values(by='score', ascending=False).head(top_n)
    return best[['Name', 'Symptoms', 'Treatments', 'score']]

def create_prompt(user_input, top_results):
    context = ""
    for _, row in top_results.iterrows():
        context += f"🔹 Disease: {row['Name']}\nSymptoms: {row['Symptoms']}\nTreatment: {row['Treatments']}\n\n"
    prompt = (
        f"You are a friendly medical assistant.\n"
        f"User described these symptoms: {user_input}\n\n"
        f"Based on similar cases, here are some possible conditions and treatments:\n\n"
        f"{context}"
        f"Explain this in a friendly and helpful tone, like you're chatting with the user.\n"
    )
    return prompt

def generate_response_with_llm(user_input, top_n=3):
    top_results = get_disease_treatment(user_input, top_n=top_n)
    if top_results.empty or top_results['score'].max() < 0.4:
        return "I'm not sure I could identify anything based on that. Could you describe your symptoms in more detail?"
    prompt = create_prompt(user_input, top_results)
    output = chat_generator(
        prompt,
        max_new_tokens=250,
        do_sample=True,
        temperature=0.7,
        pad_token_id=tokenizer.eos_token_id
    )[0]['generated_text']
    return output.replace(prompt, "").strip()

def extract_text_from_pdf(file):
    reader = PyPDF2.PdfReader(file)
    text = ""
    for page in reader.pages:
        text += page.extract_text() or ""
    return text

@app.route('/diagnose', methods=['POST'])
def diagnose():
    text_input = request.form.get('text', '')
    pdf_file = request.files.get('file')

    pdf_text = ""
    if pdf_file:
        pdf_bytes = pdf_file.read()
        pdf_text = extract_text_from_pdf(io.BytesIO(pdf_bytes))

    combined_input = ""
    if text_input and pdf_text:
        combined_input = f"{text_input}\n\nAdditional info from report:\n{pdf_text}"
    elif pdf_text:
        combined_input = pdf_text
    else:
        combined_input = text_input

    if not combined_input.strip():
        return jsonify({'error': 'No input provided'}), 400

    response = generate_response_with_llm(combined_input)
    return jsonify({'response': response})

if __name__ == '__main__':
    app.run(debug=True)
