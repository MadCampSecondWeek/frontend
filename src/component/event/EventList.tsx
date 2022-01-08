import { useNavigation } from '@react-navigation/native'
import axios from 'axios'
import React, { useState } from 'react'
import { useEffect } from 'react'
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { useContextOfAll } from '../../Provider'

export default function EventList() {
    const [data, setData] = useState(initData())

    useEffect(() => { getJSON(setData) }, [])

    const renderItem = ({ item }) => (
        <Item currentData={item} />
    )

    const Item = ({ currentData }) => (
        <View>
            {/* <Text style={styles.title}>{currentData.title}</Text> */}
            <Text style={{ color: 'white' }}>{currentData.content}</Text>
            <Text style={{ color: 'white' }}>{currentData.writer}</Text>
        </View>
    );

    return <View>
        <FlatList
            data={data}
            renderItem={renderItem}
            keyExtractor={item => item._id}
        />
    </View>
}

function getJSON(setData) {
    axios({
        method: 'get',
        url: 'http://192.249.18.79/board'
    })
        .then(function (response) {
            // console.log(response.data)
            console.log(typeof response.data)
            console.log("response 받기 성공")
            setData(() => response.data)
        })
        .catch(function (error) {
            console.log(error);
        })
}

function initData() {
    return [
        {
            _id: "0",
            title: "제목0",
            content: "내용0",
            time: "시간0"
        },
        {
            _id: '1',
            title: "제목1",
            content: "내용1",
            time: "시간1"
        },
        {
            _id: '2',
            title: "제목2",
            content: "내용2",
            time: "시간2"
        },
        {
            _id: '3',
            title: "제목3",
            content: "내용3",
            time: "시간3"
        },
        {
            _id: '4',
            title: "제목4",
            content: "내용4",
            time: "시간4"
        }
    ]

    // [
    //     {
    //         _id: "0",
    //         title: "제목0",
    //         content: "내용0",
    //         writer: "스트링",
    //         likeCount: 1,
    //         commentCount: 2,
    //         createdAt: "스트링"
    //     }]
}