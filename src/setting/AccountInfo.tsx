import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { BackButton } from '../component/util'
import { useContextOfAll } from '../Provider'

export default function AccountInfo() {
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
            width: '90%', alignSelf: 'center', borderWidth: 1,
            borderRadius: 20, paddingVertical: 15, paddingHorizontal: 35,
            borderColor: cont.setting.theme.colors.border, marginTop: 10
        },
        text: {
            fontSize: 15, color: cont.setting.theme.colors.text,
            textAlignVertical: 'center', textAlign: 'center'
        }
    })

    return <View>
        <View style={styles.titleView}>
            <BackButton />
            <Text style={styles.title}>계정 정보</Text>
        </View>
        <TouchableOpacity style={styles.row} onPress={() => { cont.setLogin(false) }}>
            <Text style={styles.text}>로그아웃</Text>
        </TouchableOpacity>
    </View>
}