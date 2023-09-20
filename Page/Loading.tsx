import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Dimensions, Image, TouchableOpacity, Text } from 'react-native';
import img_logo from '../assets/edba.png';

const { height, width } = Dimensions.get('window');

const Home = ({navigation}) => {
  const [progressWidth, setProgressWidth] = useState(0);


  const homepage=()=>{
    navigation.navigate("home");
  }
  useEffect(() => {
    const interval = setInterval(() => {
      if (progressWidth < 100) {
        setProgressWidth(progressWidth + 10);
      } else {
        clearInterval(interval);
      }
    }, 100);

    return () => clearInterval(interval);
  }, [progressWidth]);

  return (
    <View style={{ height, width, backgroundColor:'#E4F1FF', flex:1 }}>
      <View style={styles.head_logo}>
        <Image source={img_logo} />
        <View style={styles.progress}>
          <View style={[styles.color, { width: `${progressWidth}%` }]} />
          {/* Add the "Continue" button */}
          <TouchableOpacity style={styles.continueButton}
          onPress={homepage}
          >
            <Text style={styles.buttonText}>Continue</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  head_logo: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  progress: {
    height: 12,
    width: '80%',
    backgroundColor: '#f4a261',
    borderRadius: 15,
    marginTop: 20,
    display: 'flex',
    justifyContent: 'center',
    position: 'relative', 
  },
  color: {
    height: '80%',
    backgroundColor: '#ffffff',
    borderRadius: 15,
  },
  continueButton: {
    position: 'absolute',
    top:275,
    width: '100%',
    backgroundColor: '#f4a261',
    borderRadius: 15,
    padding: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default Home;
