import { useNavigation } from '@react-navigation/native'
import axios from 'axios'
import React, { useState } from 'react'
import { ScrollView, Text, TouchableOpacity, View } from 'react-native'
import { TextInput } from 'react-native-gesture-handler'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { useContextOfLogin } from './LoginProvider'

export default function SchoolSearch() {
    const [text, setText] = useState('')
    const [names, setNames] = useState([''])
    const navi = useNavigation<any>()
    const loginCont = useContextOfLogin()
    return <View style={{ backgroundColor: 'white', flex: 1 }}>
        <View style={{ justifyContent: 'space-between', flexDirection: 'row' }}>
            <Text style={{ fontSize: 20, color: 'black', padding: 15 }}>
                학교 설정</Text>
            <TouchableOpacity onPress={() => { navi.goBack() }}>
                <Icon name='check-bold' color='royalblue' size={28} style={{ padding: 15 }} />
            </TouchableOpacity>
        </View>
        <View style={{ flexDirection: 'row', marginVertical: 10, alignItems: 'center' }}>
            <TextInput style={{
                color: 'black', fontSize: 18,
                flex: 1, borderRadius: 15, marginLeft: 20,
                borderWidth: 1, borderColor: 'lightgrey', paddingHorizontal: 15
            }} onChangeText={setText} />
            <TouchableOpacity onPress={() => { onPress(text, setNames) }}>
                <Text style={{
                    fontSize: 18, color: 'white',
                    marginHorizontal: 20,// borderWidth: 1,
                    paddingVertical: 10, paddingHorizontal: 15,
                    borderRadius: 10, backgroundColor: 'grey'
                }}>검색</Text></TouchableOpacity>
        </View>
        {names.length == 1 && names[0].length == 0 ? undefined :
            <ScrollView style={{ flex: 1 }}>
                {names.length == 0 ? <TouchableOpacity onPress={() => { loginCont.setSchoolName(text); navi.goBack() }}>
                    <Text style={{
                        borderWidth: 1, borderColor: 'royalblue',
                        marginVertical: 5, marginHorizontal: 20, padding: 10,
                        borderRadius: 10, fontSize: 17, color: 'royalblue', textAlign: 'center'
                    }}>"{text}"(으)로 학교 설정하기</Text></TouchableOpacity> :
                    names.map((v, i) => <TouchableOpacity onPress={() => { loginCont.setSchoolName(v) }} key={i}
                        style={{
                            borderWidth: 1, borderColor: 'royalblue',
                            marginVertical: 5, marginHorizontal: 20, padding: 10,
                            borderRadius: 10, backgroundColor: v == loginCont.schoolName ? 'royalblue' : 'white'
                        }}>
                        <Text style={{ fontSize: 17, color: v == loginCont.schoolName ? 'white' : 'royalblue' }}>{v}</Text>
                    </TouchableOpacity>)}
            </ScrollView>}
    </View>
}

function onPress(text, setNames) {
    axios({
        // method: 'delete',
        url: 'https://open.neis.go.kr/hub/schoolInfo?Key=38f41b176c6846b3b7293d1d63174705&Type=json&SCHUL_NM=' + text
    })
        .then(function (response) { // 실패 에러코드는 400, 정상의 경우 200
            let info = JSON.parse(response.request._response)
            // info = JSON.parse(info.schoolInfo[1].row)
            // console.log(info.schoolInfo[1].row[0].SCHUL_NM)
            // const school = info.schoolInfo[1].row[0].SCHUL_NM
            // console.log(info.schoolInfo[1].row[0].SD_SCHUL_CODE)
            // const code = info.schoolInfo[1].row[0].SD_SCHUL_CODE
            let names: String[] = []
            if (!(info.schoolInfo === undefined))
                for (let i = 0; i < (info.schoolInfo[1].row).length; ++i) {
                    // console.log(info.schoolInfo[1].row[i].SCHUL_NM)
                    if (!names.includes(info.schoolInfo[1].row[i].SCHUL_NM))
                        names.push(info.schoolInfo[1].row[i].SCHUL_NM)
                }
            setNames(names)
        })
        .catch(function (error) {
            console.log(error);
        })
}