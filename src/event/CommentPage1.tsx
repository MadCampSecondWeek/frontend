import { useNavigation } from '@react-navigation/native'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Alert, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { BackButton } from '../component/util'
import { useContextOfAll } from '../Provider'

export default function CommentPage1({ route }) {
    const [comment, setComment] = useState('')
    const navi = useNavigation<any>()
    const cont = useContextOfAll()
    const [data, setData] = useState(initState())

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

    useEffect(() => { getJSON(route.params._id, setData) }, []);

    return <View style={{ flex: 1 }}>
        <View style={{ padding: 10, flexDirection: 'row', alignItems: 'center' }}><BackButton />
            <Text style={{ color: cont.setting.theme.colors.text, fontSize: 18, fontWeight: 'bold' }}>??????</Text></View>
        <ScrollView style={{ padding: 10, flex: 1 }}>
            {data.map((v) => <View key={v.comment._id} style={styles.commentView}>
                <View style={styles.commentRow}>
                    <Text style={styles.commentAuthor}>
                        ??????{v.comment.displayNumber}</Text>
                    {v.comment.isAuthor ?
                        <TouchableOpacity onPress={() => {onPressDelete(v.comment._id, navi, route.params._id)}}>
                            <Icon name='delete-outline' color='grey' size={17} />
                        </TouchableOpacity> : undefined}
                </View>
                <Text style={styles.commentContent}>{v.comment.content}</Text>
                <View style={styles.commentRow}>
                    <Text style={styles.commentTime}>{(new Date(v.comment.createdAt)).toLocaleString('ko-KR', { timeZone: 'UTC' })}</Text>
                    <TouchableOpacity style={styles.countView} onPress={() => {
                        onPressLike(v.comment._id, navi, route.params._id, v.isLiked)
                    }}>
                        <Icon name={v.isLiked ? 'heart' : 'heart-outline'} color='tomato' size={16} />
                        <Text style={styles.count}>{v.comment.likeCount}</Text></TouchableOpacity>
                </View>
            </View>)}</ScrollView>
        <View style={styles.textInputRow}>
            <TextInput style={styles.textInput} multiline={true} numberOfLines={2}
                value={comment} onChangeText={setComment} />
            <TouchableOpacity onPress={() => { onPressComment(route.params._id, navi, comment) }}>
                <Icon name='check-bold' size={20} color='green' style={{ padding: 6 }} />
            </TouchableOpacity>
        </View>
    </View>
}

function getJSON(_id, setData) {
    console.log(_id)
    axios({
        method: 'get',
        url: 'http://192.249.18.79/eventboard/comment?eventid=' + _id + '&apply=0'
    })
        .then(function (response) {
            let data = response.data
            if ((typeof response.data) == 'string')
                data = JSON.parse(response.data)
            setData(() => data)
        })
        .catch(function (error) {
            console.log(error);
        })
}

function onPressComment(eventid, navi, comment) {
    axios({
        method: 'post',
        url: 'http://192.249.18.79/eventboard/comment?eventid=' + eventid + '&apply=0',
        data: { content: comment }
    })
        .then(function (response) {
            navi.replace('????????? ??????1', { _id: eventid })
        })
        .catch(function (error) {
            console.log(error);
        })
}

function onPressLike(commentid, navi, _id, isLiked) {
    Alert.alert("??????", isLiked ? '????????? ??????????????????????' : "?????????????????????????", [{ text: '??????' },
    {
        text: '??????', onPress: () => {
            axios({
                method: 'get',
                url: 'http://192.249.18.79/eventboard/comment/like?commentid=' + commentid
            })
                .then(function (response) {
                    navi.replace('????????? ??????1', { _id: _id })
                })
                .catch(function (error) {
                    console.log(error);
                })
        }
    }])
}

function onPressDelete(commentid, navi, _id) {
    Alert.alert("??????", "?????????????????????????", [{ text: '??????' },
    {
        text: '??????', onPress: () => {
            axios({
                method: 'delete',
                url: 'http://192.249.18.79/eventboard/comment?commentid=' + commentid
            })
                .then(function (response) {
                    navi.replace('????????? ??????1', { _id: _id })
                })
                .catch(function (error) {
                    console.log(error);
                })
        }
    }])
}

function initState() {
    return [
        {
            comment: {
                _id: "",
                displayNumber: 1,
                commenterNumber: 1,
                content: "",
                likeCount: 4,
                createdAt: "",
                isAuthor: false
            },
            isLiked: false
        }

        // {
        //     _id: "?????? ????????????3",
        //     author: { idx: "?????? ????????? ????????????" },
        //     commenterNumber: 1,
        //     content: "?????? ??????",
        //     likeCount: 4,
        //     time: "22/01/07 09:22"
        // },
        // {
        //     _id: "?????? ????????????4",
        //     author: { idx: "?????? ????????? ????????????" },
        //     commenterNumber: 1,
        //     content: "?????? ??????",
        //     likeCount: 4,
        //     time: "22/01/07 09:22"
        // },
        // {
        //     _id: "?????? ????????????5",
        //     author: { idx: "?????? ????????? ????????????" },
        //     commenterNumber: 1,
        //     content: "?????? ??????",
        //     likeCount: 4,
        //     time: "22/01/07 09:22"
        // },
        // {
        //     _id: "?????? ????????????6",
        //     author: { idx: "?????? ????????? ????????????" },
        //     commenterNumber: 1,
        //     content: "?????? ??????",
        //     likeCount: 4,
        //     time: "22/01/07 09:22"
        // },
        // {
        //     _id: "?????? ????????????7",
        //     author: { idx: "?????? ????????? ????????????" },
        //     commenterNumber: 1,
        //     content: "?????? ??????",
        //     likeCount: 4,
        //     time: "22/01/07 09:22"
        // }
    ]
}