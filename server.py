from flask import Flask, jsonify, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Variable globale pour stocker les stats
stats_stockees = []

@app.route("/stats", methods=["GET"])
def get_stats():
    print("📤 Envoi des stats :", stats_stockees)
    return jsonify(stats_stockees)

@app.route("/update", methods=["POST"])
def update_stats():
    global stats_stockees
    stats_stockees = request.json
    print("📥 Stats reçues :", stats_stockees)
    return jsonify({"status": "OK"})

if __name__ == "__main__":
    app.run(debug=True, port=5000)
