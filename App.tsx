import { StatusBar as ExpoStatusBar } from "expo-status-bar"
import { StyleSheet } from "react-native"
import { NavigationContainer } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import HomeView from "./Modules/Home/HomeView"
import { Ionicons } from "@expo/vector-icons"
import NewsDetails from "./Modules/NewsDetails/NewsDetailsView"
import SettingsView from "./Modules/Settings/SettingsView"

const stack = createNativeStackNavigator()
function StackNavigation() {
  return (
    <stack.Navigator
      screenOptions={{
        headerTintColor: "white",
        headerShadowVisible: false,
      }}>
      <stack.Screen
        name="bottonTab"
        component={BottomTabNavigation}
        options={{
          headerShown: false,
        }}
      />
      <stack.Screen name="newsDetails" component={NewsDetails} />
    </stack.Navigator>
  )
}

const bottomTab = createBottomTabNavigator()
function BottomTabNavigation() {
  return (
    <bottomTab.Navigator
      screenOptions={{
        headerTintColor: "white",
        headerShadowVisible: false,
      }}>
      <bottomTab.Screen
        name="home"
        component={HomeView}
        options={{
          tabBarIcon: ({ size, color }) => (
            <Ionicons name="home-sharp" color={color} size={size} />
          ),
        }}
      />
      <bottomTab.Screen
        name="settings"
        component={SettingsView}
        options={{
          tabBarIcon: ({ size, color }) => (
            <Ionicons name="menu" color={color} size={size} />
          ),
        }}
      />
    </bottomTab.Navigator>
  )
}

export default function App() {
  return (
    <NavigationContainer>
      <ExpoStatusBar style="auto" />
      <StackNavigation />
    </NavigationContainer>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
})
