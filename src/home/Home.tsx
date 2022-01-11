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
    const [loading, setLoading] = useState(true)
    const cont = useContextOfAll()

    const navi = useNavigation<any>()

    useEffect(() => {
        const reload = navi.addListener('focus', () => {
            getJSON(setData, setLoading, cont)
        });
        return reload;
    }, [navi]);

    return <View style={{ flex: 1 }}>
        <Text style={{
            fontSize: 20, fontWeight: 'bold',
            color: cont.setting.theme.colors.text,
            margin: 15
        }}>
            {cont.user.school}</Text>
        {loading ? <View /> :
            <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
                {EventCards(data.eventBoard, cont, navi)}
                {PostList(data.boards, cont)}
                {BestPost(data.todayPopularBoard, cont)}
                {HotPost(data.hotBoard, cont)}
            </ScrollView>}
    </View>
}

function getJSON(setData, setLoading, cont) {
    axios({
        method: 'get',
        url: 'http://192.249.18.79/'
    })
        .then(function (response) {
            setData(response.data)
            setLoading(false)
            cont.setUser(() => {
                return {
                    _id: '61d87ae9fe46c6f094b969fe',
                    school: response.data.school,
                    pinnedPost: ["게시판0", "게시판1", "게시판2, 게시판3", "게시판4"]
                }
            })
        })
        .catch(function (error) {
            console.log(error);
        })
}

function initState() {
    return {
        boards: [
            // {
            //     _id: "아이디",
            //     title: '',
            //     school: 2100,
            //     idx: 30,
            //     recentPost: '',
            // }
        ],
        hotBoard: [
            // {
            //     _id: '아이디',
            //     board: {
            //         _id: '아이디',
            //         title: ''
            //     },
            //     title: '',
            //     content: '',
            //     likeCount: 100,
            //     commentCount: 10
            // }
        ],
        todayPopularBoard: [
            // {
            //     _id: '아이디',
            //     board: {
            //         _id: '아이디',
            //         title: ''
            //     },
            //     title: '',
            //     content: '',
            //     likeCount: 100,
            //     commentCount: 10
            // }
        ],
        eventBoard: [

        ],
        school: '몰입캠프'

    }
    // return [
    //     {
    //         _id: 0,
    //         title: '게시판명0',
    //         recentPost: '내용0내용0내용0내용0내용0내용0내용0내용0내용0내용0내용0내용0내용0내용0',
    //     },
    //     {
    //         _id: 1,
    //         title: '게시판명1',
    //         recentPost: '내용1',
    //     },
    //     {
    //         _id: 2,
    //         title: '게시판명2',
    //         recentPost: '내용2',
    //     },
    //     {
    //         _id: 3,
    //         title: '게시판명3',
    //         recentPost: '내용3',
    //     },
    //     {
    //         _id: 4,
    //         title: '게시판명4',
    //         recentPost: '내용4',
    //     }
    // ]
}