import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native"; // Import NavigationContainer
import AuthLayout from "./src/layouts/AuthLayout";
import GlobalProvider, {
  useGlobalContext,
} from "./src/contexts/GlobalProvider";
import ClientLayout from "./src/layouts/ClientLayout";

const Stack = createStackNavigator();

export default function App() {
  const { token } = useGlobalContext();
  return (
    <NavigationContainer>
      <GlobalProvider>
        <Stack.Navigator initialRouteName="Auth">
          <Stack.Screen name="Auth" component={AuthLayout} options={{ headerShown: false }} />
          <Stack.Screen name="Client" component={ClientLayout} options={{ headerShown: false }} />
        </Stack.Navigator>
      </GlobalProvider>
    </NavigationContainer>
  );
}
