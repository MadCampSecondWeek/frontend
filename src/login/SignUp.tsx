import React, { useState } from "react";
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";

export default function SignUpPage() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [errorMsg, setError] = useState('')
    const navi = useNavigation<any>()
    return <View style={style.container}>
        <Text style={style.title}>Sign Up</Text>
        <TextInput placeholder='이메일' onChangeText={setEmail} keyboardType='email-address' style={style.textInput} />
        <TextInput placeholder='비밀번호' onChangeText={setPassword} secureTextEntry={true} style={style.textInput} />
        <Text style={style.errorMsg}>{errorMsg}</Text>
        <TouchableOpacity onPress={() => { onPress(email, password, setError) }}>
            <Text style={style.signUpBtn}>회원가입</Text></TouchableOpacity>
        <View style={style.bottomView}>
            <View style={{ borderRightWidth: 1, borderColor: 'grey' }}>
                <TouchableOpacity onPress={() => { navi.replace('Login') }}>
                    <Text style={style.bottomEach}>로그인</Text></TouchableOpacity>
            </View>
            <TouchableOpacity>
                <Text style={style.bottomEach}>비밀번호 재설정</Text></TouchableOpacity>
        </View>
    </View>
}

function onPress(email, password, cont) {
    axios({
        method: 'post',
        url: 'http://192.249.18.79/auth/join',
        data: { email: '아이디1', password: '패스워드', school: 100 }
    })
        .then(function (response) {
            console.log(response)
            cont.setLogin(response.data)
        })
        .catch(function (error) {
            console.log(error);
        })
}

const style = StyleSheet.create({
    container: {
        flex: 1, borderWidth: 1, alignItems: 'center',
        justifyContent: 'center'
    },
    title: {
        fontSize: 30, marginBottom: 100, fontWeight: 'bold',
        color: 'pink', marginTop: 50
    },
    textInput: {
        width: 300, height: 50, borderWidth: 1,
        borderColor: 'grey', marginVertical: 10,
        paddingHorizontal: 10
    },
    signUpBtn: {
        width: 300, height: 50, textAlign: 'center', textAlignVertical: 'center',
        backgroundColor: 'pink', marginVertical: 10,
        color: 'white', fontSize: 15, fontWeight: 'bold'
    },
    bottomView: {
        flexDirection: 'row', justifyContent: 'space-around',
        width: 300, marginTop: 30
    },
    bottomEach: {
        fontSize: 13, width: 150, textAlign: 'center',
        height: 20, textAlignVertical: 'center', borderColor: 'grey'
    },
    errorMsg: {
        color: 'red', width: 300,
        fontSize: 12, textAlign: 'left'
    }
})