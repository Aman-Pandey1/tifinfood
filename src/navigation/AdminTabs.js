import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { AdminDashboardScreen } from '../screens/admin/AdminDashboardScreen';
import { ApprovalsScreen } from '../screens/admin/ApprovalsScreen';
import { ComplaintsScreen } from '../screens/admin/ComplaintsScreen';

const Tab = createBottomTabNavigator();

export function AdminTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Dashboard" component={AdminDashboardScreen} />
      <Tab.Screen name="Approvals" component={ApprovalsScreen} />
      <Tab.Screen name="Complaints" component={ComplaintsScreen} />
    </Tab.Navigator>
  );
}

