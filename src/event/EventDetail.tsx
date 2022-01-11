import { useNavigation } from '@react-navigation/native'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Alert, Image, ImageBackground, ScrollView, StyleSheet, TouchableOpacity } from 'react-native'
import { Text, View } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import CommentTab from '../component/event/CommentTab'
import { BackButton } from '../component/util'
import { useContextOfAll } from '../Provider'

export default function EventDetail({ route }) {
    const [currentData, setData] = useState(initData())
    const navi = useNavigation<any>()
    const cont = useContextOfAll()

    useEffect(() => {
        const reload = navi.addListener('focus', () => {
            getJSON(route.params._id, setData)
        });
        return reload;
    }, [navi]);

    const styles = StyleSheet.create({
        topTitle: {
            color: 'white',
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

    return <View style={{ flex: 1, backgroundColor: '#192965' }}>
        <View style={{justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center'}}>
            <View style={{ flexDirection: 'row', alignItems: 'center', padding: 10 }}>
                <TouchableOpacity onPress={() => { navi.goBack() }}>
                    <Icon name='chevron-left' color='white' size={30} style={{ padding: 5 }} />
                </TouchableOpacity>
                <Text style={styles.topTitle}>이벤트 상세정보</Text></View>
            {currentData.isAuthor ?
                <TouchableOpacity onPress={() => { onPressDelete(route.params._id, navi) }}>
                    <Icon name='delete-outline' color='white' size={25} style={{paddingRight: 20}} />
                </TouchableOpacity> : undefined}
        </View>
        <ScrollView style={{ flex: 1, borderTopLeftRadius: 30, borderTopRightRadius: 30 }}>
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
                <TouchableOpacity style={styles.scrapView} onPress={() => {
                    onPressScrap(currentData._id, navi, currentData.isScrapped)
                }}>
                    <Icon name={currentData.isScrapped ? 'star' : 'star-outline'} color='gold' size={18} />
                    <Text style={styles.scrapText}>{currentData.scrapCount}</Text></TouchableOpacity>
            </View>
        </ScrollView>
        {CommentTab(cont, navi, currentData._id)}
    </View>
}

function getJSON(_id, setData) {
    axios({
        method: 'get',
        url: 'http://192.249.18.79/eventboard/event?eventid=' + _id
    })
        .then(function (response) {
            setData(() => response.data)
            console.log(response.data)
        })
        .catch(function (error) {
            console.log(error);
        })
}

function onPressScrap(eventid, navi, isScrapped) {
    Alert.alert("스크랩", isScrapped ? '스크랩 취소하겠습니까?' : "스크랩하시겠습니까?", [{ text: '취소' }, {
        text: '확인', onPress: () => {
            axios({
                method: 'post',
                url: 'http://192.249.18.79/eventboard/event/scrap?eventid=' + eventid
            })
                .then(function (response) {
                    navi.replace('이벤트 정보', { _id: eventid })
                })
                .catch(function (error) {
                    console.log(error);
                })
        }
    }])
}

function onPressDelete(eventid, navi) {
    Alert.alert("삭제", "삭제하시겠습니까?", [{ text: '취소' }, {
        text: '삭제', onPress: () => {
            axios({
                method: 'delete',
                url: 'http://192.249.18.79/eventboard/event?eventid=' + eventid
            })
                .then(function (response) {
                    navi.goBack()
                })
                .catch(function (error) {
                    console.log(error);
                })
        }
    }])
}

function initData() {
    return {
        _id: "0",
        title: "",
        content: "",
        time: "",
        headCount: 0,
        location: "",
        scrapCount: 0,
        isScrapped: false,
        isAuthor: false
    }
}