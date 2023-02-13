import { NavigationContainer } from "@react-navigation/native";

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Provider } from "react-redux";
import routes from "./constants/routes.constant";
import BasketScreen from "./screens/BasketScreen";
import DeliveryScreen from "./screens/DeliveryScreen";
import HomeScreen from "./screens/HomeScreen";
import PreparingOrderScreen from "./screens/PreparingOrderScreen";
import RestuarantScreen from "./screens/RestuarantScreen";
import store from "./store";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Provider store={store}>
        <SafeAreaProvider>
          <Stack.Navigator>
            <Stack.Screen name={routes.HomeRoute} component={HomeScreen} />
            <Stack.Screen name={routes.RestuarantRoute} component={RestuarantScreen} />
            <Stack.Screen name={routes.BasketRoute} component={BasketScreen} options={{
              presentation: 'modal',
              headerShown: false
            }} />
            <Stack.Screen name={routes.PreparingOrderRoute} component={PreparingOrderScreen} options={{
              presentation: 'fullScreenModal',
              headerShown: false
            }} />
            <Stack.Screen name={routes.DeliveryRoute} component={DeliveryScreen} options={{
              presentation: 'fullScreenModal',
              headerShown: false
            }} />
          </Stack.Navigator>
        </SafeAreaProvider>
      </Provider>
    </NavigationContainer>
  );
}
