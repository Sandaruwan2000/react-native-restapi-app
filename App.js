import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Login from "./screen/Login";
import Register from "./screen/Register";
import ViewProfile from "./screen/ViewProfile";
import Home from "./screen/Home";
import EditProfile from "./screen/EditProfile ";
import SpinAndWin from "./screen/SpinAndWin";
import SpinDataPage from "./screen/SpinDataPage";
import ProductListScreen from "./screen/ProductList";
import ProductDetailScreen from "./screen/ProductDetailScreen";
import CartScreen from "./screen/CartScreen";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="ViewProfile" component={ProductListScreen} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="SpinData" component={SpinDataPage} />
        <Stack.Screen name="Spinner" component={CartScreen} />
        <Stack.Screen name="EditProfile" component={EditProfile} />
        <Stack.Screen name="ProductDetail" component={ProductDetailScreen} />
        {/* <Stack.Screen name="Cart" component={CartScreen} /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
