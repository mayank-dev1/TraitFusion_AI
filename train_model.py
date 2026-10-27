import pandas as pd
from datasets import load_dataset
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.linear_model import Ridge
from sklearn.pipeline import Pipeline
from sklearn.multioutput import MultiOutputRegressor
import joblib

print("[INFO] Initiating data ingestion from Hugging Face repository: 'MTHR/OCEAN'...")
# Load dataset
dataset = load_dataset("MTHR/OCEAN")

# Convert to Pandas DataFrame
df = dataset['train'].to_pandas()
print(f"[INFO] Raw dataset loaded. Total records: {len(df)}")

# FIX: Drop rows that have missing values (NaN) in any of the crucial columns
df = df.dropna(subset=['Text', 'Openness', 'Conscientiousness', 'Extraversion', 'Agreeableness', 'Neuroticism'])
print(f"[INFO] Data cleaned (NaN removed). Records ready for training: {len(df)}")

# Define feature (X) and target variables (y)
X = df['Text']
y = df[['Openness', 'Conscientiousness', 'Extraversion', 'Agreeableness', 'Neuroticism']]

print("[INFO] Constructing the NLP pipeline (TF-IDF Vectorizer + MultiOutput Ridge Regressor)...")
# Build the Machine Learning pipeline
pipeline = Pipeline([
    ('tfidf', TfidfVectorizer(max_features=5000, stop_words='english')),
    ('regressor', MultiOutputRegressor(Ridge()))
])

print("[INFO] Commencing model training. Please wait...")
# Train the model
pipeline.fit(X, y)

# Serialize and save the trained model
model_filename = 'traitfusion_model.pkl'
joblib.dump(pipeline, model_filename)

print(f"[SUCCESS] Model training complete. Artifact saved securely as '{model_filename}'.")