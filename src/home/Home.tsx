import React, { useEffect, useState } from "react"
import { ScrollView, Text, View } from "react-native"
import BestPost from "../component/home/BestPost"
import EventCards from "../component/home/EventCards"
import PostList from "../component/home/PostList"
import { useContextOfAll } from "../Provider"
import HotPost from "../component/home/HotPost"
import axios from "axios"
import { useNavigation } from "@react-navigation/native"

export default function Home() {
    const [data, setData] = useState(initState())
    const cont = useContextOfAll()

    const navi = useNavigation<any>()

    useEffect(() => {
        const reload = navi.addListener('focus', () => {
            getJSON(setData)
        });
        return reload;
    }, [navi]);
    
    return <View style={{flex: 1}}>
        <Text style={{
            fontSize: 20, fontWeight: 'bold',
            color: cont.setting.theme.colors.text,
            margin: 15
        }}>
            {cont.user.school}</Text>
        <ScrollView style={{flex: 1}} showsVerticalScrollIndicator={false}>
            <EventCards />
            {PostList(data)}
            <BestPost />
            <HotPost />
        </ScrollView>
    </View>
}

function getJSON(setData) {
    axios({
        method: 'get',
        url: 'http://192.249.18.79/'
    })
        .then(function (response) {
            setData(response.data)
            console.log(response.data)
        })
        .catch(function (error) {
            console.log(error);
        })
}


function initState() {
    return [
        {
            _id: 0,
            title: '게시판명0',
            recentPost: '내용0내용0내용0내용0내용0내용0내용0내용0내용0내용0내용0내용0내용0내용0',
        },
        {
            _id: 1,
            title: '게시판명1',
            recentPost: '내용1',
        },
        {
            _id: 2,
            title: '게시판명2',
            recentPost: '내용2',
        },
        {
            _id: 3,
            title: '게시판명3',
            recentPost: '내용3',
        },
        {
            _id: 4,
            title: '게시판명4',
            recentPost: '내용4',
        }
    ]
}