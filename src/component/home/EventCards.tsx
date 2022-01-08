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
        <TouchableOpacity style={styles.cardView}>
            <Text style={styles.title}>{currentData.title}</Text>
            <Text numberOfLines={2} ellipsizeMode={'tail'} style={styles.content}>
                {currentData.content}</Text>
            <View style={styles.row}>
                <Icon name='clock-outline' color='blue' size={17} />
                <Text style={styles.infoText}>시간 정보</Text>
            </View>
            <View style={styles.row}>
                <Icon name='map-marker-outline' color='chocolate' size={17} />
                <Text style={styles.infoText}>장소 정보</Text>
            </View>
            <View style={styles.row}>
                <Icon name='account-multiple-outline' color='blueviolet' size={17} />
                <Text style={styles.infoText}>인원 정보</Text>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
                <Icon name='star-outline' color='gold' size={17} />
                <Text style={styles.scrapText}>10</Text></View>
        </TouchableOpacity>
    );

    const styles = StyleSheet.create({
        cardView: {
            width: 260,
            borderRadius: 10, margin: 10,
            borderWidth: 1, borderColor: cont.setting.theme.colors.border,
            padding: 15
        },
        title: {
            color: cont.setting.theme.colors.text,
            fontSize: 18, paddingBottom: 10, fontWeight: 'bold'
        },
        content: {
            color: cont.setting.theme.colors.text,
            fontSize: 14, paddingBottom: 10, marginBottom: 'auto'
        },
        row: {
            paddingVertical: 3, flexDirection: 'row'
        },
        infoText: {
            color: 'grey', fontSize: 13,
            paddingHorizontal: 5
        },
        scrapText: {
            color: cont.setting.theme.colors.text,
            fontSize: 12, marginLeft: 2
        }
    })

    return <View>
        {/* <Text style={styles.top}>진행중인 이벤트</Text> */}
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