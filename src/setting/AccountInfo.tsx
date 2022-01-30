import axios from 'axios'
import React from 'react'
import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
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
        <View style={{flexDirection: 'row', padding: 30}}>
            <Text style={[styles.text, {fontSize: 17, fontWeight: 'bold', marginRight: 20}]}>학교</Text>
            <Text style={styles.text}>{cont.user.school}</Text>
        </View>
        <TouchableOpacity style={styles.row} onPress={() => { onPressLogout(cont) }}>
            <Text style={styles.text}>로그아웃</Text>
        </TouchableOpacity>
    </View>
}

function onPressLogout(cont) {
    Alert.alert('로그아웃', '로그아웃 하시겠습니까?', [{ text: '취소' }, {
        text: '확인', onPress: () => {
            axios({
                method: 'post',
                url: 'http://192.249.18.79/auth/logout'
            })
                .then(function (response) {
                    cont.setLogin(false)
                })
                .catch(function (error) {
                    console.log(error);
                })
        }
    }])
}