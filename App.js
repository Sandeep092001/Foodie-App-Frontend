import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Homescreen from "./Screen/Homescreen";
import RestaurantScreen from "./Screen/RestaurantScreen";
import BasketScreen from "./Screen/BasketScreen";
import { Provider } from "react-redux";
import { store } from "./store";
import PreparingOrderScreen from "./Screen/PreparingOrderScreen";
import DeliveryScreen from "./Screen/DeliveryScreen";
import Login from "./Screen/Login";
import Signup from "./Screen/Signup";
import {decode, encode} from 'base-64';

if(!global.btoa){
  global.btoa = encode;
}
if(!global.atob){
  global.atob = decode;
}

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Provider store={store}>
        <Stack.Navigator>
          <Stack.Screen name="Signup" component={Signup} options={{headerShown: false}} />
          <Stack.Screen name="Login" component={Login} options={{headerShown: false}} />
          <Stack.Screen name="Home" component={Homescreen} />
          <Stack.Screen name="Restaurant" component={RestaurantScreen} />
          <Stack.Screen
            name="Basket"
            component={BasketScreen}
            options={{
              presentation: "modal",
              headerShown: false,
            }}
          />
          <Stack.Screen name="PreparingOrderScreen" component={PreparingOrderScreen} 
           options={{presentation: 'fullScreenModal', headerShown: false}}
          />
          <Stack.Screen name="DeliveryScreen" component={DeliveryScreen} 
           options={{presentation: 'fullScreenModal', headerShown: false}}
          />
        </Stack.Navigator>
      </Provider>
      {/* <Text className='text-red-500'>Homescreen</Text> */}
    </NavigationContainer>
  );
}
