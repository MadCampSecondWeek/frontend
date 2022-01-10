import React from 'react'
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { useContextOfAll } from '../Provider'

export default function CommentPage1() {
    const cont = useContextOfAll()
    const data = initState()

    const styles = StyleSheet.create({
        postView: {
            marginHorizontal: 5,
            padding: 5, marginBottom: 15
        },
        post: {
            fontSize: 18, color: cont.setting.theme.colors.text,
            fontWeight: 'bold'
        },
        content: {
            fontSize: 15, color: cont.setting.theme.colors.text
        },
        count: {
            fontSize: 13, color: cont.setting.theme.colors.text,
            marginHorizontal: 3
        },
        countView: {
            marginHorizontal: 3, flexDirection: 'row', alignItems: 'center'
        },
        commentView: {
            width: '98%', alignSelf: 'center',
            borderColor: cont.setting.theme.colors.border, borderTopWidth: 1,
            borderRadius: 5, padding: 5
        },
        commentRow: {
            justifyContent: 'space-between', flexDirection: 'row',
            padding: 3, alignItems: 'center'
        },
        commentContent: {
            color: cont.setting.theme.colors.text, fontSize: 14,
            padding: 3
        },
        commentTime: {
            color: 'grey', fontSize: 14
        },
        textInputRow: {
            borderWidth: 1, borderColor: cont.setting.theme.colors.border,
            width: '95%', backgroundColor: cont.setting.theme.colors.card,
            alignSelf: 'center', borderRadius: 15, flexDirection: 'row',
            justifyContent: 'space-between', alignItems: 'center',
            marginTop: 'auto', marginBottom: 5
        },
        textInput: {
            color: cont.setting.theme.colors.text,
            paddingHorizontal: 15,
            fontSize: 15, paddingVertical: 0,
            flex: 1
        },
        commentAuthor: {
            color: cont.setting.theme.colors.text, fontSize: 16,
            fontWeight: 'bold'
        }
    })


    return <ScrollView style={{ paddingHorizontal: 10 }}>
        {data.comments.map((v) => <View key={v._id} style={styles.commentView}>
            <View style={styles.commentRow}>
                <Text style={styles.commentAuthor}>
                    {v.author}{v.commenterNumber}</Text>
                <TouchableOpacity>
                    <Icon name='dots-vertical' color='grey' size={17} />
                </TouchableOpacity>
            </View>
            <Text style={styles.commentContent}>{v.content}</Text>
            <View style={styles.commentRow}>
                <Text style={styles.commentTime}>{v.time}</Text>
                <TouchableOpacity style={styles.countView}>
                    <Icon name='heart-outline' color='tomato' size={16} />
                    <Text style={styles.count}>{v.likeCount}</Text></TouchableOpacity>
            </View>
        </View>)}</ScrollView>
}

function initState() {
    return {
        post: {
            _id: "게시글 고유번호",
            title: "게시글 제목",
            content: "게시글 상세 내용",
            likeCount: 3,
            commentCount: 1,
            writerId: "작성자 고유번호"
        },
        comments: [
            {
                _id: "댓글 고유번호2",
                author: "댓글 작성자 고유번호",
                commenterNumber: 1,
                content: "댓글 내용",
                likeCount: 4,
                time: "22/01/07 09:22"
            },
            {
                _id: "댓글 고유번호3",
                author: "댓글 작성자 고유번호",
                commenterNumber: 1,
                content: "댓글 내용",
                likeCount: 4,
                time: "22/01/07 09:22"
            },
            {
                _id: "댓글 고유번호4",
                author: "댓글 작성자 고유번호",
                commenterNumber: 1,
                content: "댓글 내용",
                likeCount: 4,
                time: "22/01/07 09:22"
            },
            {
                _id: "댓글 고유번호5",
                author: "댓글 작성자 고유번호",
                commenterNumber: 1,
                content: "댓글 내용",
                likeCount: 4,
                time: "22/01/07 09:22"
            },
            {
                _id: "댓글 고유번호6",
                author: "댓글 작성자 고유번호",
                commenterNumber: 1,
                content: "댓글 내용",
                likeCount: 4,
                time: "22/01/07 09:22"
            },
            {
                _id: "댓글 고유번호7",
                author: "댓글 작성자 고유번호",
                commenterNumber: 1,
                content: "댓글 내용",
                likeCount: 4,
                time: "22/01/07 09:22"
            }
        ]
    }
}