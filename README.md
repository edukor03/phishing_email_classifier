# Phishing Email Detector

A lightweight machine learning project for detecting phishing emails using natural-language features, paired with a Node.js dashboard for visualizing scan results. The system processes uploaded email text files, classifies each email as **Phishing** or **Safe**, and displays predictions, confidence scores, and basic metadata.

---

## Overview

This project combines:

- **Python (Machine Learning)** — preprocessing, feature extraction, model training, and prediction  
- **Node.js (Backend + Dashboard)** — file upload handling, executing the Python classifier, and rendering results  
- **Simple ML Model** — trained on phishing vs. legitimate email datasets using NLP features

The result is an interactive dashboard where users can upload email files and instantly view prediction outcomes.

---

## Features

- Upload `.txt` email files for automated scanning  
- Real-time predictions with confidence scores  
- Metrics extracted per email:  
  - length  
  - number of links  
  - capital-letter usage  
- Summary cards showing total, phishing, and safe emails  
- Modular architecture for easy improvements or model swaps  

---

## Tech Stack

### Machine Learning (Python)
- scikit-learn  
- TF-IDF vectorization  
- Logistic Regression (or your actual model)

### Backend (Node.js)
- Express.js  
- Child process integration to run Python scripts  
- Multer or similar for file uploads  

### Frontend
- HTML / CSS / JavaScript  
- Simple dashboard layout  

---

## How It Works

1. User uploads one or more email text files.  
2. Node.js stores the files and triggers the Python classifier.  
3. Python script loads the trained model, extracts features, and makes predictions.  
4. Results are returned to Node.js and displayed in the dashboard table.  

---

## Current Limitations

- The **Scan Emails** page does not currently connect to any email server.  
- Email server integration (IMAP/POP3) is a possible future enhancement but not a priority.

---

## Possible Future Improvements

- Email inbox scanning via IMAP/POP3  
- Advanced analysis: header parsing, URL extraction, sender reputation  
- Upgrading to transformer-based embeddings  
- Deploying a hosted demo  
- Additional analytics in the dashboard  

---

## Getting Started

### 1. Install Dependencies

**Python**
```bash
pip install -r requirements.txt
npm install
npm app.js
```

Application will run at: **http://localhost:3000**
