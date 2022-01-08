import { createStackNavigator } from "@react-navigation/stack"
import React from "react"
import Message from "./Message"

export default function MessageNavigator() {
    const Stack = createStackNavigator()
    return <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="Message" component={Message}/>
    </Stack.Navigator>
}