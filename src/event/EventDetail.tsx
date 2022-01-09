import { useNavigation } from '@react-navigation/native'
import axios from 'axios'
import React, { useState } from 'react'
import { Image, ScrollView, StyleSheet, TouchableOpacity } from 'react-native'
import { Text, View } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { CommentTab } from '../component/event/CommentTab'
import { BackButton } from '../component/util'
import { useContextOfAll } from '../Provider'

export default function EventDetail() {
    const [currentData, setData] = useState(initData())
    const navi = useNavigation<any>()
    const cont = useContextOfAll()

    const styles = StyleSheet.create({
        topTitle: {
            color: cont.setting.theme.colors.background,
            fontSize: 18, fontWeight: 'bold'
        },
        cardView: {
            width: '100%', alignSelf: 'center',
            backgroundColor: cont.setting.theme.colors.background,
            borderTopRightRadius: 30, borderTopLeftRadius: 30
        },
        title: {
            color: cont.setting.theme.colors.text,
            fontSize: 35, fontWeight: 'bold',
            backgroundColor: cont.setting.theme.colors.background,
            marginTop: -30, borderTopRightRadius: 30, borderTopLeftRadius: 30,
            paddingHorizontal: 30, paddingTop: 30,
            paddingBottom: 30
        },
        content: {
            color: cont.setting.theme.colors.text,
            fontSize: 16, marginBottom: 'auto',
            paddingHorizontal: 30, paddingBottom: 20
        },
        row: {
            paddingVertical: 3, flexDirection: 'row',
            paddingHorizontal: 30
        },
        infoText: {
            color: cont.setting.theme.colors.text, fontSize: 14,
            paddingHorizontal: 30
        },
        scrapView: {
            flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center',
            paddingHorizontal: 30, paddingBottom: 30
        },
        scrapText: {
            color: cont.setting.theme.colors.text,
            fontSize: 14, marginLeft: 2
        },
        tag: {
            fontSize: 14, color: '#48CAE4',// '#639cd9',
            paddingBottom: 10, paddingHorizontal: 30,
            paddingTop: 20
        }
    })

    const bg = [require('../../images/background8.jpg')]

    //borderTopLeftRadius: 30, borderTopRightRadius: 30, 

    return <View style={{ flex: 1, backgroundColor: '#3DB2FF' }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', padding: 10 }}>
            <TouchableOpacity onPress={() => { navi.goBack() }}>
                <Icon name='chevron-left' color={cont.setting.theme.colors.background} size={30} style={{ padding: 5 }} />
            </TouchableOpacity>
            <Text style={styles.topTitle}>이벤트 상세정보</Text></View>
            {/* <View style={{height: 30, width: 30, backgroundColor: 'red', borderTopLeftRadius: 30, position: 'absolute', marginBottom: 30}}/> */}
        <ScrollView style={{ flex: 1, borderTopLeftRadius: 30, borderTopRightRadius: 30, backgroundColor: cont.setting.theme.colors.background }}>
            <View style={styles.cardView}>
                <Image source={bg[0]}
                    style={{
                        width: '100%', height: 250, borderColor: 'white', alignSelf: 'center',
                        borderTopRightRadius: 30, borderTopLeftRadius: 30
                    }}
                    resizeMode='cover' />
                <Text style={styles.title}>{currentData.title}</Text>
                <Text style={styles.tag}>ABOUT</Text>
                <Text style={styles.content}>
                    {currentData.content}</Text>
                <Text style={styles.tag}>DATE AND TIME</Text>
                <Text style={styles.infoText}>{currentData.time}</Text>
                <Text style={styles.tag}>LOCATION</Text>
                <Text style={styles.infoText}>{currentData.location}</Text>
                <Text style={styles.tag}>NUMBER OF PEOPLE</Text>
                <Text style={styles.infoText}>{currentData.headCount}</Text>
                <View style={styles.scrapView}>
                    <Icon name='star-outline' color='gold' size={18} />
                    <Text style={styles.scrapText}>{currentData.scrapCount}</Text></View>
            </View>
        </ScrollView>
        <CommentTab />
    </View>
}

function getJSON(setData) {
    axios({
        method: 'get',
        url: 'http://192.249.18.79/board'
    })
        .then(function (response) {
            // console.log(response.data)
            console.log(typeof response.data)
            console.log("response 받기 성공")
            setData(() => response.data)
        })
        .catch(function (error) {
            console.log(error);
        })
}

function initData() {
    return {
        _id: "0",
        title: "제목0제목0제목0제목0제목0제목0",
        content: "내용0내용0내용0내용0내용0내용0내용0내용0내용0내용0내용0\n내용0\n내용0\n내용0\n내용0\n내용0\n내용0\n내용0\n내용0",
        time: "시간0",
        headCount: 10,
        location: "장소",
        scrapCount: 11
    }
}