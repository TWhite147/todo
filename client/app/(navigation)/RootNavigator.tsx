import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { useAuth } from "../(context)/AuthContext";
import LoginScreen from "../(tabs)/LoginScreen";
import TodoScreen from "../(tabs)";

const Stack = createStackNavigator();

const RootNavigator = () => {
  const { user } = useAuth();

  return (
    <Stack.Navigator>
      {!user ? (
        <Stack.Screen name="Login" component={LoginScreen} />
      ) : (
        <Stack.Screen name="Todos" component={TodoScreen} />
      )}
    </Stack.Navigator>
  );
};

export default RootNavigator;
