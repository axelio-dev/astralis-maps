import Mapbox from "@rnmapbox/maps";
import React from "react";

Mapbox.setAccessToken(null); // Aucune clé API

export function Map() {
  return (
    <Mapbox.MapView
      style={{ flex: 1 }}
      styleURL="https://api.maptiler.com/maps/basic/style.json?key=ae4d8df1nN5qU23p6gvJ" 
      // ✅ Style libre juste pour tester (clé publique gratuite de démonstration)
    />
  );
}
