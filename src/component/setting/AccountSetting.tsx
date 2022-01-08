import React from 'react'
import { Text, TouchableOpacity } from 'react-native'
import { StyleSheet } from 'react-native'
import { View } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { useContextOfAll } from '../../Provider'

export default function AccountSetting() {
    const navi = useNavigation<any>()
    const cont = useContextOfAll()
    
    const style = StyleSheet.create({
        container: {
            width: '95%',
            borderWidth: 1, alignSelf: 'center',
            borderRadius: 20, padding: 20,
            marginVertical: 5, backgroundColor: cont.setting.theme.colors.background,
            borderColor: cont.setting.theme.colors.border
        },
        title: {
            fontSize: 18, color: cont.setting.theme.colors.text,
            marginBottom: 15, fontWeight: 'bold'
        },
        row: {
            flexDirection: 'row', justifyContent: 'space-between'
        },
        text: {
            fontSize: 15, color: cont.setting.theme.colors.text,
            marginVertical: 10
        }
    })

    return <View style={style.container}>
        <Text style={style.title}>계정 설정</Text>
        <TouchableOpacity onPress={()=>{navi.navigate('SchoolSetting')}}>
            <Text style={style.text}>학교 설정</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>{navi.navigate('AccountInfo')}}>
            <Text style={style.text}>계정 정보</Text>
        </TouchableOpacity>
    </View>
}