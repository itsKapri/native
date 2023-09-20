// import React,{useState} from 'react';
// import { View, StyleSheet, Dimensions, Image, Text, TextInput,TouchableOpacity } from 'react-native';
// import { Picker } from "@react-native-picker/picker";
// import img_logo from '../assets/edba.png';
// import Form from '../Component/Form';
// import Map from '../Component/Map';

// const { height, width } = Dimensions.get('window');

// const Home = ({navigation}) => {
//   const [driverName, setDriverName] = useState("");
//   const [selectedBus, setSelectedBus] = useState("Select the Bus");

//   const startTracking = () => {
//     navigation.navigate("Second",{
//       driverName:driverName,
//       selectedBus:selectedBus
//     });
//   };



//   return (
//     <View style={{flex:1, backgroundColor:"#E4F1FF"}}>    
//     <View style={{ height, width, borderRadius: 10, padding:10, marginTop:18, flex:1}}>
//       <View style={styles.head_logo}>
//         <Image source={img_logo} style={styles.img_logo} resizeMode="contain" />
//       </View>
//       <View style={{flex:1,alignItems:'center',justifyContent:'center',borderColor:'black', borderWidth:3, borderRadius:5}}>
//       <View>
//       <View style={{ display: "flex", alignItems: "center" }}>
//         <Text style={{ fontWeight: "600", fontSize: 16, marginRight: 150 }}>
//           Driver name:
//         </Text>
//         <TextInput
//           placeholder="Driver Name"
//           style={styles.input}
//           value={driverName}
//           onChangeText={(text) => setDriverName(text)}
//         />
//         <Picker
//           selectedValue={selectedBus}
//           style={styles.picker}
//           onValueChange={(itemValue, itemIndex) => setSelectedBus(itemValue)}
//           mode="dropdown"
//         >
//           <Picker.Item label="Select the Bus" value="Select the Bus" />
//           <Picker.Item label="Bus 1" value="1" />
//           <Picker.Item label="Bus 2" value="2" />
//           <Picker.Item label="Bus 3" value="3" />
//         </Picker>
//         <View>
//           <TouchableOpacity
//             style={styles.buttonContainer}
//             onPress={startTracking}
//           >
//             <Text style={styles.buttonText}>Start ride</Text>
//           </TouchableOpacity>
//         </View>
//       </View>
//     </View>
//       </View>
//     </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   head_logo: {
//     height: '7%',
//     width: '30%',
//     display: 'flex',
//     flexDirection: 'row',
//     justifyContent: 'flex-start',
//     alignItems: 'flex-start',
//   },
//   img_logo: {
//     height: '100%', 
//     width: '100%', 
//   },
//   input: {
//     height: 40,
//     margin: 12,
//     width: 250,
//     borderWidth: 1,
//     padding: 10,
//     borderRadius: 5,
//   },
//   picker: {
//     width: 250,
//     height: 40,
//     borderRadius: 5,
//     marginRight: 10,
//     ...Platform.select({
//       android: {
//         backgroundColor: "transparent",
//         borderRadius: 10,
//       },
//     }),
//   },
//   buttonContainer: {
//     backgroundColor: "#FF7F50",
//     borderRadius: 7,
//     paddingVertical: 10,
//     paddingHorizontal: 20,
//     marginTop: 10,
//   },
//   buttonText: {
//     color: "#fff",
//     fontSize: 15,
//   },
// });

// export default Home;
// const startTracking = () => {
//   navigation.navigate("Second", {
//     driverName: driverName,
//     selectedBus: selectedBus,
//     locationData: locationData
//   });
// };

import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Dimensions, Image, Text, TextInput, TouchableOpacity, Platform } from 'react-native';
import { Picker } from "@react-native-picker/picker";
import img_logo from '../assets/edba.png';
import * as Location from 'expo-location';

const { height, width } = Dimensions.get('window');

const Home = ({ navigation }) => {
  const [driverName, setDriverName] = useState("");
  const [selectedBus, setSelectedBus] = useState("Select the Bus");
  const [isTracking, setIsTracking] = useState(false);
  const [locationData, setLocationData] = useState(null);
  const [locationSubscription, setLocationSubscription] = useState(null);

  useEffect(() => {
    return () => {
      if (locationSubscription) {
        locationSubscription.remove();
      }
    };
  }, []);


useEffect(()=>{
  if(locationData){
    navigation.navigate("Second", {
          driverName: driverName,
          selectedBus: selectedBus,
          locationData: locationData
        });
  }
},[driverName,selectedBus,locationData])

  const startLocationTracking = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.log("Permission to access location was denied");
        return;
      }

      setIsTracking(true);
      const subscription = await Location.watchPositionAsync(
        {
          accuracy: Location.Accuracy.BestForNavigation,
          timeInterval: 1000,
          distanceInterval: 0.5,
        },
        (location) => {
          const { latitude, longitude } = location.coords;
          setLocationData({ latitude, longitude });
          console.log(`locationData.latitude-${latitude}, locationData.longitude-${longitude}`);
        }
      );
      setLocationSubscription(subscription);
    } catch (error) {
      console.error("Error while tracking location:", error);
    }
  };

  const stopLocationTracking = () => {
    if (locationSubscription) {
      locationSubscription.remove();
    }
    setIsTracking(false);
  };

  const handleStartTracking = () => {
    if (isTracking) {
      stopLocationTracking();
    } else {
      startLocationTracking();
      // startTracking();
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#E4F1FF" }}>
      <View style={{ height, width, borderRadius: 10, padding: 10, marginTop: 18, flex: 1 }}>
        <View style={styles.head_logo}>
          <Image source={img_logo} style={styles.img_logo} resizeMode="contain" />
        </View>
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', borderColor: 'black', borderWidth: 3, borderRadius: 5 }}>
          <View>
            <View style={{ display: "flex", alignItems: "center" }}>
              <Text style={{ fontWeight: "600", fontSize: 16, marginRight: 150 }}>
                Driver name:
              </Text>
              <TextInput
                placeholder="Driver Name"
                style={styles.input}
                value={driverName}
                onChangeText={(text) => setDriverName(text)}
              />
              <Picker
                selectedValue={selectedBus}
                style={styles.picker}
                onValueChange={(itemValue, itemIndex) => setSelectedBus(itemValue)}
                mode="dropdown"
              >
                <Picker.Item label="Select the Bus" value="Select the Bus" />
                <Picker.Item label="Bus 1" value="1" />
                <Picker.Item label="Bus 2" value="2" />
                <Picker.Item label="Bus 3" value="3" />
              </Picker>
              <View>
                <TouchableOpacity
                  style={styles.buttonContainer}
                  onPress={handleStartTracking}
                >
                  <Text style={styles.buttonText}>{isTracking ? "Stop Tracking" : "Start Tracking"}</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  head_logo: {
    height: '7%',
    width: '30%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  img_logo: {
    height: '100%',
    width: '100%',
  },
  input: {
    height: 40,
    margin: 12,
    width: 250,
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
  },
  picker: {
    width: 250,
    height: 40,
    borderRadius: 5,
    marginRight: 10,
    ...Platform.select({
      android: {
        backgroundColor: "transparent",
        borderRadius: 10,
      },
    }),
  },
  buttonContainer: {
    backgroundColor: "#FF7F50",
    borderRadius: 7,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginTop: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 15,
  },
});

export default Home;

