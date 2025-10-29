import React from "react"; 
import { View } from "react-native";  // Import de View pour le style du point
import { MapView, PointAnnotation, Camera } from "@maplibre/maplibre-react-native"; // Import des composants Maplibre
import { useLocationService } from "../../contexts/LocationContext"; // Import du hook pour la localisation

export default function Map() {
  const { location, loading } = useLocationService(); // Récupération de la localisation et de l'état de chargement

  if (loading || !location) return null; // Si la localisation est en cours de chargement ou absente, rien ne s'affiche

  return (
    <MapView
      style={{ flex: 1 }} // La carte prends tout l'espace disponible
      mapStyle={require("../../assets/styles/bright.json")} // Style de la carte
    >
      {/* Composant Camera pour centrer et zoomer sur la position de l'utilisateur */}
      <Camera
        centerCoordinate={[location.longitude, location.latitude]}
        zoomLevel={15}
      />

      {/* Point bleu pour afficher la position de l'utilisateur */}
      <PointAnnotation
        id="user-location"
        coordinate={[location.longitude, location.latitude]}
      >
        {/* Style de la position de l'utilisateur */}
        <View
          style={{
            width: 12,
            height: 12,
            borderRadius: 6,
            backgroundColor: "blue",
            borderColor: "white",
            borderWidth: 2,
          }}
        />
      </PointAnnotation>
    </MapView>
  );
}