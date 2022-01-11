import { useNavigation } from '@react-navigation/native'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { BackButton } from '../component/util'
import { useContextOfAll } from '../Provider'
import { bg } from './imageArray'

export default function Scrap() {
    const cont = useContextOfAll()
    const [data, setData] = useState([])
    const navi = useNavigation<any>()

    useEffect(() => {
        getJSON(setData)
    }, []);

    const renderItem = ({ item }) => (
        <Item currentData={item} />
    )

    const Item = ({ currentData }) => <TouchableOpacity style={styles.cardView} onPress={() => {
        navi.navigate("이벤트 정보", { _id: currentData._id })
    }} activeOpacity={1}>
        <Image source={bg[0]}
            style={{
                width: '100%', height: 200, borderColor: 'white', alignSelf: 'center',
                borderTopRightRadius: 10, borderTopLeftRadius: 10
            }}
            resizeMode='cover' />
        <Text style={styles.title}>{currentData.title}</Text>
        <View style={{ justifyContent: 'space-between', flexDirection: 'row' }}>
            <View style={styles.scrapView}>
                <Icon name='map-marker-outline' color='grey' size={17} />
                <Text style={[styles.infoText, { color: 'grey' }]}>{currentData.location}</Text></View>
            <View style={styles.scrapView}>
                <Icon name='star-outline' color='gold' size={17} />
                <Text style={styles.scrapText}>{currentData.scrapCount}</Text></View>
        </View>
        <Text numberOfLines={2} ellipsizeMode={'tail'} style={styles.content}>
            {currentData.content}</Text>
        <View style={{ justifyContent: 'space-between', flexDirection: 'row', paddingHorizontal: 30, paddingVertical: 10 }}>
            <View style={{ width: '50%' }}>
                <Text style={[styles.infoText, { color: 'grey' }]}>시간</Text>
                <Text style={[styles.infoText,]}>{currentData.time}</Text>
            </View>
            <View style={{ width: '50%' }}>
                <Text style={[styles.infoText, { color: 'grey' }]}>인원</Text>
                <Text style={[styles.infoText,]}>{currentData.headCount}</Text></View>
        </View>
    </TouchableOpacity>

    const styles = StyleSheet.create({
        topTitle: {
            fontSize: 18, color: cont.setting.theme.colors.text,
            fontWeight: 'bold'
        },
        cardView: {
            width: '90%', alignSelf: 'center',
            borderRadius: 10, margin: 10,
            borderWidth: 1, borderColor: cont.setting.theme.colors.border,
            backgroundColor: cont.setting.theme.colors.background,
            paddingBottom: 20
        },
        title: {
            color: cont.setting.theme.colors.text,
            fontSize: 24, fontWeight: 'bold',
            backgroundColor: cont.setting.theme.colors.background,
            marginTop: -30,// borderTopRightRadius: 30, borderTopLeftRadius: 30,
            paddingHorizontal: 30, paddingTop: 20,
        },
        textInput: {
            fontSize: 17, borderWidth: 1,
            alignSelf: 'center', backgroundColor: cont.setting.theme.colors.border,
            color: cont.setting.theme.colors.text,
            width: '90%', borderRadius: 10,
            marginVertical: 20, paddingHorizontal: 15
        },
        content: {
            color: cont.setting.theme.colors.text,
            fontSize: 15, marginBottom: 'auto',
            paddingHorizontal: 30, paddingBottom: 20,
            fontWeight: 'bold'
        },
        infoText: {
            color: cont.setting.theme.colors.text, fontSize: 14,
            paddingHorizontal: 5
        },
        scrapView: {
            flexDirection: 'row', alignItems: 'center',
            paddingHorizontal: 30, paddingVertical: 20
        },
        scrapText: {
            color: cont.setting.theme.colors.text,
            fontSize: 14, marginHorizontal: 5
        }
    })

    return <View style={{ flex: 1 }}>
        <View style={{ padding: 10, flexDirection: 'row', alignItems: 'center' }}>
            <BackButton />
            <Text style={styles.topTitle}>스크랩</Text>
        </View>
        {data.length == 0 ?
            <Text style={{
                color: cont.setting.theme.colors.text, fontSize: 15,
                flex: 1, textAlignVertical: 'center', textAlign: 'center'
            }}>
                스크랩한 이벤트가 없습니다.</Text> :
            <FlatList
                data={data}
                renderItem={renderItem}
                keyExtractor={item => item._id}
                showsVerticalScrollIndicator={false}
            />}
    </View>
}

function getJSON(setData) {
    axios({
        method: 'get',
        url: 'http://192.249.18.79/eventboard/event/scrap'
    })
        .then(function (response) {
            if ((typeof response.data) == 'string')
                setData(() => JSON.parse(response.data))
            else
                setData(() => response.data)
        })
        .catch(function (error) {
            console.log(error);
        })
}

function initData() {
    return [
        {
            _id: '',
            title: '',
            location: '',
            content: '',
            time: '',
            headCount: 1
        }
    ]
}