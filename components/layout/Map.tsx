import { Camera, MapView, PointAnnotation, } from "@maplibre/maplibre-react-native";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { MaterialIcons } from '@expo/vector-icons';
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
    <View style={{ flex: 1 }}>
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
        <View style={styles.userLocation} />
      </PointAnnotation>
    </MapView>
    <TouchableOpacity style={styles.recenterButton}>
      <MaterialIcons name="my-location" size={24} color="black" />
    </TouchableOpacity>
</View>
  );
}

const styles = StyleSheet.create({
  userLocation: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: "blue",
    borderColor: "white",
    borderWidth: 2,
  },
  recenterButton: {
    position: "absolute",
    bottom: 20,
    right: 20,
    backgroundColor: "white",
    borderRadius: 25,
    padding: 12,
    elevation: 5,
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  buttonText: {
    fontSize: 20,
  },
});