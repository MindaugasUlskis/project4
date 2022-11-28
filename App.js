import * as React from 'react';
import { Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/MaterialCommunityIcons';

import ProductList from './screens/ProductListScreen';
import ScanScreen from './screens/ScanScreen';


const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Scan') {
              iconName = focused
                ? 'barcode-scan'
                : 'barcode-scan';
            } else if (route.name === 'Products') {
              iconName = focused ? 'clipboard-list-outline' : 'clipboard-list-outline';
            }

            // You can return any component that you like here!
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: 'tomato',
          tabBarInactiveTintColor: 'gray',
          headerShown: false
        })}
      >
        <Tab.Screen name="Scan" component={ ScanScreen} />
        <Tab.Screen name="Products" component={ProductList} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}