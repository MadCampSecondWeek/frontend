import { useNavigation } from '@react-navigation/native'
import React from 'react'
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { useContextOfAll } from '../Provider'

export default function Upload() {
    const navi = useNavigation<any>()
    const cont = useContextOfAll()

    const styles = StyleSheet.create({
        title: {
            color: cont.setting.theme.colors.text,
            fontSize: 18, fontWeight: 'bold'
        }
    })

    return <View>
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <TouchableOpacity onPress={() => { navi.goBack() }}>
                    <Icon name='close' color={cont.setting.theme.colors.text} size={28}
                        style={{ padding: 8 }} /></TouchableOpacity>
                <Text style={styles.title}>이벤트 추가</Text></View>
            <TouchableOpacity>
                <Icon name='check-bold' color='green' size={28} style={{ padding: 8 }} />
            </TouchableOpacity>
        </View>
        <ScrollView>
            <Text style={{ color: 'white' }}>제목</Text>
            <TextInput style={{ color: 'white', borderWidth: 1, borderColor: 'white' }} />
        </ScrollView>
    </View>
}