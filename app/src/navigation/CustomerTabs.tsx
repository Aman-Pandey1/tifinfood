import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { DiscoverScreen } from "../screens/customer/DiscoverScreen";
import { MyOrdersScreen } from "../screens/customer/MyOrdersScreen";
import { AccountScreen } from "../screens/customer/AccountScreen";

export type CustomerTabParamList = {
  Discover: undefined;
  Orders: undefined;
  Account: undefined;
};

const Tab = createBottomTabNavigator<CustomerTabParamList>();

export function CustomerTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Discover" component={DiscoverScreen} />
      <Tab.Screen name="Orders" component={MyOrdersScreen} />
      <Tab.Screen name="Account" component={AccountScreen} />
    </Tab.Navigator>
  );
}
