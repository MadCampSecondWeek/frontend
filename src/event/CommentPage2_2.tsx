import { useNavigation } from '@react-navigation/core'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Alert, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { useContextOfAll } from '../Provider'

export default function CommentPage2_2({ route }) {
    const [data, setData] = useState(initData())
    const [loading, setLoading] = useState(true)
    const navi = useNavigation<any>()
    const cont = useContextOfAll()

    useEffect(() => { getJSON(setData, setLoading, route.params._id) }, []);

    const styles = StyleSheet.create({
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
                <Text style={styles.topTitle}>???????????? ??????</Text></View>
            <TouchableOpacity onPress={() => { onPressDelete(data._id, navi) }}>
                <Icon name='delete-outline' color='white' size={25} style={{ paddingRight: 20 }} />
            </TouchableOpacity>
        </View>
        <ScrollView style={{
            borderTopLeftRadius: 30, borderTopRightRadius: 30,
            backgroundColor: cont.setting.theme.colors.background, flex: 1
        }}>
            <Text style={styles.textInputContent} >{data.content}</Text>
            <View style={styles.row}>
                <Text style={styles.tag}>?????????</Text>
                <Text style={styles.info}>{data.school}</Text></View>
            <View style={styles.row}>
                <Text style={styles.tag}>?????????</Text>
                <Text style={styles.info} >{data.contact}</Text></View>
            <View style={styles.row}>
                <Text style={styles.tag}>?????????</Text>
                <Text style={styles.info}>{data.school}</Text></View>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Text style={[styles.acceptance, { fontWeight: 'bold' }]}>?????? ??????</Text>
                <Text style={[styles.acceptance, { fontSize: 16 }]}>{data.status ? '?????? ??????' : '?????? ??????'}</Text>
            </View>
        </ScrollView>
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

function onPressDelete(eventformid, navi) {
    Alert.alert("??????", "????????? ?????????????????????????", [{ text: '??????' }, {
        text: '??????', onPress: () => {
            axios({
                method: 'delete',
                url: 'http://192.249.18.79/eventboard/apply?eventformid=' + eventformid
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
        _id: '', content: '', contact: '', headCount: '', school: '', status: false
    }
}