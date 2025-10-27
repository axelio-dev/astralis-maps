import React from "react";
import { MapView } from "@maplibre/maplibre-react-native";

export default function Map() {
  return <MapView style={{ flex: 1 }} mapStyle={require("../../assets/styles/bright.json")} />;
}