# Phishing Email Classifier – Backend Application

This folder contains the backend application that runs the phishing classifier in production.  
It integrates the trained machine learning model with an Express.js server and exposes API endpoints for classification and communication with the system.

---

## 🚀 Features

- Classifies emails as **safe** or **phishing**
- Trained ML model using Logistic Regression
- Receives data from Python or any external scanner
- JSON API endpoints for classification results
- Extensible architecture (controllers, routes, services)
- Easy to deploy and scale

---

## 🧱 Folder Structure

project/
│
├── python/ # ML model runtime + utilities
│ ├── data/
│ ├── models/ # Saved .pkl models
│ ├── scripts/ # classification and preprocessing
│
├── shared/ # shared config or utilities
│ └── config.js
│
├── src/
│ ├── controllers/
│ ├── routes/
│ ├── models/
│ └── views/
│
├── server.js # Express entrypoint
├── app.js
├── package.json
└── README.md

