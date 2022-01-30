import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import React, { useState } from 'react'
import { useEffect } from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useContextOfAll } from '../Provider';

export default function HostPage({ route }) {
    const [data, setData] = useState(initData())
    const [loading, setLoading] = useState(true)
    const navi = useNavigation<any>()
    const cont = useContextOfAll()

    // console.log(route)
    useEffect(() => { getJSON(setData, setLoading, route.params._id) }, []);

    const renderItem = ({ item }) => (
        <Item currentData={item} />
    )

    const Item = ({ currentData }) => <View style={styles.cardView}>
        <Text style={styles.textInputContent} >{currentData.content}</Text>
        <View style={styles.row}>
            <Text style={styles.tag}>학교명</Text>
            <Text style={styles.info}>{currentData.school}</Text></View>
        <View style={styles.row}>
            <Text style={styles.tag}>연락처</Text>
            <Text style={styles.info} >{currentData.contact}</Text></View>
        <View style={styles.row}>
            <Text style={styles.tag}>인원수</Text>
            <Text style={styles.info}>{currentData.school}</Text></View>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text style={[styles.acceptance, { fontWeight: 'bold' }]}>요청 상태</Text>
            <Text style={[styles.acceptance, { fontSize: 16 }]}>{currentData.status ? '요청 수락' : '수락 대기'}</Text>
        </View>
    </View>

    const styles = StyleSheet.create({
        cardView: {
            width: '90%', alignSelf: 'center',
            borderRadius: 10, margin: 10,
            borderWidth: 1, borderColor: cont.setting.theme.colors.border,
            backgroundColor: cont.setting.theme.colors.background,
            paddingBottom: 20
        },
        topTitle: {
            color: 'white',
            fontSize: 18, fontWeight: 'bold'
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
            color: cont.setting.theme.colors.text,
            paddingHorizontal: 20,
            marginHorizontal: 20, flex: 1
        },
        row: {
            borderBottomWidth: 1, borderColor: cont.setting.theme.colors.border,
            flexDirection: 'row', alignItems: 'center', paddingVertical: 6
        },
        acceptance: {
            fontSize: 16, paddingTop: 20,
            color: cont.setting.theme.colors.text,
            marginHorizontal: 20, textAlign: 'center'
        }
    })

    return <View style={{ flex: 1, backgroundColor: '#192965' }}>
        <View style={{ justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center' }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', padding: 10 }}>
                <TouchableOpacity onPress={() => { navi.goBack() }}>
                    <Icon name='chevron-left' color='white' size={30} style={{ padding: 5 }} />
                </TouchableOpacity>
                <Text style={styles.topTitle}>참여요청 정보</Text></View>
        </View>
        <FlatList
            data={data}
            renderItem={renderItem}
            keyExtractor={item => item._id}
            showsVerticalScrollIndicator={false}
            style={{ flex: 1, borderTopLeftRadius: 30, borderTopRightRadius: 30,
                backgroundColor: cont.setting.theme.colors.background,
            paddingTop: 30 }}
        />
    </View>
}

function getJSON(setData, setLoading, _id) {
    axios({
        method: 'get',
        url: 'http://192.249.18.79/eventboard/apply?eventid=' + _id
    })
        .then(function (response) {
            setData(response.data)
            setLoading(false)
        })
        .catch(function (error) {
            console.log(error);
        })
}

function initData() {
    return [
        { _id: '', content: '', contact: '', headCount: '', school: '', status: false, eventid: '' }
    ]
}