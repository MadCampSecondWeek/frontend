import { useNavigation } from "@react-navigation/native"
import axios from "axios"
import React, { useEffect } from "react"
import { useState } from "react"
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import Icon from "react-native-vector-icons/MaterialCommunityIcons"
import { BackButton } from "../component/util"
import { useContextOfAll } from "../Provider"

export default function Posts({ route }) {
    const [data, setData] = useState(initState())
    const [loading, setLoading] = useState(true)
    const cont = useContextOfAll()
    const navi = useNavigation<any>()

    const styles = StyleSheet.create({
        titleView: {
            flexDirection: 'row',
            alignItems: 'center',
            padding: 10
        },
        title: {
            fontSize: 18, color: cont.setting.theme.colors.text,
            fontWeight: 'bold', padding: 10
        },
        postView: {
            padding: 15, borderBottomWidth: 1,
            borderColor: cont.setting.theme.colors.border,
            marginHorizontal: 15
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

    // useEffect(() => { getJSON(setData, route.params._id, setLoading, loading) }, [])

    useEffect(() => {
        const reload = navi.addListener('focus', () => {
            getJSON(setData, route.params._id, setLoading, loading)
        });
        return reload;
      }, [navi]);

    // if (loading) return <View />

    return <View style={{flex:1}}>
        <View style={styles.titleView}>
            <BackButton />
            <Text style={styles.title}>{route.params.name}</Text>
            <TouchableOpacity style={{ marginLeft: 'auto', paddingRight: 10 }}
                onPress={() => { navi.navigate("게시글 업로드", { _id: route.params._id }); }}>
                <Icon name='pencil-outline' size={25} color='royalblue' />
            </TouchableOpacity>
        </View>
        <ScrollView>
            {data.map((v) => <TouchableOpacity key={v._id} style={styles.postView} activeOpacity={1}
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
            </TouchableOpacity>)}</ScrollView>
    </View>
}

function getJSON(setData, bid, setLoading, loading) {
    if (loading == false) return;
    axios({
        method: 'get',
        url: 'http://192.249.18.79/board?boardid=' + bid
    })
        .then(function (response) {
            setData(response.data)
            setLoading(false)
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

    //{ _id: "123123", title: "제목 0", content: "내용0", likeCount: 3, commentCount: 1 }
}

function initState() {
    return [{ _id: "123123", title: "제목 0", content: "내용0", likeCount: 3, commentCount: 1 }]
}