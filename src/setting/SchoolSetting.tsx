import React from 'react'
import { Text } from 'react-native'
import { useContextOfAll } from '../Provider'

export default function SchoolSetting() {
    const cont = useContextOfAll()
    return <Text style={{color: cont.setting.theme.colors.text, fontSize: 30}}>
        학교 정보 및 설정 페이지
    </Text>
}