import cv2
import math
import requests
from ultralytics import YOLO

# === CONFIGURATION ===
video_path = "tennis.mp4"
model = YOLO("yolov8n.pt")

# === CONVERSION pixels → mètres (mesurée sur image réelle)
pixels_par_metre = 126.9  # mesuré à partir de la largeur réelle du court (8,23 m)

# === CHARGEMENT DE LA VIDÉO ===
cap = cv2.VideoCapture(video_path)

if not cap.isOpened():
    print("❌ Impossible d'ouvrir la vidéo :", video_path)
    exit()
else:
    print("✅ Vidéo chargée avec succès :", video_path)

player_positions = []
frame_count = 0

# === TRAITEMENT FRAME PAR FRAME ===
while cap.isOpened():
    ret, frame = cap.read()
    if not ret:
        print("📴 Fin de la vidéo ou erreur de lecture.")
        break

    print(f"\n📽️ Frame {frame_count + 1} analysée")
    results = model(frame, conf=0.2)

    current_positions = []

    for result in results:
        print("🎯 Résultats détectés :", len(result.boxes))
        for box in result.boxes:
            cls = int(box.cls[0])
            label = result.names[cls]

            if label == "person":
                x1, y1, x2, y2 = map(int, box.xyxy[0])
                center_x = (x1 + x2) // 2
                center_y = (y1 + y2) // 2
                current_positions.append((center_x, center_y))

                # Dessin sur l'image
                cv2.rectangle(frame, (x1, y1), (x2, y2), (0, 255, 0), 2)
                cv2.circle(frame, (center_x, center_y), 5, (0, 255, 255), -1)
                cv2.putText(frame, "Joueur", (x1, y1 - 10),
                            cv2.FONT_HERSHEY_SIMPLEX, 0.5, (0, 255, 0), 2)

    player_positions.append(current_positions)
    frame_count += 1

    cv2.imshow("TennisTrackVision - Analyse Vidéo", frame)
    if cv2.waitKey(1) & 0xFF == ord('q') or frame_count >= 200:
        print("🛑 Arrêt après 200 frames (limite atteinte)")
        break

cap.release()
cv2.destroyAllWindows()

if not player_positions:
    print("❌ Aucun joueur détecté sur aucune frame.")
    exit()

# === CALCUL DES STATS ===
def euclidean(p1, p2):
    return math.sqrt((p1[0] - p2[0])**2 + (p1[1] - p2[1])**2)

num_players = max(len(p) for p in player_positions)
player_stats = []

for i in range(num_players):
    total_distance = 0
    last_pos = None
    positions = []

    for frame_pos in player_positions:
        if len(frame_pos) > i:
            pos = frame_pos[i]
            positions.append(pos)
            if last_pos is not None:
                total_distance += euclidean(pos, last_pos)
            last_pos = pos

    player_stats.append({
        "joueur": i + 1,
        "frames_detectees": len(positions),
        "distance_totale_pixels": round(total_distance, 2),
        "distance_totale_m": round(total_distance / pixels_par_metre, 2),
        "presence_court": bool(positions)
    })

# === AFFICHAGE ET ENVOI ===
print("\n📊 Statistiques générées :")
for stat in player_stats:
    print(stat)

if not player_stats:
    print("⚠️ Aucun joueur détecté ou stats vides, rien envoyé.")
else:
    print("\n📦 Données envoyées à Flask :")
    print(player_stats)

    try:
        response = requests.post("http://127.0.0.1:5000/update", json=player_stats)
        if response.status_code == 200:
            print("✅ Statistiques envoyées au serveur avec succès.")
        else:
            print(f"⚠️ Erreur lors de l'envoi des stats : statut {response.status_code}")
    except Exception as e:
        print("❌ Impossible de contacter le serveur Flask :", e)
