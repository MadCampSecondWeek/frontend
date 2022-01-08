import React from "react"
import { StyleSheet, Text, View } from "react-native"
import { useContextOfAll } from "../Provider"

export default function Message() {
    const cont = useContextOfAll()
    const style = StyleSheet.create({
        title: {
            margin: 15, fontSize: 20,
            fontWeight: 'bold', color: cont.setting.theme.colors.text
        }
    })
    return <View>
        <Text style={style.title}>메시지</Text>
        
    </View>
}