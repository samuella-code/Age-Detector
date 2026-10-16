# Age Detector

Age Detector is a lightweight web application that estimates a person’s age from an uploaded image or image URL. The project combines a Flask backend and a simple frontend interface, allowing users to submit an image, send it to an external age-detection API, and view the estimated result directly in the browser.

This app demonstrates how to build a full-stack AI-powered utility using Python on the server side and JavaScript on the client side. It is ideal for learning how to connect a frontend form to a backend service, forward requests to third-party APIs, and display results in a user-friendly interface.

## Project Structure

```sh
Age-Detector/
├── server/
│   ├── app.py            ← Python Flask server
│   └── requirements.txt  ← Python packages
└── client/
    ├── index.html        ← Webpage
    ├── style.css         ← Styling
    └── script.js         ← Logic
```

## How to Run

### 1. Get your API Key

* Go to [rapidapi.com](https://rapidapi.com)
* Search **"Age Detector"** by SmartClick → Subscribe (free tier)
* Copy your API key

### 2. Start the Server

```bash
cd server
pip install -r requirements.txt
# Paste your key in app.py line 9
python app.py
```

### 3. Open the Client

Open `client/index.html` in your browser.

## How It Works

```md
Browser → POST /detect-age → Flask Server → RapidAPI → age result back
```

1. User pastes an image URL
2. JavaScript sends it to our Python server
3. Python forwards it to RapidAPI's Age Detector
4. The estimated age is shown in the browser
