import { MaterialIcons } from '@expo/vector-icons';
import { Camera, MapView, PointAnnotation } from "@maplibre/maplibre-react-native";
import React, { useEffect, useRef, useState } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { useLocationService } from "../../contexts/LocationContext";

export default function Map() {
  const { location, loading } = useLocationService();
  const [cameraProps, setCameraProps] = useState<{
    centerCoordinate: [number, number];
    zoomLevel: number;
  } | null>(null);

  const mapRef = useRef<any>(null);
  const cameraRef = useRef<any>(null); 

  useEffect(() => {
    if (location && !cameraProps) {
      setCameraProps({
        centerCoordinate: [location.longitude, location.latitude],
        zoomLevel: 16,
      });
    }
  }, [location, cameraProps]);

  if (loading || !location || !cameraProps) return null;

  const handleRecenter = () => {
    cameraRef.current?.setCamera({
      centerCoordinate: [location.longitude, location.latitude],
      zoomLevel: 16,
      animationDuration: 1000,
    });
  };

  const handleResetNorth = () => {
    cameraRef.current?.setCamera({
      heading: 0, // ✅ remet la carte orientée vers le nord
      animationDuration: 1000,
    });
  };

  return (
    <View style={{ flex: 1 }}>
      <MapView
        ref={mapRef}
        style={{ flex: 1 }}
        mapStyle={require("../../assets/styles/astralis.json")}
        compassEnabled={false}
      >
        <Camera
          ref={cameraRef} // ✅ Attache la ref
          centerCoordinate={cameraProps.centerCoordinate}
          zoomLevel={cameraProps.zoomLevel}
          animationDuration={1000}
        />

        <PointAnnotation
          id="user-location"
          coordinate={[location.longitude, location.latitude]}
        >
          <View style={styles.userLocation} />
        </PointAnnotation>
      </MapView>

      <TouchableOpacity style={styles.recenterButton} onPress={handleRecenter}>
        <MaterialIcons name="my-location" size={24} color="blue" />
      </TouchableOpacity>

      <TouchableOpacity style={styles.resetNorthButton} onPress={handleResetNorth}>
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