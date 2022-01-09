import { useNavigation } from '@react-navigation/native'
import axios from 'axios'
import React, { useState } from 'react'
import { useEffect } from 'react'
import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import SelectDropdown from 'react-native-select-dropdown'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { useContextOfAll } from '../../Provider'

const BGSIZE = 8

export default function EventList() {
    const [data, setData] = useState(initData())
    const navi = useNavigation<any>()
    const cont = useContextOfAll()

    // useEffect(() => { getJSON(setData) }, [])

    const renderItem = ({ item }) => (
        <Item currentData={item} />
    )

    const bg = [require('../../../images/background1.jpg'), require('../../../images/background2.jpg'),
    require('../../../images/background3.jpg'), require('../../../images/background4.jpg'),
    require('../../../images/background5.jpg'), require('../../../images/background6.jpg'),
    require('../../../images/background7.jpg'), require('../../../images/background8.jpg')]

    const Item = ({ currentData }) => (<View>
        <TouchableOpacity style={styles.cardView} onPress={() => { navi.navigate("이벤트 정보") }} activeOpacity={1}>
            <Image source={bg[rand()]}
                style={{
                    width: '100%', height: 150, borderColor: 'white', alignSelf: 'center',
                    borderTopRightRadius: 30, borderTopLeftRadius: 30
                }}
                resizeMode='cover' />
            <Text style={styles.title}>{currentData.title}</Text>
            <View style={{ justifyContent: 'space-between', flexDirection: 'row' }}>
                <View style={styles.row}>
                    <Text style={[styles.infoText, { color: '#83cee0', paddingHorizontal: 0 }]}>{currentData.time}</Text>
                </View>
                <View style={styles.row}>
                    <Icon name='account-multiple-outline' color='#5f5dbd' size={15} />
                    <Text style={[styles.infoText, { color: '#5f5dbd' }]}>{currentData.headCount}</Text>
                </View>
            </View>
            <Text numberOfLines={2} ellipsizeMode={'tail'} style={styles.content}>
                {currentData.content}</Text>
            <View style={styles.row}>
                <Icon name='map-marker-outline' color='grey' size={15} />
                <Text style={styles.infoText}>{currentData.location}</Text>
            </View>
            <View style={styles.scrapView}>
                <Icon name='star-outline' color='gold' size={15} />
                <Text style={styles.scrapText}>{currentData.scrapCount}</Text></View>
        </TouchableOpacity>
    </View>);

    const styles = StyleSheet.create({
        cardView: {
            width: '90%', alignSelf: 'center',
            borderRadius: 30, margin: 10,
            borderWidth: 1, borderColor: cont.setting.theme.colors.border,
            backgroundColor: cont.setting.theme.colors.background
        },
        title: {
            color: cont.setting.theme.colors.text,
            fontSize: 16, fontWeight: 'bold',
            backgroundColor: cont.setting.theme.colors.background,
            marginTop: -30, borderTopRightRadius: 30, borderTopLeftRadius: 30,
            paddingHorizontal: 30, paddingTop: 30,
        },
        content: {
            color: cont.setting.theme.colors.text,
            fontSize: 14, paddingTop: 10, marginBottom: 'auto',
            paddingHorizontal: 30, paddingBottom: 10
        },
        row: {
            paddingVertical: 3, flexDirection: 'row',
            paddingHorizontal: 30
        },
        infoText: {
            color: cont.setting.theme.colors.text, fontSize: 12,
            paddingHorizontal: 5
        },
        scrapView: {
            flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center',
            paddingHorizontal: 30, paddingBottom: 30
        },
        scrapText: {
            color: cont.setting.theme.colors.text,
            fontSize: 12, marginLeft: 2
        }
    })

    const kategorie = ['전체', '스포츠', '스터디', '친목']

    return <View style={{
        flex: 1, backgroundColor: cont.setting.theme.colors.background,
        borderTopLeftRadius: 30, borderTopRightRadius: 30
    }}>
        <SelectDropdown
            data={kategorie}
            onSelect={(selectedItem, index) => {
                console.log(selectedItem, index)
            }}
            buttonTextAfterSelection={(selectedItem, index) => {
                return selectedItem
            }}
            rowTextForSelection={(item, index) => {
                return item
            }}
            defaultButtonText='카테고리'
            buttonStyle={{
                backgroundColor: cont.setting.theme.colors.background,
                width: 110, height: 30, marginVertical: 5, marginHorizontal: 20,
                borderRadius: 10, paddingRight: 5,
                borderColor: cont.setting.theme.colors.border, borderWidth: 1
            }}
            buttonTextStyle={{ color: cont.setting.theme.colors.text, fontSize: 15 }}
            renderDropdownIcon={(isOpened) => <Icon name='chevron-down'
                color={cont.setting.theme.colors.text} size={18} />}
            rowStyle={{
                height: 35, backgroundColor: cont.setting.theme.colors.background,
                borderColor: cont.setting.theme.colors.border
            }}
            rowTextStyle={{ fontSize: 15, color: cont.setting.theme.colors.text }}
        />
        <FlatList
            data={data}
            renderItem={renderItem}
            keyExtractor={item => item._id}
            showsVerticalScrollIndicator={false}
        />
    </View>
}

function rand() {
    return Math.floor(Math.random() * BGSIZE)
}

function getJSON(setData) {
    axios({
        method: 'get',
        url: 'http://192.249.18.79/board'
    })
        .then(function (response) {
            // console.log(response.data)
            console.log(typeof response.data)
            console.log("response 받기 성공")
            setData(() => response.data)
        })
        .catch(function (error) {
            console.log(error);
        })
}

function initData() {
    return [
        {
            _id: "0",
            title: "제목0",
            content: "내용0내용0내용0내용0내용0내용0내용0내용0내용0내용0내용0내용0내용0내용0내용0내용0내용0내용0내용0",
            time: "01/10 13:00 - 01/10 14:00",
            headCount: 10,
            location: "장소",
            scrapCount: 11
        },
        {
            _id: '1',
            title: "제목1",
            content: "내용1",
            time: "01/10 13:00",
            headCount: 10,
            location: "장소",
            scrapCount: 11
        },
        {
            _id: '2',
            title: "제목2",
            content: "내용2",
            time: "01/10 13:00",
            headCount: 10,
            location: "장소",
            scrapCount: 11
        },
        {
            _id: '3',
            title: "제목3",
            content: "내용3",
            time: "시간3",
            headCount: 10,
            location: "장소",
            scrapCount: 11
        },
        {
            _id: '4',
            title: "제목4",
            content: "내용4",
            time: "시간4",
            headCount: 10,
            location: "장소",
            scrapCount: 11
        },
        {
            _id: '5',
            title: "제목5",
            content: "내용4",
            time: "시간4"
        },
        {
            _id: '6',
            title: "제목1",
            content: "내용1",
            time: "시간1"
        },
        {
            _id: '7',
            title: "제목2",
            content: "내용2",
            time: "시간2"
        },
        {
            _id: '8',
            title: "제목3",
            content: "내용3",
            time: "시간3"
        },
        {
            _id: '9',
            title: "제목4",
            content: "내용4",
            time: "시간4"
        },
        {
            _id: '10',
            title: "제목5",
            content: "내용4",
            time: "시간4"
        },
        {
            _id: '11',
            title: "제목1",
            content: "내용1",
            time: "시간1"
        },
        {
            _id: '12',
            title: "제목2",
            content: "내용2",
            time: "시간2"
        },
        {
            _id: '13',
            title: "제목3",
            content: "내용3",
            time: "시간3"
        },
        {
            _id: '14',
            title: "제목4",
            content: "내용4",
            time: "시간4"
        },
        {
            _id: '15',
            title: "제목5",
            content: "내용4",
            time: "시간4"
        },
        {
            _id: '16',
            title: "제목1",
            content: "내용1",
            time: "시간1"
        },
        {
            _id: '17',
            title: "제목2",
            content: "내용2",
            time: "시간2"
        },
        {
            _id: '18',
            title: "제목3",
            content: "내용3",
            time: "시간3"
        },
        {
            _id: '19',
            title: "제목4",
            content: "내용4",
            time: "시간4"
        },
        {
            _id: '20',
            title: "제목5",
            content: "내용4",
            time: "시간4"
        }
    ]

    // [
    //     {
    //         _id: "0",
    //         title: "제목0",
    //         content: "내용0",
    //         writer: "스트링",
    //         likeCount: 1,
    //         commentCount: 2,
    //         createdAt: "스트링"
    //     }]
}