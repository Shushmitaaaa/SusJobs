# 🕵️‍♀️ Fake Job Detector – AI-Powered Job Scam Identifier



**Fake Job Detector** is an AI-powered tool that helps job seekers identify fraudulent job postings. With a trained machine learning model and integrated Gemini-2.5-Flash-Lite LLM, this tool not only classifies jobs as *Real* or *Fake* but also explains **why** a job is likely fraudulent  helping users stay safe from scams demanding personal data or money.


## Screenshots


<img width="1600" height="762" alt="1a" src="https://github.com/user-attachments/assets/020d325d-8f06-4610-8613-19729004907b" />
<img width="1585" height="766" alt="2ab" src="https://github.com/user-attachments/assets/e3d45962-e802-4a8e-8c27-6482c470a7a6" />
<img width="1583" height="761" alt="3ab" src="https://github.com/user-attachments/assets/8e968857-576c-44c0-897c-a6e4b6b2aab9" />



### How It Works – Step-by-Step

### Dataset Collection

* Used dataset from kaggle.
* Contains job descriptions labeled as fake or real.

### Data Cleaning

* Dropped unnecessary columns (e.g., job ID, salary range).
* Replaced null values with blank strings for consistency.

### Exploratory Data Analysis (EDA)

* Used `RandomUnderSampler` (from `imblearn`) to handle data imbalance – there were too many real jobs vs. fake.
* Visualized:

  * Number of job postings per country (USA dominated).
  * Job experience distribution (Entry-level had the highest share).
  * Most common words in **real** vs. **fake** job descriptions using word clouds.

most common words used in real job descriptions
 <img width="814" height="498" alt="wc1" src="https://github.com/user-attachments/assets/a210ed32-8a6e-46a5-ac25-db52d632d8c7" />



  most common words used in fake job descriptions
  <img width="790" height="499" alt="wc fk" src="https://github.com/user-attachments/assets/8237336e-3da4-4a7b-95d4-91a09d1f1953" />

    

### Text Preprocessing

* Removed stopwords using NLTK to clean up textual noise.
* Normalized and tokenized the text data.

### Train-Test Split & Vectorization

* Split data into train and test sets.
* Used **CountVectorizer** to convert job descriptions into numerical form (Document-Term Matrix).

### Model Building & Evaluation

* Trained using **Naive Bayes** – known for strong performance on text data.
* Also tried **Decision Tree**, but Naive Bayes + CountVectorizer gave better accuracy.
* Evaluation Metrics:

  * **Accuracy**
  * **Precision**
  * **F1 Score**
  * **Support**

### Model Saving

* Saved the trained model and vectorizer using `pickle` for web deployment.

### LLM Integration (Gemini-2.5-Flash-Lite)

* Integrated Google’s Gemini Flash model to explain **why** a job is real or fake.
* After prediction, users can click the **"Explain Why"** button to get an AI-generated reasoning.


## Tech Stack

 Component     Tool/Library                                          
 
 **Frontend**  HTML, CSS, JavaScript                                 
 **Backend**   Flask                                                 
 **ML & NLP**  Scikit-learn, NLTK, CountVectorizer, Imbalanced-learn 
 **LLM**       Gemini-2.5-Flash-Lite via Google Generative AI API    
 **Model**     Naive Bayes Classifier                                



##  Use Cases

*  Freshers & students verifying internship offers.
*  Job seekers avoiding scam job listings.
*  Platforms enhancing job post moderation.
*  Career counselors verifying job leads before sharing.


##  Run Locally

1. Clone the repo:

   ```bash
   git clone https://github.com/yourusername/fake-job-detector.git
   cd fake-job-detector
   ```

2. Install requirements:

   ```bash
   pip install -r requirements.txt
   ```

3. Run the Flask server:

   ```bash
   python app.py
   ```



