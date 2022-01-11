import React from "react"
import { StyleSheet, Text, View } from "react-native"
import { useContextOfAll } from "../Provider"
// import io from 'socket.io-client'


export default function Message() {
    const cont = useContextOfAll()
    const style = StyleSheet.create({
        title: {
            margin: 15, fontSize: 20,
            fontWeight: 'bold', color: cont.setting.theme.colors.text
        }
    })

    const io = require('socket.io-client');

    const socket = io('http://192.249.18.79', {
        transports: ['websocket'],
        jsonp: false
      });

    console.log(socket)

    const url = new URL('http://192.249.18.79:80');

    socket.connect(url, {
        transports: ['websocket'],
        jsonp: false
      });

    console.log(socket)

    socket.on('connect', () => {
        console.log('connection');
    })

    socket.emit("join", 2100)

    console.log(socket)

    // socket.on('disconnect', () => {
    //     console.log('connection to server lost.');
    // });

    // socket.on('newMessage', (message) => {
    //     console.log(message)
    // });

    return <View>
        <Text style={style.title}>메시지</Text>
        <Text></Text>
    </View>
}


// function tmp() {
//     const socket = io('http://292.249.18.79:80', {
//         transports: ['websocket'],
//         jsonp: false
//     });

//     socket.connect();

//     socket.on('connect', () => {
//         console.log('connection');
//     })

//     socket.on('disconnect', () => {
//         console.log('connection to server lost.');
//     });

//     socket.on('newMessage', (message) => {
//         console.log(message)
//     });

// }