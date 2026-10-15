# Age Detector

A simple age detector app. Paste an image URL → the API estimates the person's age.

## Project Structure

```md
Age-Detector/
├── server/
│   ├── app.py            ← Python Flask server
│   ├── .env              ← Local API credentials (not committed)
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
* Copy your RapidAPI key and get an ImgBB API key at [api.imgbb.com](https://api.imgbb.com)

### 2. Start the Server

```bash
cd server
pip install -r requirements.txt
# Put your credentials in server/.env (see the variable names below)
python app.py
```

Create `server/.env` with these entries, replacing the values with your keys:

```env
RAPIDAPI_KEY=your_rapidapi_key
IMGBB_KEY=your_imgbb_key
```

The `.env` file is ignored by Git. If API keys were previously committed or shared, revoke and replace them.

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
