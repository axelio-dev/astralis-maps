import Mapbox from "@rnmapbox/maps";
import React from "react";

export function Map() {
  return (
    <Mapbox.MapView
      style={{ flex: 1 }}
      styleURL="/assets/styles/bright.json"  
      // ✅ Style libre (bright) copié de "https://tiles.openfreemap.org/styles/bright", mais en version locale
    />
  );
}
