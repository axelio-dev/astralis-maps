import { Camera, MapView, PointAnnotation, } from "@maplibre/maplibre-react-native";
import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { useLocationService } from "../../contexts/LocationContext";

export default function Map() {
  const { location, loading } = useLocationService();
  const [initialCameraDone, setInitialCameraDone] = useState(false);

  useEffect(() => {
    if (location && !initialCameraDone) {
      // Une fois que la localisation est dispo, attente légère (1seconde) avant de désactiver la caméra
      const timer = setTimeout(() => setInitialCameraDone(true), 1000);
      return () => clearTimeout(timer);
    }
  }, [location, initialCameraDone]);

  if (loading || !location) return null;

  return (
    <MapView
      style={{ flex: 1 }}
      mapStyle={require("../../assets/styles/astralis.json")}
    >
      {/* Caméra affichée uniquement au démarrage de l'application*/}
      {!initialCameraDone && (
        <Camera
          centerCoordinate={[location.longitude, location.latitude]}
          zoomLevel={15}
        />
      )}

      {/* Point bleu pour afficher la position de l'utilisateur */}
      <PointAnnotation
        id="user-location"
        coordinate={[location.longitude, location.latitude]}
      >
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