import React from "react"
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Login from "./Login";

export default function LoginNavigator() {
    const Stack = createStackNavigator()
    return <NavigationContainer>
        <Stack.Navigator screenOptions={{headerShown: false}}>
            <Stack.Screen name='Login' component={Login} />
        </Stack.Navigator>
    </NavigationContainer>
}