import React, { useState } from "react";
import { Alert, StyleSheet, Text, TextInput, ToastAndroid, TouchableOpacity, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import { useContextOfAll } from "../Provider";
import { useContextOfLogin } from "./LoginProvider";

export default function SignUpPage() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [errorMsg, setError] = useState('')
    const cont = useContextOfAll()
    const loginCont = useContextOfLogin()
    const navi = useNavigation<any>()
    return <View style={style.container}>
        <Text style={style.title}>Sign Up</Text>
        <TextInput placeholder='이메일' onChangeText={setEmail} keyboardType='email-address'
            style={style.textInput} placeholderTextColor='grey' autoCapitalize='none' />
        <TextInput placeholder='비밀번호' onChangeText={setPassword} secureTextEntry={true}
            style={style.textInput} placeholderTextColor='grey' autoCapitalize='none' />
        <Text style={style.errorMsg}>{errorMsg}</Text>
        <TouchableOpacity onPress={() => { navi.navigate('SchoolSearch') }}>
            <Text style={style.school}>{loginCont.schoolName}</Text></TouchableOpacity>
        <TouchableOpacity onPress={() => { onPress(email, password, setError, cont, loginCont, navi) }}>
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

function onPress(email, password, setError, cont, loginCont, navi) {
    if (loginCont.schoolName == '학교를 선택해주세요') {
        setError('학교를 선택해주세요')
        return
    }
    axios({
        method: 'post',
        url: 'http://192.249.18.79/auth/join',
        data: { email: email, password: password, school: loginCont.schoolName }
    })
        .then(function (response) {
            ToastAndroid.show('회원가입 성공!', ToastAndroid.SHORT)
            navi.replace('Login')
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
        paddingHorizontal: 10, color: 'grey'
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
        height: 20, textAlignVertical: 'center', borderColor: 'grey',
        color: 'grey'
    },
    errorMsg: {
        color: 'red', width: 300,
        fontSize: 12, textAlign: 'left'
    },
    school: {
        borderRadius: 10, fontSize: 16,
        color: 'deepskyblue', borderColor: 'skyblue',
        width: 300, textAlign: 'center', paddingVertical: 5,
        borderWidth: 1
    }
})