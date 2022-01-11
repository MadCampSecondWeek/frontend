import { useNavigation } from '@react-navigation/native'
import axios from 'axios'
import React, { useState } from 'react'
import { ScrollView, Text, TouchableOpacity, View } from 'react-native'
import { TextInput } from 'react-native-gesture-handler'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { BackButton } from '../component/util'
import { useContextOfAll } from '../Provider'

export default function SchoolSetting() {
    const [text, setText] = useState('')
    const [names, setNames] = useState([])
    const [select, setSelect] = useState('')
    const cont = useContextOfAll()
    const navi = useNavigation<any>()
    return <View style={{ backgroundColor: cont.setting.theme.colors.background, flex: 1 }}>
        <View style={{ justifyContent: 'space-between', flexDirection: 'row' }}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <BackButton />
            <Text style={{ fontSize: 20, color: cont.setting.theme.colors.text, padding: 15 }}>
                학교 설정</Text></View>
            <TouchableOpacity onPress={() => { navi.goBack() }}>
                <Icon name='check-bold' color='royalblue' size={28} style={{ padding: 15 }} />
            </TouchableOpacity>
        </View>
        <View style={{ flexDirection: 'row', marginVertical: 10, alignItems: 'center' }}>
            <TextInput style={{
                fontSize: 18, paddingHorizontal: 15,
                flex: 1, borderRadius: 15, marginLeft: 20, paddingVertical: 7,
                borderWidth: 1, borderColor: cont.setting.theme.colors.border,
                color: cont.setting.theme.colors.text
            }} onChangeText={setText} />
            <TouchableOpacity onPress={() => { onPress(text, setNames) }}>
                <Text style={{
                    fontSize: 18, color: 'white',
                    marginHorizontal: 20,
                    paddingVertical: 7, paddingHorizontal: 15,
                    borderRadius: 10, backgroundColor: 'royalblue'
                }}>검색</Text></TouchableOpacity>
        </View>
        <ScrollView style={{ flex: 1 }}>
            {names.map((v) => <TouchableOpacity onPress={() => { setSelect(v) }}
                style={{
                    borderWidth: 1, 
                    marginVertical: 5, marginHorizontal: 20, padding: 10,
                    borderRadius: 10, backgroundColor: v == select ? 'royalblue' : cont.setting.theme.colors.background
                }}>
                <Text style={{ fontSize: 17, color: v == select ? 'white' : cont.setting.theme.colors.text }}>{v}</Text>
            </TouchableOpacity>)}
        </ScrollView>
    </View>
}

function onPress(text, setNames) {
    axios({
        url: 'https://open.neis.go.kr/hub/schoolInfo?Key=38f41b176c6846b3b7293d1d63174705&Type=json&SCHUL_NM=' + text
    })
        .then(function (response) {
            let info = JSON.parse(response.request._response)
            let names: String[] = []
            for (let i = 0; i < (info.schoolInfo[1].row).length; ++i) {
                if (!names.includes(info.schoolInfo[1].row[i].SCHUL_NM))
                    names.push(info.schoolInfo[1].row[i].SCHUL_NM)
            }
            setNames(names)
        })
        .catch(function (error) {
            console.log(error);
        })
}
