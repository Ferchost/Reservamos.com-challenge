import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from './src/screens/Home'
import Results from './src/screens/Results';

const Stack = createStackNavigator();

function Routes() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home"  options={{headerShown: false}} component={Home} />
        <Stack.Screen name="Results"  options={{headerShown: false}} component={Results} />

      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Routes;