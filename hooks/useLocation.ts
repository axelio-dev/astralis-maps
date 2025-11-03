import * as Location from "expo-location";
import { useEffect, useRef, useState } from "react";

// Définition du type d'objet "location" renvoyé par le hooks
export interface LocationData {
  latitude: number;     // Latitude actuelle de l'utilisateur
  longitude: number;    // Longitude actuelle de l'utilisateur
  accuracy?: number;    // Précision de la position (en mètres)
  timestamp?: number;   // Heure à laquelle la position a été enregistrée
}

// Hook principal
export const useLocation = () => {
  const [location, setLocation] = useState<LocationData | null>(null); // Position actuelle (ou null si pas encore connue)
  const [error, setError] = useState<string | null>(null); // Message d'erreur si un truc se passe mal (permissions, GPS désactivé, etc.)
  const [loading, setLoading] = useState(true); // Indique si on est encore en train de récupérer la première position

  const subscriptionRef = useRef<Location.LocationSubscription | null>(null);  

  useEffect(() => {
    let mounted = true; // Pour éviter les mises à jour d'état après le démontage

    (async () => {
      try {
        // Demande pour accéder à la localisation
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
          // Si refus, erreuur et on arrête tout
          if (!mounted) return;
          setError("Permission refusée pour accéder à la localisation.");
          setLoading(false);
          return;
        }

        // On récupère la position actuelle
        const current = await Location.getCurrentPositionAsync({});
        if (!mounted) return;
        setLocation({
          latitude: current.coords.latitude,
          longitude: current.coords.longitude,
          accuracy: current.coords.accuracy ?? undefined,
          timestamp: current.timestamp ?? Date.now(),
        });
        setLoading(false);

        // Démarrage le suivi continu de la position (GPS actif)
        subscriptionRef.current = await Location.watchPositionAsync(
          {
            accuracy: Location.Accuracy.High, // haute précision GPS
            distanceInterval: 2, // Mise à jour tous les 5 mètres parcourus
            // timeInterval: 1000, // (optionnel) Si update chaque seconde
          },
          (loc) => {
            // À chaque mise à jour, stockage la nouvelle position
            if (!mounted) return;
            setLocation({
              latitude: loc.coords.latitude,
              longitude: loc.coords.longitude,
              accuracy: loc.coords.accuracy ?? undefined,
              timestamp: loc.timestamp ?? Date.now(),
            });
          }
        );
      } catch (err: unknown) {
        // Si une erreur se produit, renvoi de l'erreur
        if (!mounted) return;
        setError(err instanceof Error ? err.message : String(err));
        setLoading(false);
      }
    })();

    //  Nettoyage à la fin : arrêt du suivi GPS
    return () => {
      mounted = false;
      if (subscriptionRef.current) {
        subscriptionRef.current.remove();
        subscriptionRef.current = null;
      }
    };
  }, []);

  // On renvoie les infos de localisation, l'erreur éventuelle et le statut de chargement
  return { location, error, loading };
};
