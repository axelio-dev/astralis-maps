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

  // Nouvel état pour gérer le suivi automatique
  const [isFollowing, setIsFollowing] = useState(true); // Démarrage avec suivi actif

  const mapRef = useRef<any>(null);
  const cameraRef = useRef<any>(null);
  const programmaticTimeoutRef = useRef<NodeJS.Timeout | null>(null); // Ref pour le timeout

  useEffect(() => {
    if (location && !cameraProps) {
      setProgrammaticChange(); // Marquer comme changement programmatique pour le centrage initial
      setCameraProps({
        centerCoordinate: [location.longitude, location.latitude],
        zoomLevel: 16,
      });
    }
  }, [location, cameraProps]);

  // Suivi automatique : mettre à jour la caméra si isFollowing est true et location change
  useEffect(() => {
    if (location && isFollowing && cameraRef.current) {
      setProgrammaticChange(); // Marquer comme changement programmatique
      cameraRef.current.setCamera({
        centerCoordinate: [location.longitude, location.latitude],
        zoomLevel: 16,
        animationDuration: 1000,
      });
    }
  }, [location, isFollowing]);

  // Fonction pour marquer un changement programmatique et set un timeout pour le reset
  const setProgrammaticChange = () => {
    if (programmaticTimeoutRef.current) {
      clearTimeout(programmaticTimeoutRef.current);
    }
    programmaticTimeoutRef.current = setTimeout(() => {
      programmaticTimeoutRef.current = null; // Reset après l'animation (1500ms > 1000ms animation)
    }, 1500);
  };

  if (loading || !location || !cameraProps) return null;

  const handleRecenter = () => {
    if (isFollowing) {
      // Si suivi actif, désactiver le suivi
      setIsFollowing(false);
    } else {
      // Si inactif, activer le suivi et recentrer
      setIsFollowing(true);
      setProgrammaticChange(); // Marquer comme changement programmatique
      cameraRef.current?.setCamera({
        centerCoordinate: [location.longitude, location.latitude],
        zoomLevel: 16,
        animationDuration: 1000,
      });
    }
  };

  const handleResetNorth = () => {
    setProgrammaticChange(); // Marquer comme changement programmatique
    cameraRef.current?.setCamera({
      heading: 0, // ✅ remet la carte orientée vers le nord
      animationDuration: 1000,
    });
  };

  // Gestionnaire pour détecter les mouvements de la carte par l'utilisateur
  const handleRegionDidChange = () => {
    if (!programmaticTimeoutRef.current) {
      // Si pas de timeout actif, c'est un geste utilisateur : désactiver le suivi
      setIsFollowing(false);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <MapView
        ref={mapRef}
        style={{ flex: 1 }}
        mapStyle={require("../../assets/styles/astralis.json")}
        compassEnabled={false}
        attributionEnabled={false}
        onRegionDidChange={handleRegionDidChange} // ✅ Détecte les mouvements utilisateur
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

      <TouchableOpacity 
        style={[styles.recenterButton, { backgroundColor: isFollowing ? 'green' : 'blue' }]} // ✅ Couleur conditionnelle : vert si suivi actif, bleu sinon
        onPress={handleRecenter}
      >
        <MaterialIcons name="my-location" size={24} color="white" />
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
