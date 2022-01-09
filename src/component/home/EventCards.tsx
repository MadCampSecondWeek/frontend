import { useNavigation } from "@react-navigation/native"
import React from "react"
import { FlatList, StyleSheet, Text, View, TouchableOpacity } from "react-native"
import Icon from "react-native-vector-icons/MaterialCommunityIcons"
import { useContextOfAll } from "../../Provider"

export default function EventCards() {
    const navi = useNavigation<any>()
    const cont = useContextOfAll()
    const data = getJSON()
    const renderItem = ({ item }) => (
        <Item currentData={item} />
    )

    const Item = ({ currentData }) => (currentData.id == -1 ?
        <TouchableOpacity onPress={() => { navi.navigate('이벤트') }}
            style={{ alignSelf: 'center', alignItems: 'center', padding: 15 }}>
            <Icon name='chevron-double-right' size={30}
                color='grey' />
            <Text style={{ color: 'grey', fontSize: 11 }}>
                더 보기</Text>
        </TouchableOpacity> :
        <TouchableOpacity style={styles.cardView} onPress={() => { navi.navigate("이벤트 정보")}}>
            <Text style={styles.title}>{currentData.title}</Text>
            <View style={styles.row}>
                <Icon name='map-marker-outline' color='grey' size={15} />
                <Text style={styles.infoText}>장소 정보</Text>
            </View>
            <Text numberOfLines={2} ellipsizeMode={'tail'} style={styles.content}>
                {currentData.content}</Text>
            <View style={styles.row}>
                <Text style={[styles.infoText , {color: '#60abfb'}]}>01/10 13:00</Text>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'flex-end', paddingTop: 5 }}>
                <Icon name='account-multiple-outline' color='#9b77da' size={15} />
                <Text style={[styles.infoText, {color:'#9b77da'}]}>10명</Text></View>
        </TouchableOpacity>
    );

    const styles = StyleSheet.create({
        cardView: {
            width: 250,
            borderRadius: 10, margin: 10,
            borderWidth: 1, borderColor: cont.setting.theme.colors.border,
            paddingVertical: 20, paddingHorizontal: 20
        },
        title: {
            color: cont.setting.theme.colors.text,
            fontSize: 16, paddingBottom: 10, fontWeight: 'bold'
        },
        content: {
            color: cont.setting.theme.colors.text,
            fontSize: 13, paddingBottom: 10, marginBottom: 'auto',
            paddingTop: 5
        },
        row: {
            paddingVertical: 3, flexDirection: 'row'
        },
        infoText: {
            color: 'grey', fontSize: 12,
            paddingHorizontal: 5
        },
    })

    return <View>
        <FlatList
            data={data}
            renderItem={renderItem}
            keyExtractor={item => item.id.toString()}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
        />
    </View>
}

function getJSON() {
    return [
        {
            id: 0,
            title: "제목0",
            content: "내용0내용0내용0내용0내용0내용0내용0내용0내용0내용0내용0내용0내용0내용0내용0내용0내용0내용0내용0",
            time: "시간0"
        },
        {
            id: 1,
            title: "제목1",
            content: "내용1",
            time: "시간1"
        },
        {
            id: 2,
            title: "제목2",
            content: "내용2",
            time: "시간2"
        },
        {
            id: 3,
            title: "제목3",
            content: "내용3",
            time: "시간3"
        },
        {
            id: 4,
            title: "제목4",
            content: "내용4",
            time: "시간4"
        },
        {
            id: -1,
        }
    ]
}