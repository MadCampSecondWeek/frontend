import React from "react"
import { NavigationContainer } from "@react-navigation/native"
import { createStackNavigator } from "@react-navigation/stack"
import SignUpPage from "./SignUp"
import LoginPage from "./Login"
import SchoolSearch from "./SchoolSearch"

export default function LoginNavigator() {
    const Stack = createStackNavigator()
    return <NavigationContainer>
        <Stack.Navigator screenOptions={{headerShown: false}}>
            <Stack.Screen name='Login' component={LoginPage} />
            <Stack.Screen name='SignUp' component={SignUpPage} />
            <Stack.Screen name='SchoolSearch' component={SchoolSearch} />
        </Stack.Navigator>
    </NavigationContainer>
}