import React from "react"
import { StyleSheet, Text, TouchableOpacity, View } from "react-native"
import Icon from "react-native-vector-icons/MaterialCommunityIcons"
import { useContextOfAll } from "../../Provider"

export default function BestPost() {
    const cont = useContextOfAll()

    const styles = StyleSheet.create({
        view: {
            width: '96%', borderWidth: 1,
            borderColor: cont.setting.theme.colors.border,
            alignSelf: 'center', borderRadius: 10,
            paddingVertical: 15, paddingHorizontal: 20,
            marginVertical: 5
        },
        title: {
            fontSize: 18, color: cont.setting.theme.colors.text,
            fontWeight: 'bold', paddingVertical: 10
        },
        postTitle: {
            fontSize: 15, color: cont.setting.theme.colors.text,
            fontWeight: 'bold', paddingTop: 3
        },
        content: {
            fontSize: 14, color: cont.setting.theme.colors.text,
            paddingVertical: 5
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
        <Text style={styles.title}>실시간 인기 글</Text>
        {data.map((v) => <TouchableOpacity key={v.id}>
            <Text style={styles.postTitle}>{v.postTitle}</Text>
            <Text style={styles.content} numberOfLines={2} ellipsizeMode={'tail'}>
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
            likeCount: 1024,
            commentCount: 120
        },
        {
            id: 1,
            postTitle: "게시판이름1",
            postContent: "게시글내용1게시글내용1게시글내용1게시글내용1게시글내용1게시글내용1게시글내용1게시글내용1게시글내용1게시글내용1게시글내용1게시글내용1",
            likeCount: 512,
            commentCount: 51
        }
    ]
}