import React, { useState } from "react"
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native"
import { useNavigation } from "@react-navigation/native"
import { useContextOfAll } from "../Provider"
import axios from "axios"

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errorMsg, setError] = useState('')
  const cont = useContextOfAll()
  const navi = useNavigation<any>()
  return <View style={style.container}>
    <Text style={style.title}>Login</Text>
    <TextInput placeholder='이메일' onChangeText={setEmail} keyboardType='email-address' style={style.textInput} />
    <TextInput placeholder='비밀번호' onChangeText={setPassword} secureTextEntry={true} style={style.textInput} />
    <Text style={style.errorMsg}>{errorMsg}</Text>
    <TouchableOpacity onPress={() => { onPress(email, password, setError, cont) }}>
      <Text style={style.loginBtn}>로그인</Text></TouchableOpacity>
    <View style={style.bottomView}>
      <View style={{ borderRightWidth: 1, borderColor: 'grey' }}>
        <TouchableOpacity onPress={() => { navi.replace('SignUp') }}>
          <Text style={style.bottomEach}>회원가입</Text></TouchableOpacity>
      </View>
      <TouchableOpacity>
        <Text style={style.bottomEach}>비밀번호 재설정</Text></TouchableOpacity>
    </View>
  </View>
}

function onPress(email, password, setError, cont) {
  axios({
    method: 'post',
    url: 'http://192.249.18.79/auth/login',
    data: { email: 'ggg@naver.com', password: 'ggg' }
  })
    .then(function (response) {
      console.log("then")
      console.log(response.data)
      cont.setLogin(true)
    })
    .catch(function (error) {
      console.log("catch")
      console.log(error);
      setError("아이디와 패스워드를 다시 확인해주세요.")
    })
}

const style = StyleSheet.create({
  container: {
    flex: 1, borderWidth: 1, alignItems: 'center',
    justifyContent: 'center'
  },
  title: {
    fontSize: 30, marginBottom: 100, fontWeight: 'bold',
    color: 'skyblue', marginTop: 50
  },
  textInput: {
    width: 300, height: 50, borderWidth: 1,
    borderColor: 'grey', marginVertical: 10,
    paddingHorizontal: 10
  },
  loginBtn: {
    width: 300, height: 50, textAlign: 'center', textAlignVertical: 'center',
    backgroundColor: 'skyblue', marginVertical: 10,
    color: 'white', fontSize: 15, fontWeight: 'bold'
  },
  bottomView: {
    flexDirection: 'row',
    width: 300, marginTop: 30
  },
  bottomEach: {
    fontSize: 13, width: 150, textAlign: 'center',
    height: 20, textAlignVertical: 'center'
  },
  errorMsg: {
    color: 'red', width: 300,
    fontSize: 12, textAlign: 'left'
  }
})