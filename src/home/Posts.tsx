import { useNavigation } from "@react-navigation/native"
import axios from "axios"
import React, { useEffect } from "react"
import { useState } from "react"
import { StyleSheet, Text, TouchableOpacity, View } from "react-native"
import Icon from "react-native-vector-icons/MaterialCommunityIcons"
import { useContextOfAll } from "../Provider"

export default function Posts({ route }) {
    const [data, setData] = useState([{ _id: "123123", title: "제목 0", content: "내용0", likeCount: 3, commentCount: 1 }])
    // const [ld, setLd] = useState(true)
    const cont = useContextOfAll()
    const navi = useNavigation<any>()

    const styles = StyleSheet.create({
        titleView: {
            flexDirection: 'row',
            alignItems: 'center',
            paddingTop: 10
        },
        title: {
            fontSize: 20, color: cont.setting.theme.colors.text,
            fontWeight: 'bold'
        },
        postView: {
            padding: 5, borderBottomWidth: 1,
            borderColor: cont.setting.theme.colors.border,
            margin: 5
        },
        post: {
            fontSize: 15, color: cont.setting.theme.colors.text,
            fontWeight: 'bold'
        },
        content: {
            fontSize: 14, color: cont.setting.theme.colors.text
        },
        count: {
            fontSize: 13, color: cont.setting.theme.colors.text,
            marginHorizontal: 3
        },
        countView: {
            marginHorizontal: 3, flexDirection: 'row', alignItems: 'center'
        }
    })

    useEffect(() => { getJSON(setData) }, [])

    // if (ld) return <Text>로딩 중</Text>

    return <View>
        <View style={styles.titleView}>
            <TouchableOpacity onPress={() => { navi.goBack() }} style={{ paddingHorizontal: 5 }}>
                <Icon name='chevron-left' color={cont.setting.theme.colors.text} size={30} />
            </TouchableOpacity>
            <Text style={styles.title}>{route.params.name}</Text>
            <TouchableOpacity style={{ marginLeft: 'auto', paddingRight: 10 }}
                onPress={() => navi.navigate("게시글 업로드")}>
                <Icon name='pencil-outline' size={25} color='royalblue' />
            </TouchableOpacity>
        </View>
        {data.map((v) => <TouchableOpacity key={v._id} style={styles.postView}
            onPress={() => { navi.navigate("게시글 상세", { _id: v._id }) }}>
            <Text style={styles.post}>{v.title}</Text>
            <Text style={styles.content}>{v.content}</Text>
            <View style={{ justifyContent: 'flex-end', flexDirection: 'row', alignItems: 'center' }}>
                <View style={styles.countView}>
                    <Icon name='heart-outline' color='red' size={16} />
                    <Text style={styles.count}>{v.likeCount}</Text></View>
                <View style={styles.countView}>
                    <Icon name='comment-processing-outline' color='cyan' size={16} />
                    <Text style={styles.count}>{v.commentCount}</Text></View>
            </View>
        </TouchableOpacity>
        )}
    </View>
}

function getJSON(setData) {
    axios({
        method: 'get',
        url: 'http://172.10.5.54/board'
    })
        .then(function (response) {
            setData(response.data)
            // setLd(false)
            console.log(response.data)
        })
        .catch(function (error) {
            setData([{ _id: "123123", title: "제목 0", content: "내용0", likeCount: 3, commentCount: 1 }])
            console.log(error);
        })
    // return [
    //     {
    //         _id: "123123",
    //         title: "제목 0",
    //         content: "내용0",
    //         likeCount: 3,
    //         commentCount: 1
    //     },
    //     {
    //         _id: "124124",
    //         title: "제목 1",
    //         content: "내용 1",
    //         likeCount: 3,
    //         commentCount: 1
    //     },
    //     {
    //         _id: "125125",
    //         title: "제목 2",
    //         content: "내용 2",
    //         likeCount: 3,
    //         commentCount: 1
    //     },
    //     {
    //         _id: "126126",
    //         title: "제목 3",
    //         content: "내용 3",
    //         likeCount: 3,
    //         commentCount: 1
    //     },
    //     {
    //         _id: "127127",
    //         title: "제목 4",
    //         content: "내용 4",
    //         likeCount: 3,
    //         commentCount: 1
    //     }
    // ]
}