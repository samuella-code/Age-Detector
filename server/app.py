from flask import Flask, request, jsonify
from flask_cors import CORS
import requests
import base64
import os
from pathlib import Path
from dotenv import load_dotenv

load_dotenv(Path(__file__).with_name(".env"))

app = Flask(__name__)
CORS(app)

RAPIDAPI_KEY = os.environ["RAPIDAPI_KEY"]
IMGBB_KEY = os.environ["IMGBB_KEY"]


@app.route("/detect-age", methods=["POST"])
def detect_age():
    # 1. Read the uploaded image and convert to base64
    img_b64 = base64.b64encode(request.files["image"].read()).decode()

    # 2. Upload to ImgBB to get a public URL (RapidAPI requires a URL)
    imgbb_res = requests.post("https://api.imgbb.com/1/upload",
                              data={"key": IMGBB_KEY, "image": img_b64})
    image_url = imgbb_res.json()["data"]["url"]

    # 3. Send the URL to RapidAPI Age Detector
    result = requests.post(
        "https://age-detector.p.rapidapi.com/age-detection",
        json={"url": image_url},
        headers={"x-rapidapi-key": RAPIDAPI_KEY,
                 "x-rapidapi-host": "age-detector.p.rapidapi.com"},
        verify=False,
    )
    return jsonify(result.json())


if __name__ == "__main__":
    app.run(debug=True, port=5000)
