import { useNavigation } from "@react-navigation/native"
import axios from "axios"
import React, { useEffect } from "react"
import { useState } from "react"
import { StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { useContextOfAll } from "../../Provider"

export default function PostList(data) {
    const cont = useContextOfAll()
    const navi = useNavigation<any>()

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
            fontSize: 14, color: cont.setting.theme.colors.text,
            fontWeight: 'bold'
        },
        content: {
            fontSize: 13, color: 'grey'
        }
    })

    // useEffect(() => {getJSON(setData)}, [])
    console.log(data)

    return <View style={styles.view}>
        <TouchableOpacity style={styles.titleRow} onPress={() => {navi.navigate('게시판 추가')}}>
            <Text style={styles.title}>게시판</Text>
            <Text style={styles.title2}>{'추가하기  >'}</Text>
        </TouchableOpacity>
        {data.map(v => <TouchableOpacity key={v._id} onPress={() => { navi.navigate("게시글", { name: v.title, _id: v._id }) }}>
            <Text style={styles.row} numberOfLines={1} ellipsizeMode={'tail'}>
                <Text style={styles.post}>{v.title}    </Text>
                <Text style={styles.content}>{v.recentPost}</Text>
            </Text>
        </TouchableOpacity>)}
    </View>
}
