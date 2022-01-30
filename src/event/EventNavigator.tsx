import { createStackNavigator } from "@react-navigation/stack"
import React from "react"
import CommentPage1 from "./CommentPage1"
import CommentPage2 from "./CommentPage2"
import CommentPage2_2 from "./CommentPage2_2"
import Event from "./Event"
import EventDetail from "./EventDetail"
import HostPage from "./HostPage"
import Scrap from "./Scrap"
import Upload from "./Upload"

export default function EventNavigator() {
    const Stack = createStackNavigator()
    return <Stack.Navigator screenOptions={{headerShown: false, animationEnabled: false}} initialRouteName='이벤트 홈'>
        <Stack.Screen name="이벤트 홈" component={Event} />
        <Stack.Screen name="스크랩" component={Scrap} />
        <Stack.Screen name="업로드" component={Upload} />
        <Stack.Screen name="이벤트 정보" component={EventDetail} />
        <Stack.Screen name='이벤트 댓글1' component={CommentPage1} />
        <Stack.Screen name='이벤트 댓글2' component={CommentPage2} />
        <Stack.Screen name='이벤트 댓글2_2' component={CommentPage2_2} />
        <Stack.Screen name='HostPage' component={HostPage} />
    </Stack.Navigator>
}