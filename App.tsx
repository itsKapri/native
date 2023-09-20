import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { View } from 'react-native';
import Home from './Page/Home';
import Map from './Component/Map';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import Loading from './Page/Loading'
import Second from './Page/Second';
const Stack=createNativeStackNavigator();

export default function App() {
  // const isDarkMode=useColorScheme()=== 'dark';


  return (
    // <View style={{backgroundColor:'#E4F1FF'}} >
    //   <Home/>
    //   {/* <StatusBar style='light'/> */}
    

    // </View>
    <NavigationContainer>
      <Stack.Navigator
       screenOptions={{headerShown:false}}>
         <Stack.Screen
        name='Welcome'
          component={Loading}
        />
        <Stack.Screen
        name='home'
          component={Home}
        />
        <Stack.Screen
        name='Second'
        component={Second}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
