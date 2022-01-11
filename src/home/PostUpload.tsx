import { useNavigation } from '@react-navigation/native'
import axios from 'axios'
import React from 'react'
import { useState } from 'react'
import { Alert, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { useContextOfAll } from '../Provider'

export default function PostUpload({ route }) {
    const [title, setTitle] = useState("")
    const [content, setContent] = useState("")
    const navi = useNavigation<any>()
    const cont = useContextOfAll()

    const styles = StyleSheet.create({
        top: {
            color: cont.setting.theme.colors.text,
            fontSize: 18, fontWeight: 'bold', padding: 10
        },
        // title: {
        //     color: cont.setting.theme.colors.text,
        //     fontSize: 15, fontWeight: 'bold',
        //     padding: 15
        // },
        textInputTitle: {
            borderBottomWidth: 1, borderColor: cont.setting.theme.colors.border,
            color: cont.setting.theme.colors.text,
            padding: 10, borderRadius: 5, fontSize: 18, fontWeight: 'bold',
            marginTop: 20, marginHorizontal: 20
        },
        textInputContent: {
            borderColor: cont.setting.theme.colors.border,
            color: cont.setting.theme.colors.text,
            padding: 10, borderRadius: 5, fontSize: 16,
            marginVertical: 20, marginHorizontal: 20
        }
    })

    return <View style={{ flex: 1 }}>
        <View style={{
            flexDirection: 'row', alignItems: 'center',
            justifyContent: 'space-between', padding: 10
        }}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <TouchableOpacity onPress={() => { navi.goBack() }}>
                    <Icon name='close' color={cont.setting.theme.colors.text} size={28}
                        style={{ padding: 8 }} /></TouchableOpacity>
                <Text style={styles.top}>글쓰기</Text></View>
            <TouchableOpacity onPress={() => { postex(title, content, route.params._id, navi) }}>
                <Icon name='check-bold' color='green' size={28} style={{ padding: 8 }} />
            </TouchableOpacity>
        </View>
        <TextInput value={title} onChangeText={setTitle} style={styles.textInputTitle}
            placeholder='제목' placeholderTextColor={'grey'} />
        <TextInput value={content} onChangeText={setContent}
            style={styles.textInputContent} multiline={true} maxLength={300}
            placeholder='내용' placeholderTextColor={'grey'} />
    </View>
}

function postex(title, content, boardid, navi) {
    if (title == '') {
        Alert.alert('알림', '제목을 작성해주세요.')
        return
    }
    if (content == '') {
        Alert.alert('알림', '내용을 작성해주세요.')
        return
    }
    axios({
        method: 'post',
        url: 'http://192.249.18.79/board/post?boardid=' + boardid + '&userid=61d87ae9fe46c6f094b969fe',
        data: { title: title, content: content }
    })
        .then(function (response) { // 게시글 등록 실패 에러코드는 400, 정상 등록의 경우 200
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