# Age Detector

A simple age detector app. Paste an image URL → the API estimates the person's age.

## Project Structure

```
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
- Go to [rapidapi.com](https://rapidapi.com)
- Search **"Age Detector"** by SmartClick → Subscribe (free tier)
- Copy your API key

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

```
Browser → POST /detect-age → Flask Server → RapidAPI → age result back
```

1. User pastes an image URL
2. JavaScript sends it to our Python server
3. Python forwards it to RapidAPI's Age Detector
4. The estimated age is shown in the browser
