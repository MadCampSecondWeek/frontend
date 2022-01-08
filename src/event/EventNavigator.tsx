import { createStackNavigator } from "@react-navigation/stack"
import React from "react"
import Event from "./Event"
import Scrap from "./Scrap"
import Upload from "./Upload"

export default function EventNavigator() {
    const Stack = createStackNavigator()
    return <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="이벤트 홈" component={Event} />
        <Stack.Screen name="스크랩" component={Scrap} />
        <Stack.Screen name="업로드" component={Upload} />
    </Stack.Navigator>
}