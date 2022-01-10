import { useNavigation } from "@react-navigation/native"
import axios from "axios"
import React, { useEffect, useState } from "react"
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native"
import Icon from "react-native-vector-icons/MaterialCommunityIcons"
import { BackButton } from "../component/util"
import { useContextOfAll } from "../Provider"

export default function PostDetail({ route }) {
    const [data, setData] = useState(initState())
    const [comment, setComment] = useState('')
    const cont = useContextOfAll()
    const navi = useNavigation<any>()

    useEffect(() => { getJSON(setData, route.params._id, cont) }, [])

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

    console.log(data)

    return <View style={{ flex: 1 }}>
        <View style={{ padding: 10 }}>
            <BackButton /></View>
        <ScrollView style={{ paddingHorizontal: 10, flex: 1 }}>
            {Post(data, styles, route.params._id, navi, cont, route, comment)}
            {data.comments.map((v) => <View key={v._id} style={styles.commentView}>
                <View style={styles.commentRow}>
                    <Text style={styles.commentAuthor}>
                        익명{v.author.idx}</Text>
                    <TouchableOpacity>
                        <Icon name='dots-vertical' color='grey' size={17} />
                    </TouchableOpacity>
                </View>
                <Text style={styles.commentContent}>{v.content}</Text>
                <View style={styles.commentRow}>
                    <Text style={styles.commentTime}>{v.createdAt}</Text>
                    <TouchableOpacity style={styles.countView}>
                        <Icon name='heart-outline' color='tomato' size={16} />
                        <Text style={styles.count}>{v.likeCount}</Text></TouchableOpacity>
                </View>
            </View>)}
        </ScrollView>
        <View style={styles.textInputRow}>
            <TextInput style={styles.textInput} multiline={true} numberOfLines={2}
                value={comment} onChangeText={setComment} />
            <TouchableOpacity onPress={() => {onPressComment(route.params._id, navi, comment)}}>
                <Icon name='check-bold' size={20} color='green' style={{ padding: 6 }} />
            </TouchableOpacity>
        </View>
    </View>
}

function Post(data, styles, boardid, navi, cont, route, comment) {
    return <View style={styles.postView}>
        <View style={{ justifyContent: 'space-between', flexDirection: 'row' }}>
            <Text style={styles.post}>{data.post.title}</Text>
            <TouchableOpacity onPress={() => { onPressDelete(boardid, navi, cont) }}>
                <Icon name='dots-vertical' color='grey' size={17} />
            </TouchableOpacity>
        </View>
        <Text style={styles.content}>{data.post.content}</Text>
        <View style={{ justifyContent: 'flex-end', flexDirection: 'row', alignItems: 'center' }}>
        <TouchableOpacity style={styles.countView} onPress={() => {onPressLike(route.params._id, navi)}}>
            <Icon name={data.isLiked?'heart':'heart-outline'} color='tomato' size={16} />
            <Text style={styles.count}>{data.post.likeCount}</Text></TouchableOpacity>
        <View style={styles.countView}>
            <Icon name='comment-processing-outline' color='cyan' size={16} />
            <Text style={styles.count}>{data.post.commentCount}</Text></View>
    </View>
    </View>
}

function onPressDelete(postid, navi, cont) {
    axios({
        method: 'delete',
        url: 'http://192.249.18.79/board/post?postid=' + postid + '&userid=' + cont.user._id
    })
        .then(function (response) { // 실패 에러코드는 400, 정상의 경우 200
            // console.log(response.data)
            console.log(response.data)
            console.log(response.status)
            console.log("response 받기 성공")
            // setLoading(true)
            navi.goBack()
        })
        .catch(function (error) {
            console.log(error);
        })
}

function onPressLike(postid, navi) {
    axios({
        method: 'get',
        url: 'http://192.249.18.79/board/post/like?postid=' + postid// + '&userid=' + cont.user._id
    })
        .then(function (response) { // 실패 에러코드는 400, 정상의 경우 200
            // console.log(response.data)
            console.log(response.data)
            console.log(response.status)
            console.log("response 받기 성공")
            // setLoading(true)
            navi.replace('게시글 상세', { _id: postid })
        })
        .catch(function (error) {
            console.log(error);
        })
}

function onPressComment(postid, navi, comment) {
    // navi.replace('게시글 상세', { _id: postid })
    axios({
        method: 'post',
        url: 'http://192.249.18.79/board/comment?postid=' + postid,
        data: {content: comment}
    })
        .then(function (response) {
            navi.replace('게시글 상세', { _id: postid })
            console.log(response.data)
        })
        .catch(function (error) {
            console.log(error);
            navi.replace('게시글 상세')
        })
}

function getJSON(setData, postid, cont) {
    axios({
        method: 'get',
        url: 'http://192.249.18.79/board/post?postid=' + postid + '&userid=' + cont.user._id
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
                author: {idx: 1},
                commenterNumber: 1,
                content: "댓글 내용",
                likeCount: 4,
                createdAt: "22/01/07 09:22"
            },
            // {
            //     _id: "댓글 고유번호3",
            //     author: "댓글 작성자 고유번호",
            //     commenterNumber: 1,
            //     content: "댓글 내용",
            //     likeCount: 4,
            //     time: "22/01/07 09:22"
            // },
            // {
            //     _id: "댓글 고유번호4",
            //     author: "댓글 작성자 고유번호",
            //     commenterNumber: 1,
            //     content: "댓글 내용",
            //     likeCount: 4,
            //     time: "22/01/07 09:22"
            // },
            // {
            //     _id: "댓글 고유번호5",
            //     author: "댓글 작성자 고유번호",
            //     commenterNumber: 1,
            //     content: "댓글 내용",
            //     likeCount: 4,
            //     time: "22/01/07 09:22"
            // },
            // {
            //     _id: "댓글 고유번호6",
            //     author: "댓글 작성자 고유번호",
            //     commenterNumber: 1,
            //     content: "댓글 내용",
            //     likeCount: 4,
            //     time: "22/01/07 09:22"
            // },
            // {
            //     _id: "댓글 고유번호7",
            //     author: "댓글 작성자 고유번호",
            //     commenterNumber: 1,
            //     content: "댓글 내용",
            //     likeCount: 4,
            //     time: "22/01/07 09:22"
            // }
        ],
        isLiked: false
    }
}