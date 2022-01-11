import { useNavigation } from "@react-navigation/native"
import React, { useState } from "react"
import { StyleSheet, Text, TouchableOpacity, View } from "react-native"
import Icon from "react-native-vector-icons/MaterialCommunityIcons"
import {EventList} from "../component/event/EventList"
import { useContextOfAll } from "../Provider"

export default function Event({route}) {
    const navi = useNavigation<any>()
    const cont = useContextOfAll()

    if (!(route.params === undefined))
        navi.navigate('이벤트 정보', {_id: route.params._id})

    const styles = StyleSheet.create({
        title: {
            color: cont.setting.theme.colors.text,
            fontSize: 20, padding: 15,
            fontWeight: 'bold'
        }
    })
    
    return <View style={{flex:1}}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
            <Text style={styles.title}>이벤트</Text>
            <View style={{ flexDirection: 'row' }}>
                <TouchableOpacity onPress={() => { navi.navigate("스크랩") }}>
                    <Icon name='star-outline' color='gold' size={25} style={{ padding: 10 }} /></TouchableOpacity>
                <TouchableOpacity onPress={() => { navi.navigate("업로드") }}>
                    <Icon name='pencil-outline' color='royalblue' size={25} style={{ padding: 10 }} /></TouchableOpacity>
            </View>
        </View>
        <EventList/>
    </View>
}