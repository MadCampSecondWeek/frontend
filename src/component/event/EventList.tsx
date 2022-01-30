import { useNavigation } from '@react-navigation/native'
import axios from 'axios'
import React, { FC, useState } from 'react'
import { useEffect } from 'react'
import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import SelectDropdown from 'react-native-select-dropdown'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { bg } from '../../event/imageArray'
import { useContextOfAll } from '../../Provider'

const BGSIZE = 6

export const EventList: FC<{}> = () => {
    const navi = useNavigation<any>()
    const cont = useContextOfAll()
    const [select, setSelect] = useState(0)
    const [data, setData] = useState([])

    useEffect(() => {
        const reload = navi.addListener('focus', () => {
            getJSON(setData, select)
        });
        return reload;
    }, [navi]);
    useEffect(() => { getJSON(setData, select) }, [select]);
    // useEffect(() => {
    //     getJSON(setData, select)
    // }, [select]);

    const renderItem = ({ item }) => (
        <Item currentData={item} />
    )

    const Item = ({ currentData }) => {
        return <TouchableOpacity style={styles.cardView} onPress={() => {
            navi.navigate("이벤트 정보", { _id: currentData._id })
        }} activeOpacity={1}>
            <Image source={bg[currentData.category - 1]}
                style={{
                    width: '100%', height: 200, borderColor: 'white', alignSelf: 'center',
                    borderTopRightRadius: 10, borderTopLeftRadius: 10
                }}
                resizeMode='cover' />
            <Text style={styles.title}>{currentData.title}</Text>
            <View style={{ justifyContent: 'space-between', flexDirection: 'row' }}>
                <View style={styles.scrapView}>
                    <Icon name='map-marker-outline' color='grey' size={17} />
                    <Text style={[styles.infoText, { color: 'grey' }]}>{currentData.location}</Text></View>
                <View style={styles.scrapView}>
                    <Icon name='star-outline' color='gold' size={17} />
                    <Text style={styles.scrapText}>{currentData.scrapCount}</Text></View>
            </View>
            <Text numberOfLines={2} ellipsizeMode={'tail'} style={styles.content}>
                {currentData.content}</Text>
            <View style={{ justifyContent: 'space-between', flexDirection: 'row', paddingHorizontal: 30, paddingVertical: 10 }}>
                <View style={{ width: '50%' }}>
                    <Text style={[styles.infoText, { color: 'grey' }]}>시간</Text>
                    <Text style={[styles.infoText,]}>{currentData.time}</Text>
                </View>
                <View style={{ width: '50%' }}>
                    <Text style={[styles.infoText, { color: 'grey' }]}>인원</Text>
                    <Text style={[styles.infoText,]}>{currentData.headCount}</Text></View>
            </View>
        </TouchableOpacity>
    }

    const styles = StyleSheet.create({
        cardView: {
            width: '90%', alignSelf: 'center',
            borderRadius: 10, margin: 10,
            borderWidth: 1, borderColor: cont.setting.theme.colors.border,
            backgroundColor: cont.setting.theme.colors.background,
            paddingBottom: 20
        },
        title: {
            color: cont.setting.theme.colors.text,
            fontSize: 24, fontWeight: 'bold',
            backgroundColor: cont.setting.theme.colors.background,
            marginTop: -30,// borderTopRightRadius: 30, borderTopLeftRadius: 30,
            paddingHorizontal: 30, paddingTop: 20,
        },
        content: {
            color: cont.setting.theme.colors.text,
            fontSize: 15, marginBottom: 'auto',
            paddingHorizontal: 30, paddingBottom: 20,
            fontWeight: 'bold'
        },
        infoText: {
            color: cont.setting.theme.colors.text, fontSize: 14,
            paddingHorizontal: 5
        },
        scrapView: {
            flexDirection: 'row', alignItems: 'center',
            paddingHorizontal: 30, paddingVertical: 20
        },
        scrapText: {
            color: cont.setting.theme.colors.text,
            fontSize: 14, marginHorizontal: 5
        }
    })

    const kategorie = ['전체', '스포츠', '스터디', '친목', '게임', '여행', '취미']

    return <View style={{
        flex: 1, backgroundColor: cont.setting.theme.colors.background,
        borderTopLeftRadius: 30, borderTopRightRadius: 30
    }}>
        <SelectDropdown
            data={kategorie}
            onSelect={(selectedItem, index) => {
                setSelect(index)
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

function getJSON(setData, select) {
    axios({
        method: 'get',
        url: 'http://192.249.18.79/eventboard?category=' + select
    })
        .then(function (response) {
            setData(() => response.data)
        })
        .catch(function (error) {
            console.log(error);
        })
}

function initData() {
    return [
        {
            _id: '',
            title: '',
            location: '',
            content: '',
            time: '',
            headCount: 1
        }
    ]
}

function initData2() {
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