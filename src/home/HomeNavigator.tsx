import { createStackNavigator } from "@react-navigation/stack"
import React from "react"
import Home from "./Home"
import PostDetail from "./PostDetail"
import Posts from "./Posts"
import PostUpload from "./PostUpload"

export default function HomeNavigator() {
    const Stack = createStackNavigator()
    return <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name='홈 메인' component={Home} />
        <Stack.Screen name="게시글" component={Posts} />
        <Stack.Screen name="게시글 상세" component={PostDetail} />
        <Stack.Screen name="게시글 업로드" component={PostUpload} />
    </Stack.Navigator>
}