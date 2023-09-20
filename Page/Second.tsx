import React, { useEffect, useState } from "react";
import { View, StyleSheet, Dimensions, Image, Alert } from "react-native";
import MapView, { Marker, Polyline } from "react-native-maps";
import axios from "axios"; // Import Axios library
import img_logo from "../assets/edba.png";

const { height, width } = Dimensions.get("window");

const Second = (props: {
  route: {
    params: {
      driverName: string;
      selectedBus: string;
      locationData: { latitude: number; longitude: number };
    };
  };
}) => {
  const { driverName, selectedBus, locationData } = props.route.params;

  const fixedLocation = [
    {
      latitude: 19.4177,
      longitude: 72.8189,
      name: "Nallasopara",
    },
    { latitude: 19.427620, longitude: 72.841614, name: "santosh bhuvan" },
    { latitude: 19.3826, longitude: 72.8320, name: "vasai road" },
  ];

  const initialRegion = locationData
    ? {
        latitude: locationData.latitude,
        longitude: locationData.longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      }
    : null;

  const calculateDistanceInMeters = (lat1, lon1, lat2, lon2) => {
    const R = 6371000;
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLon = (lon2 - lon1) * (Math.PI / 180);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * (Math.PI / 180)) *
        Math.cos(lat2 * (Math.PI / 180)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c; // Distance in meters
    // console.log("distance----" + distance + "m");
    return distance;
  };

  const [alertShown, setAlertShown] = useState({
    lessThan2m: false,
    lessThan6m: false,
    lessThan10m: false,
  });

  useEffect(() => {
    if (locationData && fixedLocation) {
      fixedLocation.forEach((fixedLoc) => {
        const distance = calculateDistanceInMeters(
          locationData.latitude,
          locationData.longitude,
          fixedLoc.latitude,
          fixedLoc.longitude
        );

        if (distance < 200 && distance > 0 && !alertShown.lessThan2m) {
          setAlertShown({ ...alertShown, lessThan2m: true });
          // Display an alert if the distance is less than 2 meters
          Alert.alert(
            "Alert",
            `You are within 200 meters of ${fixedLoc.name}.`,
            [
              { text: "OK", onPress: () => console.log(`You are within ${distance} meters of ${fixedLoc.name}.`) },
            ]
          );
  
        } else if (distance <= 600 && distance > 200 && !alertShown.lessThan6m) {
          setAlertShown({ ...alertShown, lessThan6m: true });
          // Display an alert if the distance is between 2 and 6 meters
          Alert.alert(
            "Alert",
            `You are within 6 meters of ${fixedLoc.name}.`,
            [
              { text: "OK", onPress: () => console.log(`You are within ${distance} meters of ${fixedLoc.name}.`) },
            ]
          );
        } else if (distance <= 1000 && distance > 600 && !alertShown.lessThan10m) {
          setAlertShown({ ...alertShown, lessThan10m: true });
          // Display an alert if the distance is between 6 and 10 meters
          Alert.alert(
            "Alert",
            `You are within 10 meters of ${fixedLoc.name}.`,
            [{ text: "OK", onPress: () => console.log(`You are within ${distance} meters of ${fixedLoc.name}.`) }]
          );
        }
      });
    }
  }, [locationData, fixedLocation, alertShown]);

  // Function to send location data to the server
  const sendLocationToServer = async (latitude, longitude) => {
    try {
      // Replace with your server's URL
      const apiUrl = `https://loc-j3bu.onrender.com/api/user/${driverName}`;
      // Create the JSON payload
      const payload = JSON.stringify({
        latitude,
        longitude,
        driverName,
        busNumber: selectedBus,
      });
      const response = await axios.post(apiUrl, payload, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (response.status === 201 || response.status === 200) {
        console.log('Location data sent to server:', payload);
      } else {
        console.error('Error sending location data to server:', response.status);
      }
    } catch (error) {
      console.error('Error sending location data to server:', error);
    }
  };

  useEffect(() => {
    sendLocationToServer(locationData?.latitude, locationData?.longitude);
  }, [locationData]);

  return (
    <View style={{ flex: 1, backgroundColor: "#E4F1FF" }}>
      <View
        style={{
          height,
          width,
          borderRadius: 10,
          padding: 10,
          marginTop: 18,
          flex: 1,
        }}
      >
        <View style={styles.head_logo}>
          <Image source={img_logo} style={styles.img_logo} resizeMode="contain" />
        </View>
        <View
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
            borderColor: "black",
            borderWidth: 3,
            borderRadius: 5,
          }}
        >
          <View>
            <View style={styles.container}>
              <MapView
                provider="google"
                followsUserLocation={true}
                initialRegion={initialRegion}
                style={styles.map} // Updated style here
                zoomEnabled={true}
              >
                {/* Marker for fixed location */}
                {fixedLocation.map((loc, index) => (
                  <Marker
                    key={index}
                    coordinate={{
                      latitude: loc.latitude,
                      longitude: loc.longitude,
                    }}
                    title={loc.name}
                  />
                ))}

                {/* Marker for user's location */}
                <Marker
                  coordinate={{
                    latitude: locationData.latitude,
                    longitude: locationData.longitude,
                  }}
                  title={driverName}
                  description={selectedBus}
                >
                  <Image
                    source={require("../assets/bus-svgrepo-com.png")}
                    style={{ height: 20, width: 20, borderRadius: 2 }}
                    resizeMode="cover"
                  />
                </Marker>
                {fixedLocation.map((loc, index) => (
                  <Polyline
                    key={index}
                    coordinates={[
                      {
                        latitude: loc.latitude,
                        longitude: loc.longitude,
                      },
                      {
                        latitude: locationData.latitude,
                        longitude: locationData.longitude,
                      },
                    ]}
                    strokeColor="#000"
                    strokeWidth={2}
                    lineDashPattern={[6, 3]}
                  />
                ))}
              </MapView>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  head_logo: {
    height: "7%",
    width: "30%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "flex-start",
  },
  img_logo: {
    height: "100%",
    width: "100%",
  },
  container: {
    height: 660,
    width: 334,
    borderRadius: 5,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});

export default Second;
