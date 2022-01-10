import { createStackNavigator } from "@react-navigation/stack"
import React from "react"
import Add from "./Add"
import Home from "./Home"
import PostDetail from "./PostDetail"
import Posts from "./Posts"
import PostUpload from "./PostUpload"

export default function HomeNavigator() {
    const Stack = createStackNavigator()
    return <Stack.Navigator screenOptions={{headerShown: false, animationEnabled: false }}>
        <Stack.Screen name='홈 메인' component={Home} />
        <Stack.Screen name="게시글" component={Posts} />
        <Stack.Screen name="게시글 상세" component={PostDetail} />
        <Stack.Screen name="게시글 업로드" component={PostUpload} />
        <Stack.Screen name='게시판 추가' component={Add} />
    </Stack.Navigator>
}