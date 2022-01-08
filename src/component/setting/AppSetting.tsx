import React from 'react'
import { useNavigation } from '@react-navigation/native'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { useContextOfAll } from '../../Provider'

export default function AppSetting() {
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
        <Text style={style.title}>앱 설정</Text>
        <TouchableOpacity onPress={()=>{navi.navigate('DarkModeSetting')}}>
            <Text style={style.text}>다크모드</Text></TouchableOpacity>
    </View>
}