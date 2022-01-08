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
            color: cont.setting.theme.colors.text,
            fontSize: 18, fontWeight: 'bold'
        },
        cardView: {
            width: '100%', alignSelf: 'center',
            borderRadius: 30, margin: 10,
            backgroundColor: cont.setting.theme.colors.background
        },
        title: {
            color: cont.setting.theme.colors.text,
            fontSize: 18, fontWeight: 'bold',
            backgroundColor: cont.setting.theme.colors.background,
            marginTop: -30, borderTopRightRadius: 30, borderTopLeftRadius: 30,
            paddingHorizontal: 30, paddingTop: 30,
        },
        content: {
            color: cont.setting.theme.colors.text,
            fontSize: 16, paddingTop: 10, marginBottom: 'auto',
            paddingHorizontal: 30, paddingBottom: 20
        },
        row: {
            paddingVertical: 3, flexDirection: 'row',
            paddingHorizontal: 30
        },
        infoText: {
            color: cont.setting.theme.colors.text, fontSize: 14,
            paddingHorizontal: 5
        },
        scrapView: {
            flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center',
            paddingHorizontal: 30, paddingBottom: 30
        },
        scrapText: {
            color: cont.setting.theme.colors.text,
            fontSize: 14, marginLeft: 2
        }
    })

    const bg = [require('../../images/background1.jpg')]

    return <ScrollView>
        <View style={{ flexDirection: 'row', alignItems: 'center', padding: 10 }}>
            <BackButton />
            <Text style={styles.topTitle}>이벤트 상세정보</Text></View>
        <View>
            <TouchableOpacity style={styles.cardView} onPress={() => { navi.navigate("이벤트 정보") }}>
                <Image source={bg[0]}
                    style={{
                        width: '100%', height: 250, borderColor: 'white', alignSelf: 'center',
                        borderTopRightRadius: 30, borderTopLeftRadius: 30
                    }}
                    resizeMode='cover' />
                <Text style={styles.title}>{currentData.title}</Text>
                <Text style={styles.content}>
                    {currentData.content}</Text>
                <View style={styles.row}>
                    <Icon name='clock-outline' color='blue' size={18} />
                    <Text style={styles.infoText}>{currentData.time}</Text>
                </View>
                <View style={styles.row}>
                    <Icon name='map-marker-outline' color='chocolate' size={18} />
                    <Text style={styles.infoText}>{currentData.location}</Text>
                </View>
                <View style={styles.row}>
                    <Icon name='account-multiple-outline' color='blueviolet' size={18} />
                    <Text style={styles.infoText}>{currentData.headCount}</Text>
                </View>
                <View style={styles.scrapView}>
                    <Icon name='star-outline' color='gold' size={18} />
                    <Text style={styles.scrapText}>{currentData.scrapCount}</Text></View>
            </TouchableOpacity>
        </View>
        <CommentTab />
    </ScrollView>
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
        title: "제목0",
        content: "내용0내용0내용0내용0내용0내용0내용0내용0내용0내용0내용0내용0내용0내용0내용0내용0내용0내용0내용0",
        time: "시간0",
        headCount: 10,
        location: "장소",
        scrapCount: 11
    }
}