import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { Dimensions } from 'react-native'


export default function CommentTab(cont, navi, _id) {
    const { width, height } = Dimensions.get('window')

    const style = StyleSheet.create({
        text: {
            width: width * 0.5, textAlign: 'center',
            fontSize: 15, padding: 16,
            color: cont.setting.theme.colors.background,
        }
    })

    return <View style={{ flexDirection: 'row' }}>
        <TouchableOpacity onPress={() => {navi.navigate('이벤트 댓글1', {_id: _id})}}>
            <Text style={ [style.text, {backgroundColor: cont.setting.theme.dark ? 'lightgrey' : '#333333'}] }>댓글</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {navi.navigate('이벤트 댓글2_2', {_id: _id})}}>
            <Text style={ [style.text, {backgroundColor: '#FFB830'}]}>참여 요청</Text>
        </TouchableOpacity>
    </View>
}