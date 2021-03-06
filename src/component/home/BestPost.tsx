import { useNavigation } from "@react-navigation/native"
import React from "react"
import { StyleSheet, Text, TouchableOpacity, View } from "react-native"
import Icon from "react-native-vector-icons/MaterialCommunityIcons"
import { useContextOfAll } from "../../Provider"

export default function BestPost(data, cont) {
    const navi = useNavigation<any>()
    // const cont = useContextOfAll()

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
            fontSize: 14, color: cont.setting.theme.colors.text,
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

    // const data = getJSON()

    if ((typeof data) == 'string')
        data = JSON.parse(data)

    return <View style={styles.view}>
        <Text style={styles.title}>실시간 인기 글</Text>
        { data.map((v) => <TouchableOpacity key={v._id} onPress={() => { navi.navigate("게시글 상세", { _id: v._id }) }}>
            <Text style={styles.postTitle}>{v.title}</Text>
            <Text style={styles.content} numberOfLines={2} ellipsizeMode={'tail'}>
                {v.content}</Text>
            <View style={{ justifyContent: 'flex-end', flexDirection: 'row', alignItems: 'center' }}>
                <View style={styles.countView}>
                    <Icon name='heart-outline' color='tomato' size={16} />
                    <Text style={styles.count}>{v.likeCount}</Text></View>
                <View style={styles.countView}>
                    <Icon name='comment-processing-outline' color='#00B4D8' size={16} />
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