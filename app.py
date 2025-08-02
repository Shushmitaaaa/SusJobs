from flask import Flask, render_template, request, jsonify
import pickle
import nltk
from nltk.corpus import stopwords
import google.generativeai as genai
from dotenv import load_dotenv
import os

load_dotenv()

nltk.download("stopwords")
stop_words = set(stopwords.words("english"))

app = Flask(__name__)
model = pickle.load(open("model.pkl", "rb"))
vect = pickle.load(open("vectorizer.pkl", "rb"))


genai.configure(api_key=os.getenv("GEMINI_API_KEY"))
models = genai.list_models()
# for m in models:
#     print(f"Model name: {m.name}, Supported generation: {'generateContent' in m.supported_generation_methods}")


gemini_model = genai.GenerativeModel("gemini-2.5-flash-lite")  # NO "models/" prefix needed


def preprocess(text):
    text = text.lower()
    words = [word for word in text.split() if word not in stop_words]
    return ' '.join(words)

@app.route('/')
def home():
    return render_template("index.html")

@app.route('/predict', methods=['POST'])
def predict():
    data = request.get_json()
    text = preprocess(data['description'])
    vec = vect.transform([text])
    prediction = model.predict(vec)[0]
    label = "Fraudulent Job" if prediction == 1 else "Real Job"
    return jsonify({'prediction': label})

@app.route('/reason', methods=['POST'])
def reason():
    data = request.get_json()
    desc = data['description']
    prediction = data['prediction']

    prompt = f"""This job post was predicted as a {prediction.lower()} job.

Explain why it might be considered {prediction.lower()}, based on the content.

Job Description:
\"\"\"{desc}\"\"\""""

    try:
        response = gemini_model.generate_content(prompt)
        explanation = response.text
    except Exception as e:
        print("Gemini API Error:", repr(e))
        explanation = "Failed to generate explanation. Please try again."

    return jsonify({'reasoning': explanation})

if __name__ == '__main__':
    app.run(debug=True)
