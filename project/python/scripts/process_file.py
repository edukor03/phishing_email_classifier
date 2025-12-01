import os
import sys
import pandas as pd
import joblib
import json

file_path = sys.argv[1]

BASE_DIR = os.path.dirname(os.path.dirname(__file__))

model = joblib.load(BASE_DIR + "/models/logreg.pkl")
vectorizer = joblib.load(BASE_DIR + "/models/vectorizer.pkl")

df = pd.read_csv(file_path)

columns = df.columns.tolist()

possible = ["email", "Email", "Email Text", "text", "message"]
column = None

for c in possible:
    if c in columns:
        column = c
        break

if column is None and len(columns) == 1:
    column = columns[0]

if column is None:
    raise ValueError(f"No valid email column found. Columns = {columns}")

X = vectorizer.transform(df[column])
preds = model.predict(X)
probs = model.predict_proba(X)[:,1]

df["prediction"] = preds
df["confidence"] = probs

stats = {
    "num_emails": len(df),
    "num_phishing": int((preds == 1).sum()),
    "num_safe": int((preds == 0).sum()),
    "phishing_precent": round((preds == 1).mean()*100,2)
}

output = {
    "stats": stats,
    "rows": df.to_dict(orient="records")
}

print(json.dumps(output))