import { useNavigation } from "@react-navigation/native"
import axios from "axios"
import React, { useEffect } from "react"
import { useState } from "react"
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import Icon from "react-native-vector-icons/MaterialCommunityIcons"
import { BackButton } from "../component/util"
import { useContextOfAll } from "../Provider"

export default function HotPostList() {
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

    useEffect(() => {getJSON(setData, setLoading, loading)}, []);

    return <View style={{flex:1}}>
        <View style={styles.titleView}>
            <BackButton />
            <Text style={styles.title}>HOT 게시글</Text>
        </View>
        <ScrollView>
            {loading ? <View /> : data.map((v) => <TouchableOpacity key={v._id} style={styles.postView} activeOpacity={1}
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

function getJSON(setData, setLoading, loading) {
    if (loading == false) return;
    axios({
        method: 'get',
        url: 'http://192.249.18.79/board/hot'
    })
        .then(function (response) {
            setData(response.data)
            setLoading(false)
        })
        .catch(function (error) {
            setData([{ _id: "123123", title: "제목 0", content: "내용0", likeCount: 3, commentCount: 1 }])
            console.log(error);
        })
}

function initState() {
    return [{ _id: "123123", title: "제목 0", content: "내용0", likeCount: 3, commentCount: 1 }]
}