import { MaterialIcons } from '@expo/vector-icons';
import { MapView, PointAnnotation } from "@maplibre/maplibre-react-native";
import React, { useRef } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { useLocationService } from "../../contexts/LocationContext";

export default function Map() {
  const { location, loading } = useLocationService();
  const mapRef = useRef(null); 

  if (loading || !location) return null;

  // Recentrer la carte sur la position actuelle
  const handleRecenter = () => {
    mapRef.current?.setCamera({
      centerCoordinate: [location.longitude, location.latitude],
      zoomLevel: 16,
      animationDuration: 500, // animation fluide
    });
  };

  const handleResetNorth = () => {
    // Réinitialiser l'orientation de la carte vers le nord
  }

  return (
    <View style={{ flex: 1 }}>
      <MapView
        ref={mapRef}
        style={{ flex: 1 }}
        mapStyle={require("../../assets/styles/astralis.json")}
        compassEnabled={false}
        attributionEnabled={false}
      >
        {/* Point de l’utilisateur */}
        <PointAnnotation
          id="user-location"
          coordinate={[location.longitude, location.latitude]}
        >
          <View style={styles.userLocation} />
        </PointAnnotation>
      </MapView>

      {/* Bouton de recentrage */}
      <TouchableOpacity style={styles.recenterButton} onPress={handleRecenter}>
        <MaterialIcons name="my-location" size={24} color="blue" />
      </TouchableOpacity>

      <TouchableOpacity style={styles.resetNorthButton}>
        <MaterialIcons name="explore" size={24} color="black" />
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
  resetNorthButton: {
    position: "absolute",
    bottom: 80,
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
});
