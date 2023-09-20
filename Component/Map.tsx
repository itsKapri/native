import React from "react";
import {
  View,
  SafeAreaView,
  StyleSheet,
  Image,
} from "react-native";
import MapView, { Marker, Polyline } from "react-native-maps";

function Map() {
  const fixedLocation = {
    latitude: 19.4548,
    longitude: 72.812,
  };

  const origin = {
    latitude: 19.4581,
    longitude: 72.8049,
  };

  // Calculate the initial region for auto-zoom
  const initialRegion = {
    latitude: 19.4548,
    longitude: 72.8120,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  };

  return (
    <SafeAreaView>
      <View>
        <View style={styles.container}>
          <MapView
            provider="google"
            followsUserLocation={true}
            initialRegion={initialRegion}
            style={StyleSheet.absoluteFill}
            zoomEnabled={true}
          >
            {/* Marker for fixed location */}
            <Marker
              coordinate={{
                latitude:19.4548,
                  longitude: 72.8120,
              }}
              title="Static Location"
            />
            
            {/* Marker for user's location */}
            <Marker
              coordinate={{
                latitude: origin.latitude,
                longitude: origin.longitude,
              }}
            >
              <Image
                source={require("../assets/bus-svgrepo-com.png")}
                style={{ height: 20, width: 20, borderRadius: 2 }}
                resizeMode="cover"
              />
            </Marker>

            {/* Polyline between fixed location and user's location */}
            <Polyline
              coordinates={[
                {
                  latitude: fixedLocation.latitude,
                  longitude: fixedLocation.longitude,
                },
                {
                  latitude: origin.latitude, 
                  longitude: origin.longitude, 
                },
              ]}
              strokeColor="#000"
              strokeWidth={2}
              lineDashPattern={[6, 3]}
            />
          </MapView>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 660,
    width:334,
    borderRadius:5
  },
});

export default Map;
