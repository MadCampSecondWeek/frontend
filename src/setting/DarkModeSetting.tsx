import { useNavigation } from '@react-navigation/native'
import React from 'react'
import { StyleSheet, Switch, Text, TouchableOpacity, View } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { useContextOfAll } from '../Provider'
import { DarkTheme, DayTheme } from '../Themes'

export default function DarkModeSetting() {
    const navi = useNavigation<any>()
    const cont = useContextOfAll()
    const styles = StyleSheet.create({
        titleView: {
            flexDirection: 'row',
            alignItems: 'center',
            paddingTop: 10
        },
        title: {
            margin: 5, fontSize: 20,
            fontWeight: 'bold', color: cont.setting.theme.colors.text
        },
        row: {
            flexDirection: 'row', justifyContent: 'space-between',
            width: '90%', alignSelf: 'center', borderWidth: 1,
            borderRadius: 20, paddingVertical: 15, paddingHorizontal: 35,
            borderColor: cont.setting.theme.colors.border, marginTop: 10
        },
        text: {
            fontSize: 15, color: cont.setting.theme.colors.text,
            textAlignVertical: 'center'
        }
    })

    return <View>
        <View style={styles.titleView}>
            <TouchableOpacity onPress={() => { navi.goBack() }} style={{ paddingHorizontal: 5 }}>
                <Icon name='chevron-left' color={cont.setting.theme.colors.text} size={30} />
            </TouchableOpacity>
            <Text style={styles.title}>다크모드 설정</Text>
        </View>
        <View style={styles.row}>
            <Text style={styles.text}>다크모드</Text>
            <Switch value={cont.setting.theme.dark} onValueChange={
                () => {
                    cont.setSetting(() => {
                        console.log(cont.setting.theme.dark)
                        return cont.setting.theme.dark ? { theme: DayTheme } : { theme: DarkTheme }
                    })
                }} />
        </View>
    </View>
}