import { useNavigation } from '@react-navigation/native'
import React, { FC } from 'react'
import { TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { useContextOfAll } from '../Provider'

export const BackButton: FC<{}> = () => {
    const cont = useContextOfAll()
    const navi = useNavigation<any>()
    return <TouchableOpacity onPress={() => { navi.goBack() }}>
        <Icon name='chevron-left' color={cont.setting.theme.colors.text} size={30} style={{ padding: 5 }} />
    </TouchableOpacity>
}

export const CancelButton: FC<{}> = () => {
    const cont = useContextOfAll()
    const navi = useNavigation<any>()
    return <TouchableOpacity onPress={() => { navi.goBack() }}>
        <Icon name='close' color={cont.setting.theme.colors.text} size={28}
            style={{ padding: 8 }} /></TouchableOpacity>
}