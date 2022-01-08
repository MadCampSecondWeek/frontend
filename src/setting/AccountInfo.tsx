import React from 'react'
import { Text } from 'react-native'
import { useContextOfAll } from '../Provider'

export default function AccountInfo() {
    const cont = useContextOfAll()
    return <Text style={{color: cont.setting.theme.colors.text, fontSize: 30}}>
        계정 정보 (및 로그아웃) 페이지
    </Text>
}