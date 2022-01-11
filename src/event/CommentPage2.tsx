import { useNavigation } from '@react-navigation/native'
import axios from 'axios'
import React, { useState } from 'react'
import { Alert, Dimensions, ScrollView, StyleSheet, Text, TextInput, ToastAndroid, TouchableOpacity, View } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { useContextOfAll } from '../Provider'

const {width, height} = Dimensions.get('window')

export default function Upload({route}) {
    const [content, setContent] = useState("")
    const [school, setSchool] = useState('')
    const [contact, setContect] = useState('')
    const [headCount, setHeadCount] = useState('')
    const navi = useNavigation<any>()
    const cont = useContextOfAll()

    const styles = StyleSheet.create({
        title: {
            color: 'white',
            fontSize: 18, fontWeight: 'bold'
        },
        textInputTitle: {
            borderBottomWidth: 1, borderColor: cont.setting.theme.colors.border,
            color: cont.setting.theme.colors.text,
            padding: 20, borderRadius: 0, fontSize: 18, fontWeight: 'bold',
            marginTop: 30
        },
        textInputContent: {
            borderColor: cont.setting.theme.colors.border,
            color: cont.setting.theme.colors.text,
            padding: 20, borderRadius: 0, fontSize: 16,
            borderBottomWidth: 1, marginTop: 30,
            textAlignVertical: 'top'
        },
        tag: {
            fontSize: 16, color: cont.setting.theme.colors.text,
            paddingHorizontal: 20
        },
        info: {
            fontSize: 15, paddingVertical: 3,
            borderRadius: 10,
            color: cont.setting.theme.colors.text,
            paddingHorizontal: 20, backgroundColor: cont.setting.theme.colors.primary,
            marginHorizontal: 20, flex: 1
        },
        row: {
            borderBottomWidth: 1, borderColor: cont.setting.theme.colors.border,
            flexDirection: 'row', alignItems: 'center', paddingVertical: 6
        },
        btn: {
            color: 'black', paddingVertical: 10,
            borderRadius: 10,
            fontSize: 15, marginHorizontal: 5, paddingHorizontal: 20,
            borderColor: '#FFB830', borderWidth: 1,
            marginTop: 10, width: width * 0.3, textAlign: 'center'
        }
    })

    return <View style={{ backgroundColor: '#192965', flex: 1 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 10 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <TouchableOpacity onPress={() => { navi.goBack() }}>
                    <Icon name='close' color='white' size={28}
                        style={{ padding: 8 }} /></TouchableOpacity>
                <Text style={styles.title}>이벤트 참여 신청</Text></View>
            <TouchableOpacity onPress={() => {onPress(navi, content, school, contact, headCount, route.params._id)}}>
                <Icon name='check-bold' color='#50D890' size={28} style={{ padding: 8 }} />
            </TouchableOpacity>
        </View>
        <ScrollView style={{ borderTopLeftRadius: 30, borderTopRightRadius: 30, backgroundColor: cont.setting.theme.colors.background, flex: 1 }}>
            <TextInput value={content} onChangeText={setContent}
                style={styles.textInputContent} multiline={true} maxLength={100} numberOfLines={10}
                placeholder='내용' placeholderTextColor={'grey'} />
            <View style={styles.row}>
                <Text style={styles.tag}>학교명</Text>
                <TextInput style={styles.info} value={school} onChangeText={setSchool} /></View>
            <View style={styles.row}>
                <Text style={styles.tag}>연락처</Text>
                <TextInput style={styles.info} value={contact} onChangeText={setContect} keyboardType='phone-pad' /></View>
            <View style={styles.row}>
                <Text style={styles.tag}>인원수</Text>
                <TextInput style={styles.info} keyboardType='numeric' onChangeText={setHeadCount}/></View>
        </ScrollView>
    </View>
}

function onPress(navi, content, school, contact, headCount, _id) {
    if (content == '' || school == '' || contact == '' || headCount == '') {
        Alert.alert('알림', '정보를 모두 작성해주세요.')
        return
    }
    axios({
        method: 'post',
        url: 'http://192.249.18.79/eventboard/event/apply?eventid=' + _id,
        data: { content: content, headCount: headCount }
    })
        .then(function (response) { // 게시글 등록 실패 에러코드는 400, 정상 등록의 경우 200
            navi.goBack()
            ToastAndroid.show('신청 완료!', ToastAndroid.SHORT)
        })
        .catch(function (error) {
            console.log(error);
        })
}