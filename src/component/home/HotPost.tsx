import React from 'react'
import { StyleSheet, TouchableOpacity, View, Text } from 'react-native'
import Icon from "react-native-vector-icons/MaterialCommunityIcons"
import { useContextOfAll } from "../../Provider"

export default function HotPost() {

    const cont = useContextOfAll()

    const styles = StyleSheet.create({
        view: {
            width: '98%', borderWidth: 1,
            borderColor: cont.setting.theme.colors.border,
            alignSelf: 'center', borderRadius: 10,
            paddingVertical: 10, paddingHorizontal: 10,
            marginVertical: 5
        },
        titleRow: {
            justifyContent: 'space-between', flexDirection: 'row',
            alignItems: 'center', paddingVertical: 10
        },
        title: {
            fontSize: 18, color: cont.setting.theme.colors.text,
            fontWeight: 'bold'
        },
        title2: {
            fontSize: 14, color: 'tomato'
        },
        row: {
            justifyContent: 'flex-start', flexDirection: 'row',
            paddingVertical: 3
        },
        postTitle: {
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
            marginHorizontal: 3, flexDirection: 'row', alignItems: 'center',
            paddingVertical: 5
        }
    })

    const data = getJSON()

    return <View style={styles.view}>
        <TouchableOpacity style={styles.titleRow}>
            <Text style={styles.title}>HOT 게시글</Text>
            <Text style={styles.title2}>{'더 보기  >'}</Text>
        </TouchableOpacity>
        {data.map((v) => <TouchableOpacity key={v.id}>
            <Text style={styles.postTitle}>{v.postTitle}</Text>
            <Text style={styles.content} numberOfLines={1} ellipsizeMode={'tail'}>
                {v.postContent}</Text>
            <View style={{ justifyContent: 'flex-end', flexDirection: 'row', alignItems: 'center' }}>
                <View style={styles.countView}>
                    <Icon name='heart-outline' color='tomato' size={16} />
                    <Text style={styles.count}>{v.likeCount}</Text></View>
                <View style={styles.countView}>
                    <Icon name='comment-processing-outline' color='cyan' size={16} />
                    <Text style={styles.count}>{v.commentCount}</Text></View>
            </View>
        </TouchableOpacity>)}
    </View>
}

function getJSON() {
    return [
        {
            id: 0,
            postTitle: "게시판이름0",
            postContent: "게시글내용0게시글내용0게시글내용0게시글내용0게시글내용0게시글내용0게시글내용0게시글내용0게시글내용0게시글내용0게시글내용0",
            likeCount: 10,
            commentCount: 1
        },
        {
            id: 1,
            postTitle: "게시판이름1",
            postContent: "게시글내용1게시글내용1게시글내용1게시글내용1게시글내용1게시글내용1게시글내용1게시글내용1게시글내용1게시글내용1게시글내용1게시글내용1",
            likeCount: 51,
            commentCount: 5
        }
    ]
}