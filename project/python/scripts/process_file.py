import os
import sys
import pandas as pd
import joblib
import json
from datetime import datetime

file_path = sys.argv[1]

BASE_DIR = os.path.dirname(os.path.dirname(__file__))

pipeline = joblib.load(BASE_DIR + "/models/model.pkl")

df = pd.read_csv(file_path)

possible = ["email", "Email", "Email Text", "text", "message"]
column = None

for c in possible:
    if c in df.columns:
        column = c
        break

if column is None and len(df.columns) == 1:
    column = df.columns[0]

if column is None:
    raise ValueError(f"No valid email column found: {df.columns}")

df[column] = df[column].astype(str)

df["length"] = df[column].str.len()
df["num_links"] = df[column].str.count('http')
df["num_caps"] = df[column].str.count(r'[A-Z]')
df["num_excl"] = df[column].str.count("!")

preds = pipeline.predict(df[column])
probs = pipeline.predict_proba(df[column])[:, 1]

df["prediction"] = preds
df["confidence"] = probs

stats = {
    "num_emails": len(df),
    "num_phishing": int((preds == 1).sum()),
    "num_safe": int((preds == 0).sum()),
    "phishing_percent": round((preds == 1).mean() * 100, 2)
}

output = {
    "stats": stats,
    "rows": df.to_dict(orient="records")
}

print(json.dumps(output))