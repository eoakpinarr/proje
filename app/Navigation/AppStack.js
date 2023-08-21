import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { COLORS } from '../Component/Constant/Color';
import Home from '../Screen/Home';
import AllUser from '../Screen/User/AllUser';
import SingleChat from '../Screen/Home/SingleChat';
const Stack = createNativeStackNavigator();

export default function AuthStack() {
  return (
    <Stack.Navigator 
    screenOptions={{
      cardStyle :{ backgroundColor: COLORS.button},
      gestureEnabled: true,
      backgroundColor:COLORS.button,
      gestureDirection: 'horizontal',
    }}
    initialRouteName="Home">
        <Stack.Screen name="Home" component={Home} options={{headerTitle: 'SwiftMessage'}} />
        <Stack.Screen name="AllUser" component={AllUser} />
        <Stack.Screen name="SingleChat" component={SingleChat} options={{headerShown: false}}/>
    </Stack.Navigator>
  );
}