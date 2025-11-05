import { Camera, MapView, PointAnnotation } from "@maplibre/maplibre-react-native";
import React, { useEffect, useState, useRef } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { MaterialIcons } from '@expo/vector-icons';
import { useLocationService } from "../../contexts/LocationContext";

export default function Map() {
  const { location, loading } = useLocationService();
  const [cameraProps, setCameraProps] = useState<{ centerCoordinate: [number, number]; zoomLevel: number } | null>(null);  // État pour les props de la caméra

  useEffect(() => {
    if (location && !cameraProps) {
      // Définit la caméra initiale une fois la localisation disponible
      setCameraProps({
        centerCoordinate: [location.longitude, location.latitude],
        zoomLevel: 15,
      });
    }
  }, [location, cameraProps]);

  if (loading || !location || !cameraProps) return null;

  // Fonction pour recentrer la carte sur la position de l'utilisateur
  const handleRecenter = () => {
    setCameraProps({
      centerCoordinate: [location.longitude, location.latitude],
      zoomLevel: 15,
    });
  };

  return (
    <View style={{ flex: 1 }}>
      <MapView
        style={{ flex: 1 }}
        mapStyle={require("../../assets/styles/astralis.json")}
      >
        {/* Caméra toujours présente, contrôlée par l'état */}
        <Camera
          centerCoordinate={cameraProps.centerCoordinate}
          zoomLevel={cameraProps.zoomLevel}
          animationDuration={1000}  // Animation fluide pour le recentrage
        />

        {/* Point bleu pour afficher la position de l'utilisateur */}
        <PointAnnotation
          id="user-location"
          coordinate={[location.longitude, location.latitude]}
        >
          <View style={styles.userLocation} />
        </PointAnnotation>
      </MapView>
      <TouchableOpacity
        style={styles.recenterButton}
        onPress={handleRecenter}  // Gestionnaire onPress
      >
        <MaterialIcons name="my-location" size={24} color="blue" />
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