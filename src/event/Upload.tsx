import { useNavigation } from '@react-navigation/native'
import axios from 'axios'
import React, { useState } from 'react'
import { Alert, Dimensions, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { useContextOfAll } from '../Provider'

const {width, height} = Dimensions.get('window')

export default function Upload() {
    const [title, setTitle] = useState("")
    const [content, setContent] = useState("")
    const [time, setTime] = useState('')
    const [location, setLocation] = useState('')
    const [headCount, setHeadCount] = useState('')
    const [select, setSelect] = useState(-1)
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
            borderBottomWidth: 1,
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
                <Text style={styles.title}>????????? ??????</Text></View>
            <TouchableOpacity onPress={() => {onPress(navi, title, content, time, location, headCount, select)}}>
                <Icon name='check-bold' color='#50D890' size={28} style={{ padding: 8 }} />
            </TouchableOpacity>
        </View>
        <ScrollView style={{ borderTopLeftRadius: 30, borderTopRightRadius: 30, backgroundColor: cont.setting.theme.colors.background, flex: 1 }}>
            <TextInput value={title} onChangeText={setTitle} style={styles.textInputTitle}
                placeholder='??????' placeholderTextColor={'grey'} />
            <TextInput value={content} onChangeText={setContent}
                style={styles.textInputContent} multiline={true} maxLength={100} numberOfLines={10}
                placeholder='??????' placeholderTextColor={'grey'} />
            <View style={styles.row}>
                <Text style={styles.tag}>??????</Text>
                <TextInput style={styles.info} value={time} onChangeText={setTime} /></View>
            <View style={styles.row}>
                <Text style={styles.tag}>??????</Text>
                <TextInput style={styles.info} value={location} onChangeText={setLocation} /></View>
            <View style={styles.row}>
                <Text style={styles.tag}>??????</Text>
                <TextInput style={styles.info} keyboardType='numeric' onChangeText={setHeadCount}/></View>
            <Text style={[styles.tag, { paddingTop: 15 }]}>????????????</Text>
            <View style={{ paddingHorizontal: 10, flexDirection: 'row', justifyContent: 'center' }}>
                <TouchableOpacity onPress={() => { setSelect(1) }}>
                    <Text style={[styles.btn, {
                        color: select == 1 ? 'black' : cont.setting.theme.colors.text, flex: 1,
                        backgroundColor: select == 1 ? '#FFB830' : cont.setting.theme.colors.background
                    }]}>?????????</Text></TouchableOpacity>
                <TouchableOpacity onPress={() => { setSelect(2) }}>
                    <Text style={[styles.btn, {
                        color: select == 2 ? 'black' : cont.setting.theme.colors.text, flex: 1,
                        backgroundColor: select == 2 ? '#FFB830' : cont.setting.theme.colors.background
                    }]}>?????????</Text></TouchableOpacity>
                <TouchableOpacity onPress={() => { setSelect(3) }}>
                    <Text style={[styles.btn, {
                        color: select == 3 ? 'black' : cont.setting.theme.colors.text, flex: 1,
                        backgroundColor: select == 3 ? '#FFB830' : cont.setting.theme.colors.background
                    }]}>??????</Text></TouchableOpacity></View>
            <View style={{ paddingHorizontal: 10, flexDirection: 'row', justifyContent: 'center' }}>
                <TouchableOpacity onPress={() => { setSelect(4) }}>
                    <Text style={[styles.btn, {
                        color: select == 4 ? 'black' : cont.setting.theme.colors.text,
                        backgroundColor: select == 4 ? '#FFB830' : cont.setting.theme.colors.background
                    }]}>??????</Text></TouchableOpacity>
                <TouchableOpacity onPress={() => { setSelect(5) }}>
                    <Text style={[styles.btn, {
                        color: select == 5 ? 'black' : cont.setting.theme.colors.text,
                        backgroundColor: select == 5 ? '#FFB830' : cont.setting.theme.colors.background
                    }]}>??????</Text></TouchableOpacity>
                <TouchableOpacity onPress={() => { setSelect(6) }}>
                    <Text style={[styles.btn, {
                        color: select == 6 ? 'black' : cont.setting.theme.colors.text,
                        backgroundColor: select == 6 ? '#FFB830' : cont.setting.theme.colors.background
                    }]}>??????</Text></TouchableOpacity></View>
        </ScrollView>
    </View>
}

function onPress(navi, title, content, time, location, headCount, category) {
    if (title == '' || content == '' || time == '' || location == '' || headCount == '') {
        Alert.alert('??????', '????????? ?????? ??????????????????.')
        return
    }
    if (category == -1) {
        Alert.alert('??????', '??????????????? ??????????????????.')
        return
    }
    axios({
        method: 'post',
        url: 'http://192.249.18.79/eventboard/event?category=' + category,
        data: { title: title, content: content, headCount: headCount, time: time, location: location }
    })
        .then(function (response) { // ????????? ?????? ?????? ??????????????? 400, ?????? ????????? ?????? 200
            console.log(response.data)
            console.log(response.status)
            console.log("response ?????? ??????")
            // setLoading(true)
            navi.goBack()
        })
        .catch(function (error) {
            console.log(error);
        })
}