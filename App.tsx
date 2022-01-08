import axios from 'axios'
import React from 'react'
import { useState } from 'react'
import { Text, View } from 'react-native'
import LoginNavigator from './src/login/LoginNavigator'
import MainNavigator from './src/MainNavigator'
import { Provider } from './src/Provider'

// export default function App() {
  // const [myText, setText] = useState('초기 텍스트')
  // const tmp = fetch('https://172.10.5.54/', {
  //   method: 'GET'
  // }).then((response) => {
  //   console.log("들어옴")
  //   return response.toString()
  //   // setText(response.toString())
  //   // console.log("왜 안 뜨지 ㅠㅠ")
  // })
  // console.log(tmp)

  // const getRepotNo = async () => {

  // console.log("실행전")
  // const tmp = await fetch("http://172.10.5.54:80/", {method: 'GET'},)
  // console.log(tmp)
  // console.log("음...")
  // }
  // getRepotNo()

// export default function App() {  
//   // setInterval(() => {
//     axios({
//       method:'get',
//       url:'https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=df745593a857652090038409d262cbb4&redirect_uri=http://192.249.18.79/auth/kakao'
//     })
//     .then(function (response) {
//       console.log(response.data)
//     })
//     .catch(function (error) {
//       console.log(error);
//     })//.then(function () {
//     //   console.log("항상 실행 되는 코드")
//     // });
//     // console.log("실행됨")}, 1000)
//   return <View><Text>그냥 텍스트</Text></View>
// }

export default function App() {
  const [isLoggedIn, setLogin] = useState(true) // 원래 false
  if (!isLoggedIn)
    return <LoginNavigator />
  return <Provider><MainNavigator /></Provider>
}