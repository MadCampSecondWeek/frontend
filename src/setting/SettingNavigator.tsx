import { createStackNavigator } from "@react-navigation/stack"
import React from "react"
import AccountInfo from "./AccountInfo"
import DarkModeSetting from "./DarkModeSetting"
import SchoolSetting from "./SchoolSetting"
import Setting from "./Setting"

export default function SettingNavigator() {
    const Stack = createStackNavigator()
    return <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="설정 홈" component={Setting} />
        <Stack.Screen name="DarkModeSetting" component={DarkModeSetting} />
        <Stack.Screen name="AccountInfo" component={AccountInfo} />
        <Stack.Screen name="SchoolSetting" component={SchoolSetting} />
    </Stack.Navigator>
}