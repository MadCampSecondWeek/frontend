import { useNavigation } from '@react-navigation/core'
import axios from 'axios'
import React, { useState } from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import { TextInput } from 'react-native-gesture-handler'

export default function Add() {
    const [title, setT] = useState('')
    const navi = useNavigation<any>()
    return <View><TouchableOpacity onPress={() => { tmp(title, navi) }}>
        <Text style={{ fontSize: 20, color: 'white' }}>추가추ㅏㄱ추가</Text></TouchableOpacity>
        <TextInput value={title} onChangeText={setT} style={{color: 'white', fontSize: 20, borderColor: 'white', borderWidth: 1}}/>
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