import React from "react";
import { StyleSheet, View, } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import  Map  from "../components/layout/Map";

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      <Map />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
     flex: 1,
  },
});
