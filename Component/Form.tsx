import React, { useState } from "react";
import {
  View,
  StyleSheet,
  TextInput,
  Text,
  TouchableOpacity,
  Platform,
} from "react-native";
import { Picker } from "@react-native-picker/picker"; 

const Form = ({navigation}) => {
  const [driverName, setDriverName] = useState("");
  const [selectedBus, setSelectedBus] = useState("Select the Bus");

  const startTracking = () => {
    navigation.navigate("Second",{
      driverName:driverName,
      selectedBus:selectedBus
    });
  };

  return (
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
            onPress={startTracking}
          >
            <Text style={styles.buttonText}>Start ride</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
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

export default Form;
