import os
import sys
import pandas as pd
import joblib
import json
from datetime import datetime
import re
from nltk.corpus import stopwords
from collections import Counter

def clean_text(text):
    text = text.lower()
    text = re.sub(r"http\S+|www\.\S+", "", text)
    text = re.sub(r"<.*?>", "", text)     
    text = re.sub(r"[^a-z0-9 ]", " ", text)    
    text = re.sub(r"\s+", " ", text)
    stop = set(stopwords.words('english'))
    text = " ".join([word for word in text.split() if word not in stop])     
    return text.strip()

def get_top_words(series, n=10):
    all_words = " ".join(series).split()
    counts = Counter(all_words)
    return [{"word": w, "count": c} for w, c in counts.most_common(n)]

# Get the path
file_path = sys.argv[1]
BASE_DIR = os.path.dirname(os.path.dirname(__file__))

# Load the data
df = pd.read_csv(file_path, names=['email_text'])

# Add any additional features or statistics
df['num_links'] = df['email_text'].str.count('http')
df['num_excl'] = df['email_text'].str.count('!')
df['num_caps'] = df['email_text'].str.count(r'[A-Z]')
df['length'] = df['email_text'].str.len()

# Clean the text
df['email_text'].apply(clean_text)

# Load the model and vectoriser
pipeline = joblib.load(BASE_DIR + "\\models\\model.pkl")

# Classify emails
preds = pipeline.predict(df['email_text'])
probs = pipeline.predict_proba(df['email_text'])[:, 1]

# Store the results into the dataframe
df["prediction"] = preds
df["confidence"] = probs

# Extract phishing and safe text seperately
phish_texts = df.loc[preds == 1, 'email_text'].astype(str)
safe_texts  = df.loc[preds == 0, 'email_text'].astype(str)

# Additional statistics:
stats = {
    "num_emails": len(df),
    "num_phishing": int((preds == 1).sum()),
    "num_safe": int((preds == 0).sum()),
    "phishing_percent": round((preds == 1).mean()*100, 2),
    "top_phishing_words": get_top_words(phish_texts),
    "top_safe_words": get_top_words(safe_texts)
}

# Define the output
output = {
    "stats": stats,
    "rows": df.to_dict(orient="records")
}

# Return the output in json format
print(json.dumps(output))




