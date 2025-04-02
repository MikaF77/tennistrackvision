import requests

# Statistiques fictives à envoyer
fake_stats = [
    {
        "joueur": 1,
        "frames_detectees": 300,
        "distance_totale_pixels": 10248.55,
        "presence_court": True
    },
    {
        "joueur": 2,
        "frames_detectees": 287,
        "distance_totale_pixels": 9785.24,
        "presence_court": True
    }
]

try:
    response = requests.post("http://127.0.0.1:5000/update", json=fake_stats)
    print("✅ Statut :", response.status_code)
except Exception as e:
    print("❌ Erreur lors de l'envoi :", e)
