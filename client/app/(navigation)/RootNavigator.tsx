import { createStackNavigator } from "@react-navigation/stack";
import { useAuth } from "../(context)/AuthContext";
import LoginScreen from "../(tabs)/LoginScreen";
import TodoScreen from "../(tabs)";
import SignupScreen from "../(tabs)/SignupScreen";

const Stack = createStackNavigator();

const RootNavigator = () => {
  const { user } = useAuth();

  return (
    <Stack.Navigator>
      {user ? (
        <Stack.Screen name="Todos" component={TodoScreen} />
      ) : (
        <>
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Signup" component={SignupScreen} />
        </>
      )}
    </Stack.Navigator>
  );
};

export default RootNavigator;
