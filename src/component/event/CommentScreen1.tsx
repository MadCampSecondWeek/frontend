import { useNavigation } from "@react-navigation/core"
import axios from "axios"
import React, { FC, useState } from "react"
import { StyleSheet, Text, View } from "react-native"
import { useContextOfAll } from "../../Provider"


export type typeForComment = {_id: string}

export const Screen1: FC<typeForComment> = () => {
    const [data, setData] = useState(initState())
    const cont = useContextOfAll()
    const navi = useNavigation<any>()

    // useEffect(() => { getJSON(setData, _id, cont) }, [])

    const styles = StyleSheet.create({
        count: {
            fontSize: 13, color: cont.setting.theme.colors.text,
            marginHorizontal: 3
        },
        countView: {
            marginHorizontal: 3, flexDirection: 'row', alignItems: 'center'
        },
        commentView: {
            width: '98%', alignSelf: 'center',
            borderColor: cont.setting.theme.colors.border, borderWidth: 1,
            borderRadius: 5, padding: 5
        },
        commentRow: {
            justifyContent: 'space-between', flexDirection: 'row',
            padding: 3, alignItems: 'center'
        },
        commentContent: {
            color: cont.setting.theme.colors.text, fontSize: 15,
            padding: 3
        },
        commentTime: {
            color: 'grey', fontSize: 14
        },
        textInputRow: {
            borderWidth: 1, borderColor: cont.setting.theme.colors.border,
            width: '95%', backgroundColor: cont.setting.theme.colors.card,
            alignSelf: 'center', borderRadius: 15, flexDirection: 'row',
            justifyContent: 'space-between', alignItems: 'center',
            marginTop: 'auto', marginBottom: 5
        },
        textInput: {
            color: cont.setting.theme.colors.text,
            paddingHorizontal: 15,
            fontSize: 15, paddingVertical: 0,
            flex: 1
        }
    })
    console.log("??")
    
    return <View style={{backgroundColor: 'red', height: 100, width: 100, position: 'relative'}}>
        <Text>??</Text>
        {/* {data.comments.map((v) => { console.log(v); return <View key={v._id} style={styles.commentView}>
            <View style={styles.commentRow}>
                <Text style={{ color: cont.setting.theme.colors.text, fontSize: 17, fontWeight: 'bold' }}>
                    {v.author}{v.commenterNumber}</Text>
                <TouchableOpacity>
                    <Icon name='dots-vertical' color='grey' size={17} />
                </TouchableOpacity>
            </View>
            <Text style={styles.commentContent}>{v.content}</Text>
            <View style={styles.commentRow}>
                <Text style={styles.commentTime}>{v.time}</Text>
                <TouchableOpacity style={styles.countView}>
                    <Icon name='heart-outline' color='tomato' size={16} />
                    <Text style={styles.count}>{v.likeCount}</Text></TouchableOpacity>
            </View>
        </View>})} */}
    </View>
}

function getJSON(setData, postid, cont) {
    axios({
        method: 'get',
        url: 'http://192.249.18.79/board/post?postid='+postid+'&userid='+cont.user._id
    })
        .then(function (response) {
            setData(response.data)
            console.log(response.data)
        })
        .catch(function (error) {
            console.log(error);
        })
}

function initState() {
    return {
        post: {
            _id: "게시글 고유번호",
            title: "게시글 제목",
            content: "게시글 상세 내용",
            likeCount: 3,
            commentCount: 1,
            writerId: "작성자 고유번호"
        },
        comments: [
            {
                _id: "댓글 고유번호",
                author: "댓글 작성자 고유번호",
                commenterNumber: 1,
                content: "댓글 내용",
                likeCount: 4,
                time: "22/01/07 09:22"
            }
        ]
    }
}