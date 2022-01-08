import React, { FC } from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { useContextOfAll } from '../../Provider';
import { Dimensions } from 'react-native';


export const CommentTab: FC<{}> = () => {
    const cont = useContextOfAll()

    const { width, height } = Dimensions.get('window')

    const style = StyleSheet.create({
        text: {
            width: width * 0.5, textAlign: 'center',
            fontSize: 15, padding: 16,
            color: cont.setting.theme.colors.text,
        }
    })

    return <View style={{ flexDirection: 'row' }}>
        <TouchableOpacity>
            <Text style={ [style.text, {backgroundColor: cont.setting.theme.dark ? '#222222':'lightgrey'}] }>댓글</Text>
        </TouchableOpacity>
        <TouchableOpacity>
            <Text style={ [style.text, {backgroundColor: cont.setting.theme.dark ? 'forestgreen':'yellowgreen'}]}>참여 요청</Text>
        </TouchableOpacity>
    </View>
}