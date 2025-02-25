import React from "react";

import AuthProvider from "../contexts/AuthProvider";
import LoginScreen from "../screens/auth/LoginScreen";
import RegisterScreen from "../screens/auth/RegisterScreen";
import { createStackNavigator } from "@react-navigation/stack";
import ForgetPassword from "../screens/auth/ForgetPassword";
import CodeValidation from "../screens/auth/CodeValidation";
import NewPassword from "../screens/auth/NewPassword";

const Stack = createStackNavigator();

function AuthLayout({ navigation }) {
  return (
    <AuthProvider>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="ForgetPassword" component={ForgetPassword} />
        <Stack.Screen name="CodeValidation" component={CodeValidation} />
        <Stack.Screen name="NewPassword" component={NewPassword} />
      </Stack.Navigator>
    </AuthProvider>
  );
}

export default AuthLayout;
