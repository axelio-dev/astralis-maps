import React from "react";
import { Stack } from "expo-router";
import { LocationProvider } from "../contexts/LocationContext";

export default function Layout() {
  return (
    <LocationProvider>
      <Stack screenOptions={{ headerShown: false }} />
    </LocationProvider>
  );
}
