import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../Pages/HomeScreen";
import Profile from "../Pages/Profile";
import { Entypo, Feather, FontAwesome, Ionicons } from "@expo/vector-icons";
import HomeNavigator from "./HomeNavigator";
import ProfileNavigator from "./ProfileNavigator";
const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator
      headerMode="screen"
      screenOptions={{
        // headerTitle: "Test",
        // headerShown: false,
        tabBarActiveTintColor: "orange",
      }}
    >
      <Tab.Screen
        name="HomeNav"
        component={HomeNavigator}
        options={{
          title: "Home",
          //   tabBarShowLabel: false,
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <Entypo name="home" size={24} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="ProfileNav"
        component={ProfileNavigator}
        options={{
          title: "Profile",
          //   tabBarShowLabel: false,
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <FontAwesome name="user" size={24} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Collection"
        component={Profile}
        options={{
          title: "Collection",
          //   tabBarShowLabel: false,
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <Entypo name="tag" size={24} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="More"
        component={Profile}
        options={{
          title: "More",
          //   tabBarShowLabel: false,
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <Entypo name="menu" size={24} color={color} />
          ),
        }}
      />
      {/* Add more Tab.Screen components for additional tabs */}
    </Tab.Navigator>
  );
};

export default TabNavigator;
