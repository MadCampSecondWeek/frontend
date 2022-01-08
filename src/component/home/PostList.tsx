import { useNavigation } from "@react-navigation/native"
import axios from "axios"
import React, { useEffect } from "react"
import { useState } from "react"
import { StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { useContextOfAll } from "../../Provider"

export default function PostList() {
    const [data, setData] = useState(initState())
    const cont = useContextOfAll()

    const styles = StyleSheet.create({
        view: {
            width: '96%', borderWidth: 1,
            borderColor: cont.setting.theme.colors.border,
            alignSelf: 'center', borderRadius: 10,
            paddingVertical: 15, paddingHorizontal: 20,
            marginVertical: 5
        },
        titleRow: {
            justifyContent: 'space-between', flexDirection: 'row',
            paddingVertical: 8
        },
        title: {
            fontSize: 18, color: cont.setting.theme.colors.text,
            fontWeight: 'bold'
        },
        title2: {
            fontSize: 14, color: 'tomato'
        },
        row: {
            justifyContent: 'flex-start', flexDirection: 'row',
            paddingVertical: 6
        },
        post: {
            fontSize: 15, color: cont.setting.theme.colors.text,
            fontWeight: 'bold'
        },
        content: {
            fontSize: 14, color: cont.setting.theme.colors.text
        }
    })

    useEffect(() => {getJSON(setData)}, [])

    const navi = useNavigation<any>()

    return <View style={styles.view}>
        <TouchableOpacity style={styles.titleRow}>
            <Text style={styles.title}>게시판</Text>
            <Text style={styles.title2}>{'추가하기  >'}</Text>
        </TouchableOpacity>
        {data.map(v => <TouchableOpacity key={v.id} onPress={() => { navi.navigate("게시글", { name: v.name }) }}>
            <Text style={styles.row} numberOfLines={1} ellipsizeMode={'tail'}>
                <Text style={styles.post}>{v.name}    </Text>
                <Text style={styles.content}>{v.content}</Text>
            </Text>
        </TouchableOpacity>)}
    </View>
}

function getJSON(setData) {
    axios({
        method: 'get',
        url: 'http://192.249.18.79/board'
    })
        .then(function (response) {
            console.log(response.data)
        })
        .catch(function (error) {
            console.log(error);
        })
}

function initState() {
    return [
        {
            id: 0,
            name: '게시판명0',
            content: '내용0내용0내용0내용0내용0내용0내용0내용0내용0내용0내용0내용0내용0내용0',
        },
        {
            id: 1,
            name: '게시판명1',
            content: '내용1',
        },
        {
            id: 2,
            name: '게시판명2',
            content: '내용2',
        },
        {
            id: 3,
            name: '게시판명3',
            content: '내용3',
        },
        {
            id: 4,
            name: '게시판명4',
            content: '내용4',
        }
    ]
}