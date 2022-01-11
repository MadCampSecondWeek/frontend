import { useNavigation } from '@react-navigation/core'
import React from 'react'
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { useContextOfAll } from '../Provider'

export default function CommentPage2_2() {
    const navi = useNavigation<any>()
    const cont = useContextOfAll()
    const styles = StyleSheet.create({
        topTitle: {
            color: 'white',
            fontSize: 18, fontWeight: 'bold'
        },
        textInputContent: {
            borderColor: cont.setting.theme.colors.border,
            color: cont.setting.theme.colors.text,
            padding: 20, borderRadius: 0, fontSize: 16,
            borderBottomWidth: 1, marginTop: 30,
            textAlignVertical: 'top'
        },
        tag: {
            fontSize: 16, color: cont.setting.theme.colors.text,
            paddingHorizontal: 20
        },
        info: {
            fontSize: 15, paddingVertical: 3,
            color: cont.setting.theme.colors.text,
            paddingHorizontal: 20,
            marginHorizontal: 20, flex: 1
        },
        row: {
            borderBottomWidth: 1, borderColor: cont.setting.theme.colors.border,
            flexDirection: 'row', alignItems: 'center', paddingVertical: 6
        },
        acceptance: {
            fontSize: 16, paddingTop: 20,
            color: cont.setting.theme.colors.text,
            marginHorizontal: 20, textAlign: 'center'
        }
    })

    return <View style={{ flex: 1, backgroundColor: '#192965' }}>
        <View style={{ justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center' }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', padding: 10 }}>
                <TouchableOpacity onPress={() => { navi.goBack() }}>
                    <Icon name='chevron-left' color='white' size={30} style={{ padding: 5 }} />
                </TouchableOpacity>
                <Text style={styles.topTitle}>참여요청 정보</Text></View>
        </View>
        <ScrollView style={{
            borderTopLeftRadius: 30, borderTopRightRadius: 30,
            backgroundColor: cont.setting.theme.colors.background, flex: 1
        }}>
            <Text style={styles.textInputContent} >내용</Text>
            <View style={styles.row}>
                <Text style={styles.tag}>학교명</Text>
                <Text style={styles.info}>학교 신청 정보</Text></View>
            <View style={styles.row}>
                <Text style={styles.tag}>연락처</Text>
                <Text style={styles.info} >연락처 정보</Text></View>
            <View style={styles.row}>
                <Text style={styles.tag}>인원수</Text>
                <Text style={styles.info}>10</Text></View>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Text style={[styles.acceptance, {fontWeight: 'bold'}]}>요청 상태</Text>
                <Text style={[styles.acceptance, {fontSize: 16}]}>수락 대기</Text>
            </View>
        </ScrollView>
    </View>
}