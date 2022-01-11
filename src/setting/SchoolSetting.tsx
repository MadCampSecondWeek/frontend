import axios from 'axios'
import React, { useState } from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import { TextInput } from 'react-native-gesture-handler'
import { useContextOfAll } from '../Provider'

export default function SchoolSetting() {
    const [text, setText] = useState('')
    const cont = useContextOfAll()
    return <View>
        <Text style={{ color: cont.setting.theme.colors.text, fontSize: 30 }}>
            학교 정보 및 설정 페이지
        </Text>
        <TextInput style={{
            color: cont.setting.theme.colors.text, fontSize: 20,
            borderColor: cont.setting.theme.colors.border
        }} onChangeText={setText} />
        <TouchableOpacity onPress={() => { onPress(text) }}>
            <Text style={{ color: cont.setting.theme.colors.text, fontSize: 20, }}>
                검색</Text></TouchableOpacity>
        <Text></Text>
    </View>
}

function onPress(text) {
    axios({
        // method: 'delete',
        url: 'https://open.neis.go.kr/hub/schoolInfo?Key=38f41b176c6846b3b7293d1d63174705&Type=json&SCHUL_NM=' + text
    })
        .then(function (response) { // 실패 에러코드는 400, 정상의 경우 200
            let info = JSON.parse(response.request._response)
            // info = JSON.parse(info.schoolInfo[1].row)
            console.log(info.schoolInfo[1].row[0].SCHUL_NM)
            const school = info.schoolInfo[1].row[0].SCHUL_NM
            console.log(info.schoolInfo[1].row[0].SD_SCHUL_CODE)
            const code = info.schoolInfo[1].row[0].SD_SCHUL_CODE
        })
        .catch(function (error) {
            console.log(error);
        })
}

// {
//     "config": {
//         "adapter": [Function xhrAdapter], "data": undefined, "headers": { "Accept": "application/json, text/plain, */*" }, "maxBodyLength": -1, "maxContentLength": -1, "method": "get", "timeout": 0, "transformRequest": [[Function transformRequest]], "transformResponse": [[Function transformResponse]], "transitional": { "clarifyTimeoutError": false, "forcedJSONParsing": true, "silentJSONParsing": true }, "url": "https://open.neis.go.kr/hub/schoolInfo?Key=38f41b176c6846b3b7293d1d63174705&Type=json&SCHUL_NM=창원과학고등학교", "validateStatus": [Function validateStatus], "xsrfCookieName": "XSRF-TOKEN", "xsrfHeaderName": "X-XSRF-TOKEN"
//     },
//     "data": {
//         "schoolInfo": [[Object], [Object]]
//     },
//     "headers": {
//         "access-control-allow-origin": "*", "cache-control": "no-cache, no-store, max-age=0", "connection": "keep-alive", "content-language": "en-US", "content-type": "text/html;charset=UTF-8", "date": "Mon, 10 Jan 2022 17:20:50 GMT", "expires": "Thu, 01 Jan 1970 00:00:00 GMT", "pragma": "no-cache", "transfer-encoding": "chunked"
//     },
//     "request": {
//         "DONE": 4, "HEADERS_RECEIVED": 2, "LOADING": 3, "OPENED": 1, "UNSENT": 0, "_aborted": false, "_cachedResponse": undefined, "_hasError": false, "_headers": {
//             "accept": "application/json, text/plain, */*"
//         }, "_incrementalEvents": false, "_lowerCaseResponseHeaders": {
//             "access-control-allow-origin": "*", "cache-control": "no-cache, no-store, max-age=0", "connection": "keep-alive", "content-language": "en-US", "content-type": "text/html;charset=UTF-8", "date": "Mon, 10 Jan 2022 17:20:50 GMT", "expires": "Thu, 01 Jan 1970 00:00:00 GMT", "pragma": "no-cache", "transfer-encoding": "chunked"
//         }, "_method": "GET", "_perfKey": "network_XMLHttpRequest_https://open.neis.go.kr/hub/schoolInfo?Key=38f41b176c6846b3b7293d1d63174705&Type=json&SCHUL_NM=창원과학고등학교", "_performanceLogger": {
//             "_closed": false, "_extras": [Object], "_pointExtras": [Object], "_points": [Object], "_timespans": [Object]
//         }, "_requestId": null, "_response": "{\"schoolInfo\":[{\"head\":[{\"list_total_count\":1},{\"RESULT\":{\"CODE\":\"INFO-000\",\"MESSAGE\":\"정상 처리되었습니다.\"}}]},{\"row\":[{\"ATPT_OFCDC_SC_CODE\":\"S10\",\"ATPT_OFCDC_SC_NM\":\"경상남도교육청\",\"SD_SCHUL_CODE\":\"9010429\",\"SCHUL_NM\":\"창원과학고등학교\",\"ENG_SCHUL_NM\":\"Changwon Science High School\",\"SCHUL_KND_SC_NM\":\"고등학교\",\"LCTN_SC_NM\":\"경상남도\",\"JU_ORG_NM\":\"경상남도교육청\",\"FOND_SC_NM\":\"공립\",\"ORG_RDNZC\":\"51371 \",\"ORG_RDNMA\":\"경상남도 창원시 의창구 평산로159 번길 30\",\"ORG_RDNDA\":\"(서상동)\",\"ORG_TELNO\":\"055-711-2300\",\"HMPG_ADRES\":\"http://csh-h.gne.go.kr\",\"COEDU_SC_NM\":\"남여공학\",\"ORG_FAXNO\":\"055-298-0262\",\"HS_SC_NM\":\"특목고\",\"INDST_SPECL_CCCCL_EXST_YN\":\"N\",\"HS_GNRL_BUSNS_SC_NM\":\"일반계\",\"SPCLY_PURPS_HS_ORD_NM\":\"과학계열\",\"ENE_BFE_SEHF_SC_NM\":\"전기\",\"DGHT_SC_NM\":\"주간\",\"FOND_YMD\":\"20110301\",\"FOAS_MEMRD\":\"20110301\",\"LOAD_DTM\":\"20211216\"}]}]}",
//         "_responseType": "", "_sent": true, "_subscriptions": [], "_timedOut": false, "_trackingName": "unknown", "_url": "https://open.neis.go.kr/hub/schoolInfo?Key=38f41b176c6846b3b7293d1d63174705&Type=json&SCHUL_NM=창원과학고등학교", "readyState": 4,
//         "responseHeaders": { "Access-Control-Allow-Origin": "*", "Cache-Control": "no-cache, no-store, max-age=0", "Connection": "keep-alive", "Content-Language": "en-US", "Content-Type": "text/html;charset=UTF-8", "Date": "Mon, 10 Jan 2022 17:20:50 GMT", "Expires": "Thu, 01 Jan 1970 00:00:00 GMT", "Pragma": "no-cache", "Transfer-Encoding": "chunked" }, "responseURL": "https://open.neis.go.kr/hub/schoolInfo?Key=38f41b176c6846b3b7293d1d63174705&Type=json&SCHUL_NM=%EC%B0%BD%EC%9B%90%EA%B3%BC%ED%95%99%EA%B3%A0%EB%93%B1%ED%95%99%EA%B5%90", "status": 200, "timeout": 0, "upload": { }, "withCredentials": true
//     }, "status": 200, "statusText": undefined
// }

// {
//     "schoolInfo": [
//         {
//             "head": [
//                 { "list_total_count": 1 }, { "RESULT": { "CODE": "INFO-000", "MESSAGE": "정상 처리되었습니다." } }]
//         },
//         {
//             "row": [
//                 { "ATPT_OFCDC_SC_CODE": "S10", "ATPT_OFCDC_SC_NM": "경상남도교육청", "SD_SCHUL_CODE": "9010429", "SCHUL_NM": "창원과학고등학교", "ENG_SCHUL_NM": "Changwon Science High School", "SCHUL_KND_SC_NM": "고등학교", "LCTN_SC_NM": "경상남도", "JU_ORG_NM": "경상남도교육청", "FOND_SC_NM": "공립", "ORG_RDNZC": "51371 ", "ORG_RDNMA": "경상남도 창원시 의창구 평산로159번길 30", "ORG_RDNDA": "(서상동)", "ORG_TELNO": "055-711-2300", "HMPG_ADRES": "http://csh-h.gne.go.kr", "COEDU_SC_NM": "남여공학", "ORG_FAXNO": "055-298-0262", "HS_SC_NM": "특목고", "INDST_SPECL_CCCCL_EXST_YN": "N", "HS_GNRL_BUSNS_SC_NM": "일반계", "SPCLY_PURPS_HS_ORD_NM": "과학계열", "ENE_BFE_SEHF_SC_NM": "전기", "DGHT_SC_NM": "주간", "FOND_YMD": "20110301", "FOAS_MEMRD": "20110301", "LOAD_DTM": "20211216" }]
//         }]
// }