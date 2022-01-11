import React, { useEffect, useRef, useState } from "react"
import { ScrollView, StyleSheet, Text, TextInput, ToastAndroid, TouchableOpacity, View } from "react-native"
import { useContextOfAll } from "../Provider"
import io from 'socket.io-client'
import Icon from "react-native-vector-icons/MaterialCommunityIcons"
import { useNavigation } from "@react-navigation/native"

export default function Message() {
    const [msg, setMsg] = useState('연결 시도 중')
    const [msgList, setMsgList] = useState([{msg: '', isMe: true}])
    const [comment, setComment] = useState('')
    const cont = useContextOfAll()

    const navi = useNavigation<any>()

    useEffect(() => {
        const reload = navi.addListener('focus', () => {
            setMsgList(() => [])
        });
        return reload;
    }, [navi]);

    const styles = StyleSheet.create({
        title: {
            margin: 15, fontSize: 20,
            fontWeight: 'bold', color: cont.setting.theme.colors.text
        },
        connectMsg: {
            color: 'green', fontSize: 14,
            fontWeight: 'bold', margin: 15
        },
        textInputRow: {
            borderWidth: 1, borderColor: cont.setting.theme.colors.border,
            width: '95%', backgroundColor: cont.setting.theme.colors.card,
            alignSelf: 'center', borderRadius: 15, flexDirection: 'row',
            justifyContent: 'space-between', alignItems: 'center',
            marginTop: 'auto', marginBottom: 5
        },
        textInput: {
            color: cont.setting.theme.colors.text,
            paddingHorizontal: 15,
            fontSize: 15, paddingVertical: 0,
            flex: 1
        },
        bubble: {
            backgroundColor: cont.setting.theme.colors.border,
            borderRadius: 10, color: cont.setting.theme.colors.text,
            maxWidth: '60%', marginHorizontal: 10, marginVertical: 5,
            paddingHorizontal: 10, paddingVertical: 10
        }
    })

    // const socket = io('http://192.249.18.79/', {
    //     // transports: ['websocket'],
    //     // jsonp: false,
    //     path: '/',
    //     // autoConnect: false
    //     // forceNew: true,
    //     // reconnectionAttempts: 'Infinity'
    // });

    const school = 2100;

    const socket = useRef<any>(null)

    useEffect(() => {
        socket.current = new io('http://192.249.18.79:80')
        socket.current?.connect();
        socket.current?.on('connect', () => {
            console.log('connection');
            setMsg('연결 성공')
        })
        socket.current?.emit('join', cont.user.school);
        socket.current?.on('getMessage', (message) => {
            setMsgList((prev) => { let newList = [...prev]; newList.push({msg: message, isMe: false}); return newList })
        });
        console.log("useEffect")
        console.log(socket)
        // return socket.current?.close()
    }, [])

    const onPressComment = () => {
        if (comment.length == 0) {
            ToastAndroid.show('메시지를 작성해주세요', ToastAndroid.SHORT)
            return
        }
        socket.current?.emit('send', { school: school, message: comment })
        setMsgList((prev) => { let newList = [...prev]; newList.push({msg: comment, isMe: true}); return newList })
        setComment(() => '')
    }

    let tmpRef = useRef<ScrollView | null>(null)

    return <View style={{ flex: 1 }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
            <Text style={styles.title}>메시지</Text>
            <Text style={styles.connectMsg}>{msg}</Text>
        </View>
        <ScrollView style={{ flex: 1 }} ref={tmpRef}
            onContentSizeChange={() => tmpRef?.current?.scrollToEnd({ animated: true })}>
            {msgList.map((v, i) => {
                return v.isMe ? <Text style={[styles.bubble, {alignSelf: 'flex-end'}]} key={i}>{v.msg}</Text> :
            <Text style={[styles.bubble, {alignSelf: 'flex-start'}]} key={i}>{v.msg}</Text>}
            )}
        </ScrollView>
        <View style={styles.textInputRow}>
            <TextInput style={styles.textInput} multiline={true} numberOfLines={2}
                value={comment} onChangeText={setComment} />
            <TouchableOpacity onPress={() => { onPressComment() }}>
                <Icon name='check-bold' size={20} color='green' style={{ padding: 6 }} />
            </TouchableOpacity>
        </View>
    </View>
}