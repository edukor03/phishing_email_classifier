# Phishing Email Classifier – Backend Application

This folder contains the backend application that runs the phishing classifier in production.  
It integrates the trained machine learning model with an Express.js server and exposes API endpoints for classification and communication with the system.

## 🚀 Features

- Classifies emails as **safe** or **phishing**
- Trained ML model using Logistic Regression
- Receives data from Python or any external scanner
- JSON API endpoints for classification results
- Extensible architecture (controllers, routes, services)
- Easy to deploy and scale

## 🧱 Folder Structure

- public
  - css
    -  style.css (Contains all the styles for the dashboard)
  - js
    - previewFile.js (JS code for previewing a file when using upload file input)
    - uploadFile.js (JS code for sending it to backend and waiting for a response before redirecting to dashboard page)
- python
  - scripts
    - process_file.py (Preprocesses text and loads the model to analyse the processed text before returning output in JSON format)
- src
  - controllers
    - dashboardController.js (Set up the logic for the page and pass any variables to the ejs file)
  - routes
    - dashboardRoutes.js (Set up routes, connect controller with the appopriate route)
  - services
    - resultServices.js (Saves the results and allows to view it)
  - views
    - dashboard.ejs
    - upload.ejs
    - partials
      - footer.ejs
      - header.ejs
      - navbar.ejs
- uploads (Temporarily saves csv files for python to read the data before being deleted)
- app.js
- package.json
- package-lock-json

## ⚙️ Technologies Used
- Python
- JavaScript (Node.js, Express JS)
- HTML/CSS (EJS for templating)

