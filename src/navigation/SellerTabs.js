import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { SellerMenuScreen } from '../screens/seller/SellerMenuScreen';
import { SellerOrdersScreen } from '../screens/seller/SellerOrdersScreen';
import { SellerProfileScreen } from '../screens/seller/SellerProfileScreen';

const Tab = createBottomTabNavigator();

export function SellerTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Menu" component={SellerMenuScreen} />
      <Tab.Screen name="Orders" component={SellerOrdersScreen} />
      <Tab.Screen name="Profile" component={SellerProfileScreen} />
    </Tab.Navigator>
  );
}

