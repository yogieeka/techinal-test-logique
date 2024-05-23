import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";

import { Example, Startup } from "@/screens";
import { useTheme } from "@/theme";

import type { ApplicationStackParamList } from "@/types/navigation";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";
import { ColorValue } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import UserScreen from "@/screens/Main/UserScreen";
import PostScreen from "@/screens/Main/PostScreen";
import FavoriteScreen from "@/screens/Main/FavoriteScreen";
import UserDetailScreen from "@/screens/Main/UserDetailScreen";

const Stack = createStackNavigator<ApplicationStackParamList>();
const Tab = createBottomTabNavigator();

const homeIcon = ({ color }: { color: ColorValue | number }) => (
  <Icon name="person" size={30} color={color} />
);
const networkIcon = ({ color }: { color: ColorValue | number }) => (
  <Icon name="list" size={24} color={color} />
);
const settingsIcon = ({ color }: { color: ColorValue | number }) => (
  <Icon name="bookmark" size={24} color={color} />
);

function ApplicationNavigator() {
  const { variant, navigationTheme, colors } = useTheme();

  const TabNavigation = () => {
    return (
      <Tab.Navigator
        screenOptions={{
          tabBarStyle: {
            backgroundColor: colors.cardBg,
            borderTopColor: colors?.layoutBg,
          },
          tabBarInactiveTintColor: colors.color,
          tabBarActiveTintColor: colors.primary,
          headerStyle: { backgroundColor: colors.cardBg, height: 50 },
          headerTitleAlign: "center",
          headerTitleStyle: {
            fontSize: 18,
            color: colors.primary,
            fontWeight: "bold",
          },
          tabBarShowLabel: false,
        }}
      >
        <Tab.Screen
          name="User"
          component={UserScreen}
          options={{
            tabBarIcon: homeIcon,
            tabBarTestID: "BottomTab.ToDo",
          }}
        />
        <Tab.Screen
          name="Post"
          component={PostScreen}
          options={{
            tabBarIcon: networkIcon,
            tabBarTestID: "BottomTab.Network",
          }}
        />
        <Tab.Screen
          name="Your Like"
          component={FavoriteScreen}
          options={{
            // headerShown: false,
            tabBarIcon: settingsIcon,
            tabBarTestID: "BottomTab.Settings",
          }}
        />
      </Tab.Navigator>
    );
  };

  return (
    <NavigationContainer theme={navigationTheme}>
      <Stack.Navigator key={variant} screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Startup" component={Startup} />
        <Stack.Screen name="TabNavigation" component={TabNavigation} />
        <Stack.Screen
          name="UserDetail"
          component={UserDetailScreen}
          options={{ headerShown: true }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default ApplicationNavigator;
