import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import More from "../../Pages/BusinessOwnerPages/More";
import HomeScreen from "../../Pages/HomeScreen";
import TabNavigator from "./TabNavigator";

const Stack = createStackNavigator();
import { useBusinessTab } from "../../context/BusinessTabContext";

const MoreNavB = () => {
  const { businessTab } = useBusinessTab();
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="More"
        component={More}
        options={{ headerShown: false }}
      />
      {/* {businessTab && (
        <Stack.Screen
          name="TabNav"
          component={TabNavigator}
          options={{ headerShown: false }}
        />
      )} */}
      {/* <Stack.Screen
        name="EditUserProfile"
        component={}
        options={{ headerShown: false }}
      /> */}

      {/* Add more Stack.Screen components for additional screens */}
    </Stack.Navigator>
  );
};

export default MoreNavB;
