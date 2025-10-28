import { useState, useEffect } from 'react';
import * as Location from 'expo-location'; // Import de toutes les fonctionnalitées du module expo-location

interface LocationData {
  latitude: number; // Latitude de la position GPS
  longitude: number; // Longitude de la position GPS
  accuracy?: number; // Précision de la position (optionnel)
}

export const useLocation = () => {
  const [location, setLocation] = useState<LocationData | null>(null); // Stocke la position actuelle de l'utilisateur
  const [error, setError] = useState<string | null>(null); // Stocke un message d'erreur si quelque chose ne va pas
  const [loading, setLoading] = useState(true); // Indique si on est en train de récupérer la position

  useEffect(() => {
    let subscription: Location.LocationSubscription; // Variable pour stocker l'abonnement à la localisation

    (async () => {
      try {
        const { status } = await Location.requestForegroundPermissionsAsync(); // Demande la permission d'accéder à la localisation en avant-plan
        if (status !== 'granted') { // Si la permission est refusée
          setError('Permission refusée pour accéder à la localisation.');
          setLoading(false);
          return;
        }

        subscription = await Location.watchPositionAsync( // Commence à surveiller la position de l'utilisateur
          {
            accuracy: Location.Accuracy.High, // Haute précision
            distanceInterval: 1, // Met à jour la position toutes les 1 mètres
          },
          (loc) => { // Callback appelé à chaque mise à jour de la position
            setLocation({
              latitude: loc.coords.latitude,
              longitude: loc.coords.longitude,
              accuracy: loc.coords.accuracy ?? undefined,
            });
            setLoading(false); // La position a été récupérée, on arrête le chargement
          }
        );
      } catch (err: unknown) { // Gestion des erreurs
        if (err instanceof Error) { 
          setError(err.message);
        } else {
          setError(String(err));
        }
        setLoading(false);
      }
    })();

    return () => {
      if (subscription) subscription.remove(); // Nettoyage de l'abonnement à la localisation lors du démontage du composant
    };
  }, []);

  return { location, error, loading }; // Retourne la position, l'erreur éventuelle et l'état de chargement
};
