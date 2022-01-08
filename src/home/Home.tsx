import React from "react"
import { ScrollView, Text, View } from "react-native"
import BestPost from "../component/home/BestPost"
import EventCards from "../component/home/EventCards"
import PostList from "../component/home/PostList"
import { useContextOfAll } from "../Provider"
import HotPost from "../component/home/HotPost"

export default function Home() {
    const cont = useContextOfAll()
    return <View style={{flex: 1}}>
        <Text style={{
            fontSize: 20, fontWeight: 'bold',
            color: cont.setting.theme.colors.text,
            margin: 15
        }}>
            {cont.user.school}</Text>
        <ScrollView style={{flex: 1}} showsVerticalScrollIndicator={false}>
            <EventCards />
            <PostList />
            <BestPost />
            <HotPost />
        </ScrollView>
    </View>
}