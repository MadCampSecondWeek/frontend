import { useNavigation } from '@react-navigation/core'
import axios from 'axios'
import React, { useState } from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { TextInput } from 'react-native-gesture-handler'
import { BackButton } from '../component/util'
import { useContextOfAll } from '../Provider'

export default function Add() {
    const [title, setT] = useState('')
    const navi = useNavigation<any>()
    const cont = useContextOfAll()

    const styles = StyleSheet.create({
        title: {
            fontSize: 18, color: cont.setting.theme.colors.text,
            fontWeight: 'bold'
        },
        textInput: {
            fontSize: 17, borderWidth: 1,
            alignSelf: 'center', backgroundColor: cont.setting.theme.colors.border,
            color: cont.setting.theme.colors.text,
            width: '90%', borderRadius: 10,
            marginVertical: 20, paddingHorizontal: 15
        },
        button: {
            fontSize: 15, color: 'black',//cont.setting.theme.colors.text,
            backgroundColor: 'tomato', width: '90%',
            alignSelf: 'center',// marginTop: 10,
            borderRadius: 10, textAlign: 'center', padding: 7
        }
    })

    return <View>
        <View style={{padding: 10, flexDirection: 'row', alignItems: 'center'}}>
            <BackButton />
            <Text style={styles.title}>게시판 추가하기</Text>
        </View>
        <TextInput value={title} onChangeText={setT} style={styles.textInput} />
        <TouchableOpacity onPress={() => { tmp(title, navi) }}>
            <Text style={styles.button }>추가하기</Text></TouchableOpacity>
    </View>
}

function tmp(title, navi) {
    axios({
        method: 'post',
        url: 'http://192.249.18.79/add',
        data: { title: title }
    })
        .then(function (response) {
            console.log(response.data)
            navi.goBack()
        })
        .catch(function (error) {
            console.log(error);
        })
}