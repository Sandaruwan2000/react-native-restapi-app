import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import AsyncStorage from '@react-native-async-storage/async-storage';
import Home from "./screen/Home";
import ProductListScreen from "./screen/ProductList";
import ProductDetailScreen from "./screen/ProductDetailScreen";
import CartScreen from "./screen/CartScreen";
import CartdetailsScreen from "./screen/CartdetailsScreen";
import SignupScreen from "./screen/SignupScreen";
import BinScreen from "./screen/BinScreen";
import NotificationScreen from "./screen/NotificationScreen";
import ProfileScreen from "./screen/ProfileScreen";
import Login from "./screen/Login";
import Icon from 'react-native-vector-icons/Ionicons';
import BinlevelScreen from "./screen/BinlevelScreen";
import { ActivityIndicator, View } from "react-native"; 
import PlasticScreen from "./screen/PlasticScreen";
import SuggestionScreen from "./screen/SuggestionScreen";
import TaskScreen from "./screen/TaskScreen";
import RankScreen from "./screen/RankScreen";
import PreTaskScreen from "./screen/PreTaskScreen";
import BuyerScreen from "./screen/BuyerScreen";
import StartScreen from "./screen/StartScreen";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function MainTabNavigator({ route }) {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = 'home-outline';  
          } else if (route.name === 'Bin') {
            iconName = 'trash-outline';  
          } else if (route.name === 'Notifications') {
            iconName = 'notifications-outline';  
          } else if (route.name === 'Profile') {
            iconName = 'person-outline';  
          }

          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#008000', 
        tabBarInactiveTintColor: '#808080', 
      })}
      tabBarOptions={{
        
      }}
    >
      <Tab.Screen 
        name="Home" 
        component={Home} 
        initialParams={{ userEmail: route.params?.userEmail }} 
      />
      <Tab.Screen 
        name="Bin" 
        component={BinlevelScreen} 
        initialParams={{ userEmail: route.params?.userEmail }} 
      />
      <Tab.Screen 
        name="Notifications" 
        component={NotificationScreen} 
        initialParams={{ userEmail: route.params?.userEmail }} 
      />
      <Tab.Screen 
        name="Profile" 
        component={ProfileScreen} 
        initialParams={{ userEmail: route.params?.userEmail }} 
      />
    </Tab.Navigator>
  );
}

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true); // Add loading state

  // Check if the user is logged in
  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const value = await AsyncStorage.getItem('isLoggedIn');
        if (value !== null && value === 'true') {
          setIsLoggedIn(true);
        }
      } catch (e) {
        console.error("Error checking login status:", e); // Improved error logging
      } finally {
        setLoading(false); // Finish loading after checking
      }
    };
    checkLoginStatus();
  }, []);

  if (loading) {
    // Display a loading spinner while checking login status
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#008000" /> {/* Fixed color value */}
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={isLoggedIn ? "Main" : "StartScreen"}>
        <Stack.Screen 
          name="Main" 
          component={MainTabNavigator} 
          options={{ headerShown: false }} 
        />
        <Stack.Screen 
          name="ProductList" 
          component={ProductListScreen} 
        />
        <Stack.Screen 
          name="ProductDetail" 
          component={ProductDetailScreen} 
        />
        <Stack.Screen 
          name="CartDetail" 
          component={CartdetailsScreen} 
        />
        <Stack.Screen 
          name="Cart" 
          component={CartScreen} 
        />
        <Stack.Screen 
          name="CreateBin" 
          component={BinScreen} 
        />
        <Stack.Screen 
          name="Signup" 
          component={SignupScreen} 
        />
        <Stack.Screen 
          name="Signin" 
          component={Login} 
        />
        <Stack.Screen 
          name="PlasticScreen" 
          component={PlasticScreen} 
        />
        <Stack.Screen 
          name="Suggestion" 
          component={SuggestionScreen} 
        />
        <Stack.Screen 
          name="Game" 
          component={TaskScreen} 
        />
        <Stack.Screen 
          name="Rank" 
          component={RankScreen} 
        />

        <Stack.Screen 
          name="PreTaskScreen" 
          component={PreTaskScreen} 
        />

        <Stack.Screen 
          name="BuyerScreen" 
          component={BuyerScreen} 
        />

        <Stack.Screen 
          name="StartScreen" 
          component={StartScreen} 
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
