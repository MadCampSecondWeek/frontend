import { useNavigation } from '@react-navigation/native'
import React, { useState } from 'react'
import { Dimensions, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { useContextOfAll } from '../Provider'

const {width, height} = Dimensions.get('window')

export default function Upload() {
    const [title, setTitle] = useState("")
    const [content, setContent] = useState("")
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
                <Text style={styles.title}>이벤트 추가</Text></View>
            <TouchableOpacity>
                <Icon name='check-bold' color='#50D890' size={28} style={{ padding: 8 }} />
            </TouchableOpacity>
        </View>
        <ScrollView style={{ borderTopLeftRadius: 30, borderTopRightRadius: 30, backgroundColor: cont.setting.theme.colors.background, flex: 1 }}>
            <TextInput value={title} onChangeText={setTitle} style={styles.textInputTitle}
                placeholder='제목' placeholderTextColor={'grey'} />
            <TextInput value={content} onChangeText={setContent}
                style={styles.textInputContent} multiline={true} maxLength={100} numberOfLines={10}
                placeholder='내용' placeholderTextColor={'grey'} />
            <View style={styles.row}>
                <Text style={styles.tag}>시간</Text>
                <TextInput style={styles.info} /></View>
            <View style={styles.row}>
                <Text style={styles.tag}>장소</Text>
                <TextInput style={styles.info} /></View>
            <View style={styles.row}>
                <Text style={styles.tag}>인원</Text>
                <TextInput style={styles.info} /></View>
            <Text style={[styles.tag, { paddingTop: 15 }]}>카테고리</Text>
            <View style={{ paddingHorizontal: 10, flexDirection: 'row', justifyContent: 'center' }}>
                <TouchableOpacity onPress={() => { setSelect(0) }}>
                    <Text style={[styles.btn, {
                        color: select == 0 ? 'black' : cont.setting.theme.colors.text, flex: 1,
                        backgroundColor: select == 0 ? '#FFB830' : cont.setting.theme.colors.background
                    }]}>스포츠</Text></TouchableOpacity>
                <TouchableOpacity onPress={() => { setSelect(1) }}>
                    <Text style={[styles.btn, {
                        color: select == 1 ? 'black' : cont.setting.theme.colors.text, flex: 1,
                        backgroundColor: select == 1 ? '#FFB830' : cont.setting.theme.colors.background
                    }]}>스터디</Text></TouchableOpacity>
                <TouchableOpacity onPress={() => { setSelect(2) }}>
                    <Text style={[styles.btn, {
                        color: select == 2 ? 'black' : cont.setting.theme.colors.text, flex: 1,
                        backgroundColor: select == 2 ? '#FFB830' : cont.setting.theme.colors.background
                    }]}>친목</Text></TouchableOpacity></View>
            <View style={{ paddingHorizontal: 10, flexDirection: 'row', justifyContent: 'center' }}>
                <TouchableOpacity onPress={() => { setSelect(3) }}>
                    <Text style={[styles.btn, {
                        color: select == 3 ? 'black' : cont.setting.theme.colors.text,
                        backgroundColor: select == 3 ? '#FFB830' : cont.setting.theme.colors.background
                    }]}>게임</Text></TouchableOpacity>
                <TouchableOpacity onPress={() => { setSelect(4) }}>
                    <Text style={[styles.btn, {
                        color: select == 4 ? 'black' : cont.setting.theme.colors.text,
                        backgroundColor: select == 4 ? '#FFB830' : cont.setting.theme.colors.background
                    }]}>여행</Text></TouchableOpacity>
                <TouchableOpacity onPress={() => { setSelect(5) }}>
                    <Text style={[styles.btn, {
                        color: select == 5 ? 'black' : cont.setting.theme.colors.text,
                        backgroundColor: select == 5 ? '#FFB830' : cont.setting.theme.colors.background
                    }]}>취미</Text></TouchableOpacity></View>
        </ScrollView>
    </View>
}

function getCat(styles, select, setSelect, cont) {
    const cat = ['취미', '스포츠', '스터디', '게임', '여행', '친목']
    return <TouchableOpacity onPress={() => { setSelect(5) }}>
        <Text style={[styles.btn, {
            color: select == 5 ? 'black' : 'white',
            backgroundColor: select == 5 ? '#FFB830' : cont.setting.theme.colors.background
        }]}>취미</Text></TouchableOpacity>
}