import React from "react";
import { StyleSheet, View } from "react-native";
import { Map } from "../components/layout/Map";

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Map />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
     flex: 1, // Le conteneur prend tout l’espace disponible de l’écran
  },
});
