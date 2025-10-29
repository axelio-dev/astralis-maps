import React, { createContext, useContext, ReactNode } from "react";
import { useLocation } from "../hooks/useLocation";
import type { LocationData } from "../hooks/useLocation";


// Définition du type des données du contexte
interface LocationContextType {
  location: LocationData | null;
  error: string | null;
  loading: boolean;
}


// Création du context vide qui contiendra la localisationn, et permet à n'impoorte quel composant d'y accéder
const LocationContext = createContext<LocationContextType | undefined>(undefined);


interface LocationProviderProps {
  children: ReactNode; // Les composants enfants qui auront accès au contexte
}


// Le location provider qui va founrir les données de localisation à toute l'application
export const LocationProvider: React.FC<LocationProviderProps> = ({ children }) => {
  const locationData = useLocation(); // Récupération des données de localisation { location, error, loading }

  // Ces données sont fournies à tous les composants enfants via le contexte
  return (
    <LocationContext.Provider value={locationData}>
      {children}
    </LocationContext.Provider>
  );
};


// Hook pour récupérer le contexte facilement dans n'importe quel composant
export const useLocationService = (): LocationContextType => {
  const context = useContext(LocationContext); // On récupère les données du contexte

  // En cas d'utilisation en dehors du provider, on lance une erreur
  if (!context) {
    throw new Error("useLocationService must be used inside a LocationProvider");
  }

  return context; // les données de localisation { location, error, loading } sont retournées
};
