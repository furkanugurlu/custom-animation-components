import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from '../screens/HomeScreen';
import DarkModeSwitch from '../screens/DarkModeSwitch';
import CustomToast from '../screens/CustomToast';
import AccordionScreen from '../screens/Accordion';
import PaginationIndicator from '../screens/PaginationIndicator';



const Stack = createNativeStackNavigator();

function MainStack() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="darkmodeswitch" component={DarkModeSwitch} />
        <Stack.Screen name="customtoast" component={CustomToast} />
        <Stack.Screen name="accordion" component={AccordionScreen} />
        <Stack.Screen name="onboradingpaginationindicator" component={PaginationIndicator} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default MainStack;
