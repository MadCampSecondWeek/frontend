import { useNavigation } from '@react-navigation/native'
import axios from 'axios'
import React from 'react'
import { useState } from 'react'
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { useContextOfAll } from '../Provider'

export default function PostUpload() {
    const [content, setContent] = useState("")
    const navi = useNavigation<any>()
    const cont = useContextOfAll()

    const styles = StyleSheet.create({
        top: {
            color: cont.setting.theme.colors.text,
            fontSize: 18, fontWeight: 'bold'
        },
        title: {
            color: cont.setting.theme.colors.text,
            fontSize: 15, fontWeight: 'bold'
        },
        textInputTitle: {
            borderWidth: 1, borderColor: cont.setting.theme.colors.border,
            color: cont.setting.theme.colors.text,
            padding: 5, borderRadius: 5, fontSize: 16, fontWeight: 'bold'
        },
        textInputContent: {
            borderWidth: 1, borderColor: cont.setting.theme.colors.border,
            color: cont.setting.theme.colors.text,
            padding: 5, borderRadius: 5, fontSize: 15
        }
    })

    return <View>
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <TouchableOpacity onPress={() => { navi.goBack() }}>
                    <Icon name='close' color={cont.setting.theme.colors.text} size={28}
                        style={{ padding: 8 }} /></TouchableOpacity>
                <Text style={styles.top}>글쓰기</Text></View>
            <TouchableOpacity onPress={() => { postex(content) }}>
                <Icon name='check-bold' color='green' size={28} style={{ padding: 8 }} />
            </TouchableOpacity>
        </View>
        <Text style={styles.title}>제목</Text>
        <TextInput value={content} onChangeText={setContent} style={styles.textInputTitle} />
        <Text style={styles.title}>내용</Text>
        <TextInput value={content} onChangeText={setContent}
            style={styles.textInputContent} multiline={true} numberOfLines={10}/>
    </View>
}

function postex(content) {
    console.log(content)
    axios({
        method: 'post',
        url: 'http://192.249.18.79/board/post?userid=61d87ae9fe46c6f094b969fe',
        data: { title: "제목", content: content }
    })
        .then(function (response) { // 게시글 등록 실패 에러코드는 400, 정상 등록의 경우 200
            // console.log(response.data)
            console.log(response.data)
            console.log(response.status)
            console.log("response 받기 성공")
        })
        .catch(function (error) {
            console.log(error);
        })
}