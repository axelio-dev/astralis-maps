import { Camera, MapView } from '@maplibre/maplibre-react-native';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import astralisStyle from "../assets/astralis.json";

export default function MapContainer() {
  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        mapStyle={JSON.stringify(astralisStyle)}
        logoEnabled={false}
        attributionEnabled={false}
        compassEnabled={false}
      >
        <Camera zoomLevel={12} centerCoordinate={[2.3522, 48.8566]} />
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
});
