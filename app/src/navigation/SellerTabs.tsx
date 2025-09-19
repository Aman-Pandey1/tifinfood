import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { SellerMenuScreen } from "../screens/seller/SellerMenuScreen";
import { SellerOrdersScreen } from "../screens/seller/SellerOrdersScreen";
import { SellerProfileScreen } from "../screens/seller/SellerProfileScreen";

export type SellerTabParamList = {
  Menu: undefined;
  Orders: undefined;
  Profile: undefined;
};

const Tab = createBottomTabNavigator<SellerTabParamList>();

export function SellerTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Menu" component={SellerMenuScreen} />
      <Tab.Screen name="Orders" component={SellerOrdersScreen} />
      <Tab.Screen name="Profile" component={SellerProfileScreen} />
    </Tab.Navigator>
  );
}
