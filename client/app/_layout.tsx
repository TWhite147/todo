import { Provider } from "react-redux";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { AuthProvider } from "./(context)/AuthContext";
import RootNavigator from "./(navigation)/RootNavigator";
import store from "@/store/store";

const App = () => {
  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <AuthProvider>
          <RootNavigator />
        </AuthProvider>
      </SafeAreaProvider>
    </Provider>
  );
};

export default App;
