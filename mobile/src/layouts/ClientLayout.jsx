import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { HomeProvider } from "../contexts/HomeProvider";
import ProfileScreen from "../screens/home/ProfileScreen";
import HomeScreen from "../screens/home/HomeScreen";
import DemandeForm from "../screens/home/DemandeForm";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function ClientLayout() {
  return (
    <HomeProvider>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen}  />
        <Stack.Screen name="Profile" component={ProfileScreen} />
        <Stack.Screen name="DemandeForm" component={DemandeForm} />
      </Stack.Navigator>
    </HomeProvider>
  );
}

export default ClientLayout;
